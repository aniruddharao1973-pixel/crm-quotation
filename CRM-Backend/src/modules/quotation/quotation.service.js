// src/modules/quotation/quotation.service.js

import prisma from "../../utils/prisma.js";

const GST_RATE = 0.18;
const CGST_RATE = 0.09;
const SGST_RATE = 0.09;

export const createQuotation = async (data) => {
  const {
    quotationNumber,
    accountId,
    dealId,
    issueDate,
    validUntil,
    items,
    notes,
    terms,
    headerDiscount = 0, // 🔥 NEW
  } = data;

  /* ================= VALIDATION ================= */
  if (!accountId) {
    throw new Error("Account is required");
  }

  if (!items || items.length === 0) {
    throw new Error("At least one item is required");
  }

  // ✅ use frontend number if provided, otherwise generate one
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const t = String(Date.now()).slice(-4);

  const generatedQuotationNo = `QT-${y}${m}${d}-${t}`;
  const quotationNo = quotationNumber || generatedQuotationNo;
  return await prisma.$transaction(async (tx) => {
    /* ================= 1️⃣ CREATE QUOTATION ================= */
    const quotation = await tx.quotation.create({
      data: {
        quotationNo: quotationNo,

        // 🔥 ADD THIS
        version: 1,
        isLatest: true,

        account: {
          connect: { id: accountId },
        },

        ...(dealId && {
          deal: {
            connect: { id: dealId },
          },
        }),

        issueDate: new Date(issueDate),
        validUntil: validUntil ? new Date(validUntil) : null,

        notes,
        terms,
      },
    });

    // ✅ FETCH ITEM MASTER DATA (IMPORTANT)
    const itemIds = [
      ...items.map((i) => i.itemId),
      ...items.flatMap((i) =>
        (i.subItems || []).map((s) => s.itemId).filter(Boolean),
      ),
    ];

    const itemMasters = await tx.item.findMany({
      where: { id: { in: itemIds } },
    });

    const itemMap = {};
    itemMasters.forEach((i) => {
      itemMap[i.id] = i;
    });

    /* ================= 2️⃣ PROCESS ITEMS ================= */
    let subtotal = 0;

    const quotationItems = items.map((item) => {
      if (!item.itemId) {
        throw new Error("Item ID is required for each line");
      }

      const master = itemMap[item.itemId];

      if (!master) {
        throw new Error(`Item not found: ${item.itemId}`);
      }

      const qty = Number(item.quantity || 1);
      const hasSubItems = item.subItems?.length > 0;

      const price = Number(item.price ?? master.basePrice ?? 0);
      const discount = Number(item.discount || 0);
      const lineTotal = Math.max(0, qty * price * (1 - discount / 100));

      // ✅ INCLUDE SUB-ITEMS IN TOTAL
      let subTotalSum = 0;

      if (item.subItems?.length) {
        subTotalSum = item.subItems.reduce((sum, sub) => {
          const sQty = Number(sub.quantity || 1);
          const sPrice = Number(sub.price || 0);
          const sDiscount = Number(sub.discount || 0);

          return sum + Math.max(0, sQty * sPrice * (1 - sDiscount / 100));
        }, 0);
      }

      const finalLineTotal = lineTotal + subTotalSum;

      subtotal += finalLineTotal;

      return {
        quotationId: quotation.id,
        itemId: item.itemId,

        // ✅ SNAPSHOT (FROM MASTER — NOT FRONTEND)
        sku: master.sku || "",
        description: item.description || master.description,

        // 🔥 CRITICAL ADD
        category: master.category || null,

        make: master.make || null,
        mfgPartNo: master.mfgPartNo || null,
        uom: master.uom || null,

        // USER EDITABLE
        remarks: item.remarks || master.defaultRemarks || null,

        quantity: qty,
        price,
        discount,
        lineTotal: finalLineTotal,
      };
    });

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const base = quotationItems[index];

      await tx.quotationItem.create({
        data: {
          // ✅ FIX 1: relation instead of quotationId
          quotation: {
            connect: { id: quotation.id },
          },

          // ✅ FIX 2: relation instead of itemId
          item: {
            connect: { id: item.itemId },
          },

          // ✅ SNAPSHOT (NO NULL CRASH)
          sku: base.sku || "",
          description: base.description || "",
          category: base.category || null,

          make: base.make || null,
          mfgPartNo: base.mfgPartNo || null,
          uom: base.uom || null,
          remarks: base.remarks || null,

          quantity: base.quantity,
          price: base.price,
          discount: base.discount,
          lineTotal: base.lineTotal,

          // ✅ SUB ITEMS (unchanged logic)
          subItems: {
            create:
              item.subItems?.map((sub) => {
                const subMaster = itemMap[sub.itemId];

                const qty = Number(sub.quantity || 1);
                const price = Number(sub.price || 0);
                const discount = Number(sub.discount || 0);

                return {
                  itemId: sub.itemId || null,

                  name: subMaster?.name || sub.name || "",
                  sku: subMaster?.sku || "",
                  category: subMaster?.category || null,

                  // 🔥 ADD THESE (CRITICAL)
                  make: subMaster?.make || null,
                  mfgPartNo: subMaster?.mfgPartNo || null,
                  uom: subMaster?.uom || null,

                  description: sub.description || null,
                  quantity: qty,
                  price,
                  discount,
                  lineTotal: Math.max(0, qty * price * (1 - discount / 100)),
                };
              }) || [],
          },
        },
      });
    }

    // await tx.quotationItem.createMany({
    //   data: quotationItems,
    // });

    /* ================= 3️⃣ TOTAL CALCULATION ================= */

    const quotationDiscount = Number(headerDiscount || 0);

    const taxableValue = Math.max(0, subtotal - quotationDiscount);

    const cgst = taxableValue * CGST_RATE;
    const sgst = taxableValue * SGST_RATE;

    const taxTotal = cgst + sgst;
    const grandTotal = taxableValue + taxTotal;

    /* ================= 4️⃣ UPDATE TOTALS ================= */
    const updatedQuotation = await tx.quotation.update({
      where: { id: quotation.id },
      data: {
        subtotal,
        discountTotal: quotationDiscount,
        taxTotal,
        grandTotal,
      },
      include: {
        account: true,
        items: {
          include: {
            item: true,
            subItems: true, // ✅ ADD THIS
          },
        },
      },
    });

    return updatedQuotation;
  });
};

