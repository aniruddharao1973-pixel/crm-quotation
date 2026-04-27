// src/modules/item/item.service.js

import prisma from "../../utils/prisma.js";

/* ================= CREATE ================= */
export const createItemService = async (data) => {
  return prisma.item.create({
    data: {
      sku: data.sku || null, // ✅ allow null for children
      name: data.name || null,
      description: data.description,
      basePrice: data.basePrice ? Number(data.basePrice) : null,

      parentId: data.parentId || null, // ✅ NEW

      // ✅ NEW FIELD (ADDED)
      category: data.category || null,

      // ✅ EXISTING
      make: data.make || null,
      mfgPartNo: data.mfgPartNo || null,
      uom: data.uom || null,
      defaultRemarks: data.defaultRemarks || null,
    },
  });
};

/* ================= GET ALL ================= */
// export const getItemsService = async () => {
//   return prisma.item.findMany({
//     include: {
//       children: true, // ✅ useful later
//       parent: true,
//     },
//     orderBy: { createdAt: "asc" },
//   });
// };

/* ================= GET ALL ================= */
export const getItemsService = async () => {
  const items = await prisma.item.findMany({
    orderBy: { createdAt: "asc" },
  });

  // ✅ BUILD TREE STRUCTURE
  const map = {};
  const roots = [];

  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  items.forEach((item) => {
    if (item.parentId) {
      map[item.parentId]?.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  });

  return roots;
};

/* ================= GET ONE ================= */
export const getItemByIdService = async (id) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

/* ================= UPDATE ================= */
export const updateItemService = async (id, data) => {
  return prisma.item.update({
    where: { id },
    data: {
      sku: data.sku || null,
      name: data.name || null,
      description: data.description,
      basePrice: data.basePrice ? Number(data.basePrice) : null,

      parentId: data.parentId !== undefined ? data.parentId : undefined,

      // ✅ NEW FIELD (ADDED)
      category: data.category || null,

      // ✅ EXISTING
      make: data.make || null,
      mfgPartNo: data.mfgPartNo || null,
      uom: data.uom || null,
      defaultRemarks: data.defaultRemarks || null,
    },
  });
};

/* ================= DELETE ================= */
export const deleteItemService = async (id) => {
  return prisma.$transaction(async (tx) => {
    // 1. find children
    const children = await tx.item.findMany({
      where: { parentId: id },
      select: { id: true },
    });

    // 2. delete children recursively
    for (const child of children) {
      await deleteItemService(child.id); // recursion
    }

    // 3. delete parent
    return tx.item.delete({
      where: { id },
    });
  });
};

/* ================= BULK IMPORT WITH HIERARCHY ================= */
export const bulkCreateItemsWithHierarchy = async (items) => {
  return prisma.$transaction(async (tx) => {
    const createdMap = {}; // parentKey → parentId

    for (const row of items) {
      // 👉 STEP 1: if parent row
      if (!row.parentKey || row.isParent) {
        const parent = await tx.item.create({
          data: {
            sku: row.sku || null,
            name: row.name,
            description: row.description,
            basePrice: row.basePrice ? Number(row.basePrice) : null,
            category: row.category || null,
            make: row.make || null,
            mfgPartNo: row.mfgPartNo || null,
            uom: row.uom || null,
            defaultRemarks: row.defaultRemarks || null,
          },
        });

        if (row.parentKey) {
          createdMap[row.parentKey] = parent.id;
        }

        continue;
      }

      // 👉 STEP 2: child row
      const parentId = createdMap[row.parentKey];

      await tx.item.create({
        data: {
          sku: row.sku || null,
          name: row.name,
          description: row.description,
          basePrice: row.basePrice ? Number(row.basePrice) : null,

          parentId: parentId || null,

          category: row.category || null,
          make: row.make || null,
          mfgPartNo: row.mfgPartNo || null,
          uom: row.uom || null,
          defaultRemarks: row.defaultRemarks || null,
        },
      });
    }

    return { message: "Bulk import completed" };
  });
};