export const updateQuotation = async (id, data) => {
  const {
    issueDate,
    validUntil,
    items,
    notes,
    terms,
    headerDiscount = 0,
  } = data;

  if (!items || items.length === 0) {
    throw new Error("At least one item is required");
  }

  return await prisma.$transaction(async (tx) => {
    /* ================= 1️⃣ GET CURRENT ================= */
    const current = await tx.quotation.findUnique({
      where: { id },
      include: {
        items: {
          include: { subItems: true },
        },
      },
    });

    if (!current) throw new Error("Quotation not found");

    /* ================= 2️⃣ MARK OLD ================= */
    await tx.quotation.update({
      where: { id: current.id },
      data: { isLatest: false },
    });

    /* ================= 3️⃣ CREATE NEW VERSION ================= */
    const quotation = await tx.quotation.create({
      data: {
        quotationNo: current.quotationNo,
        version: current.version + 1,
        isLatest: true,

        accountId: current.accountId,
        dealId: current.dealId,

        issueDate: issueDate ? new Date(issueDate) : current.issueDate,
        validUntil: validUntil ? new Date(validUntil) : current.validUntil,

        notes,
        terms,
      },
    });

    /* ================= COPY YOUR EXISTING LOGIC ================= */

    // 🔥 SAME ITEM MASTER FETCH
    const itemIds = [
      ...items.map((i) => i.itemId),
      ...items.flatMap((i) =>
        (i.subItems || []).map((s) => s.itemId).filter(Boolean),
      ),
    ];

    const itemMasters = await tx.item.findMany({
      where: { id: { in: itemIds } },
    });

    const itemMap = {};
    itemMasters.forEach((i) => {
      itemMap[i.id] = i;
    });

    let subtotal = 0;

    for (let item of items) {
      const master = itemMap[item.itemId];

      const qty = Number(item.quantity || 1);
      const hasSubItems = item.subItems?.length > 0;

      const price = Number(item.price ?? master?.basePrice ?? 0);

      const discount = Number(item.discount || 0);

      let lineTotal = Math.max(0, qty * price * (1 - discount / 100));

      let subTotalSum = 0;

      if (item.subItems?.length) {
        subTotalSum = item.subItems.reduce((sum, sub) => {
          const sQty = Number(sub.quantity || 1);
          const sPrice = Number(sub.price || 0);
          const sDiscount = Number(sub.discount || 0);

          return sum + Math.max(0, sQty * sPrice * (1 - sDiscount / 100));
        }, 0);
      }

      const finalLineTotal = lineTotal + subTotalSum;

      subtotal += finalLineTotal;

      await tx.quotationItem.create({
        data: {
          quotation: { connect: { id: quotation.id } },
          item: { connect: { id: item.itemId } },

          sku: master?.sku || "",
          description: item.description || master?.description || "",
          category: master?.category || null,

          make: master?.make || null,
          mfgPartNo: master?.mfgPartNo || null,
          uom: master?.uom || null,

          remarks: item.remarks || master?.defaultRemarks || null,

          quantity: qty,
          price,
          discount,
          lineTotal: finalLineTotal,

          subItems: {
            create:
              item.subItems?.map((sub) => {
                const subMaster = itemMap[sub.itemId];

                const qty = Number(sub.quantity || 1);
                const price = Number(sub.price || 0);
                const discount = Number(sub.discount || 0);

                return {
                  itemId: sub.itemId || null,

                  name: subMaster?.name || sub.name || "",
                  sku: subMaster?.sku || "",
                  category: subMaster?.category || null,

                  make: subMaster?.make || null,
                  mfgPartNo: subMaster?.mfgPartNo || null,
                  uom: subMaster?.uom || null,

                  description: sub.description || null,
                  quantity: qty,
                  price,
                  discount,
                  lineTotal: Math.max(0, qty * price * (1 - discount / 100)),
                };
              }) || [],
          },
        },
      });
    }

    /* ================= TOTALS ================= */

    const quotationDiscount = Number(headerDiscount || 0);
    const taxableValue = Math.max(0, subtotal - quotationDiscount);

    const cgst = taxableValue * 0.09;
    const sgst = taxableValue * 0.09;

    const taxTotal = cgst + sgst;
    const grandTotal = taxableValue + taxTotal;

    const updatedQuotation = await tx.quotation.update({
      where: { id: quotation.id },
      data: {
        subtotal,
        discountTotal: quotationDiscount,
        taxTotal,
        grandTotal,
      },
      include: {
        account: true,
        items: {
          include: {
            item: true,
            subItems: true,
          },
        },
      },
    });

    return updatedQuotation;
  });
};
