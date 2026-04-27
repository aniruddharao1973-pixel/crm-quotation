// // src/features/quotations/QuotationForm.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchAccountsDropdown } from "../accounts/accountSlice";
// import { fetchContactsDropdown } from "../contacts/contactSlice";
// import { fetchDealsByAccount } from "../deals/dealSlice";
// import { fetchItems } from "../items/itemSlice";

// import {
//   ChevronLeft,
//   Save,
//   Download,
//   FileText,
//   CalendarDays,
//   Percent,
//   Package,
// } from "lucide-react";

// import QuotationPdfDocument from "./QuotationPdfDocument";
// import { createQuotation, fetchQuotationById } from "./quotationSlice";
// import { calcQuotationTotals, createQuotationNumber } from "./quotationUtils";

// /* 🔹 NEW COMPONENTS */
// import QuotationDetailsSection from "./QuotationDetailsSection";
// import QuotationItemsTable from "./QuotationItemsTable";
// import QuotationSummaryCard from "./QuotationSummaryCard";

// /* ================= CONSTANTS ================= */
// const GST_RATE = 18;
// const CGST_RATE = 9;
// const SGST_RATE = 9;

// /* ================= HELPER ================= */
// function newLineItem() {
//   return {
//     itemId: "",
//     sku: "",
//     category: "",
//     description: "",
//     make: "",
//     mfgPartNo: "",
//     uom: "",
//     remarks: "",
//     qty: 1,
//     price: 0,
//     discount: 0,
//   };
// }

// /* ========================================================= */

// export default function QuotationForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { dropdown: accounts } = useSelector((state) => state.accounts);
//   const { dropdown: contacts } = useSelector((state) => state.contacts);
//   const { list: itemsList } = useSelector((state) => state.items);
//   const deals = useSelector((state) => state.deals.deals || []);
//   const quotation = useSelector((state) => state.quotation?.selected);

//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
//     quotationNumber: createQuotationNumber(),
//     accountId: "",
//     accountName: "",
//     dealId: "",
//     contactIds: [],
//     date: new Date().toISOString().slice(0, 10),
//     validUntil: "",
//     notes: "",
//     terms: "Quotation valid for 15 days from the issue date.",
//     headerDiscount: 0,
//     items: [newLineItem()],
//   });

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     dispatch(fetchItems());
//     dispatch(fetchAccountsDropdown());
//   }, [dispatch]);

//   useEffect(() => {
//     if (form.accountId) {
//       dispatch(fetchDealsByAccount(form.accountId));
//       dispatch(fetchContactsDropdown({ accountId: form.accountId }));
//     } else {
//       setForm((prev) => ({ ...prev, contactIds: [] }));
//     }
//   }, [form.accountId, dispatch]);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchQuotationById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (quotation && id) {
//       setForm({
//         quotationNumber: quotation.quotationNumber,
//         accountId: quotation.accountId,
//         accountName: quotation.accountName,
//         dealId: quotation.dealId || "",
//         contactIds: quotation.contactIds || [],
//         date: quotation.issueDate?.slice(0, 10),
//         validUntil: quotation.validUntil?.slice(0, 10) || "",
//         notes: quotation.notes || "",
//         terms: quotation.terms || "",
//         headerDiscount: quotation.headerDiscount || 0,
//         items: quotation.items.map((item) => ({
//           itemId: item.itemId,
//           sku: item.sku,
//           category: item.category || "",
//           description: item.description,
//           make: item.make,
//           mfgPartNo: item.mfgPartNo,
//           uom: item.uom,
//           remarks: item.remarks,
//           qty: item.quantity,
//           price: item.price,
//           discount: item.discount,
//         })),
//       });

//       dispatch(fetchDealsByAccount(quotation.accountId));
//       dispatch(fetchContactsDropdown({ accountId: quotation.accountId }));
//     }
//   }, [quotation, id, dispatch]);

//   /* ================= TOTALS ================= */

//   const totals = useMemo(() => calcQuotationTotals(form), [form]);

//   /* ================= HANDLERS ================= */

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const updateItem = (index, key, value) => {
//     setForm((prev) => {
//       const items = prev.items.map((item, i) => {
//         if (i !== index) return item;

//         const next = { ...item, [key]: value };

//         if (key === "itemId") {
//           const product = itemsList.find((p) => p.id === value);
//           if (product) {
//             next.sku = product.sku;
//             next.category = product.category || "";
//             next.description = product.description || "";
//             next.make = product.make || "";
//             next.mfgPartNo = product.mfgPartNo || "";
//             next.uom = product.uom || "";
//             next.remarks = product.remarks || "";
//             next.price = Number(product.basePrice || 0);
//           }
//         }

//         if (["qty", "price", "discount"].includes(key)) {
//           next[key] = value === "" ? "" : Number(value);
//         }

//         return next;
//       });

//       return { ...prev, items };
//     });
//   };

//   const addItem = () => {
//     setForm((prev) => ({
//       ...prev,
//       items: [...prev.items, newLineItem()],
//     }));
//   };

//   const removeItem = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       items: prev.items.filter((_, i) => i !== index),
//     }));
//   };

//   const saveQuotation = async () => {
//     try {
//       if (!form.accountId) return alert("Select account");
//       if (!form.dealId) return alert("Select deal");
//       if (!form.items.length) return alert("Add items");

//       const payload = {
//         accountId: form.accountId,
//         dealId: form.dealId,
//         contactIds: form.contactIds,
//         issueDate: form.date,
//         validUntil: form.validUntil || null,
//         notes: form.notes,
//         terms: form.terms,
//         items: form.items.map((item) => ({
//           itemId: item.itemId,
//           quantity: Number(item.qty || 1),
//           price: Number(item.price || 0),
//           discount: Number(item.discount || 0),
//         })),
//       };

//       await dispatch(createQuotation(payload)).unwrap();
//       navigate("/quotations");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save");
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-6 space-y-6">
//       {/* TOP BAR */}
//       <div className="flex justify-between items-center">
//         <button onClick={() => navigate(-1)}>
//           <ChevronLeft />
//         </button>

//         <div className="flex gap-2">
//           <PDFDownloadLink
//             document={<QuotationPdfDocument quotation={form} totals={totals} />}
//             fileName={`${form.quotationNumber}.pdf`}
//           >
//             {({ loading }) => (
//               <button disabled={loading}>
//                 <Download /> {loading ? "..." : "PDF"}
//               </button>
//             )}
//           </PDFDownloadLink>

//           <button onClick={saveQuotation}>
//             <Save /> Save
//           </button>
//         </div>
//       </div>

//       {/* INFO */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>#{form.quotationNumber}</div>
//         <div>GST {GST_RATE}%</div>
//         <div>{form.date}</div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
//         <div className="space-y-6">
//           <QuotationDetailsSection
//             form={form}
//             updateField={updateField}
//             accounts={accounts}
//             deals={deals}
//             contacts={contacts}
//           />

//           <QuotationItemsTable
//             totals={totals}
//             itemsList={itemsList}
//             updateItem={updateItem}
//             addItem={addItem}
//             removeItem={removeItem}
//           />
//         </div>

//         <QuotationSummaryCard
//           totals={totals}
//           headerDiscount={form.headerDiscount}
//         />
//       </div>
//     </div>
//   );
// }

// src/features/quotations/QuotationForm.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";

import { fetchAccountsDropdown } from "../accounts/accountSlice";
import { fetchContactsDropdown } from "../contacts/contactSlice";
import { fetchDealsByAccount } from "../deals/dealSlice";
import { fetchItems } from "../items/itemSlice";

import {
  ChevronLeft,
  Save,
  Download,
  FileText,
  CalendarDays,
  Percent,
  Package,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import QuotationPdfDocument from "./QuotationPdfDocument";
import {
  createQuotation,
  fetchQuotationById,
  updateQuotation, // ✅ ADD
} from "./quotationSlice";

import toast from "react-hot-toast"; // ✅ ADD
import { calcQuotationTotals, createQuotationNumber } from "./quotationUtils";

import QuotationDetailsSection from "./QuotationDetailsSection";
import QuotationItemsTable from "./QuotationItemsTable";
import QuotationSummaryCard from "./QuotationSummaryCard";

/* ================= CONSTANTS ================= */
const GST_RATE = 18;
const CGST_RATE = 9;
const SGST_RATE = 9;

/* ================= HELPER ================= */
function newLineItem() {
  return {
    itemId: "",
    sku: "",
    category: "",
    description: "",
    make: "",
    mfgPartNo: "",
    uom: "",
    remarks: "",
    qty: 1,
    price: 0,
    discount: 0,

    // ✅ NEW
    subItems: [],
    selectedSubItems: [],
  };
}

function StatCard({ label, value, icon: Icon, tone = "slate" }) {
  const toneClasses = {
    slate: "border-slate-200 bg-white text-slate-900",
    indigo: "border-indigo-100 bg-indigo-50/80 text-indigo-700",
    emerald: "border-emerald-100 bg-emerald-50/80 text-emerald-700",
    amber: "border-amber-100 bg-amber-50/80 text-amber-700",
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3 shadow-sm ${toneClasses[tone] || toneClasses.slate}`}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {label}
      </div>
      <div className="mt-1.5 truncate text-sm font-semibold">{value}</div>
    </div>
  );
}

function EmptyHint({ title, description, icon: Icon }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
      <div className="mt-0.5 rounded-xl bg-white p-2 shadow-sm">
        {Icon ? <Icon className="h-4 w-4 text-slate-500" /> : null}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{description}</div>
      </div>
    </div>
  );
}

/* ========================================================= */

export default function QuotationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dropdown: accounts } = useSelector((state) => state.accounts);
  const { dropdown: contacts } = useSelector((state) => state.contacts);
  const { list: itemsList } = useSelector((state) => state.items);
  const deals = useSelector((state) => state.deals.deals || []);
  const quotation = useSelector((state) => state.quotation?.selected);

  const isEdit = Boolean(id);

  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    quotationNumber: createQuotationNumber(),
    accountId: "",
    accountName: "",
    dealId: "",
    contactIds: [],
    date: new Date().toISOString().slice(0, 10),
    validUntil: "",
    notes: "",
    terms: "Quotation valid for 15 days from the issue date.",
    headerDiscount: 0,
    items: [newLineItem()],
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchAccountsDropdown());
  }, [dispatch]);

  useEffect(() => {
    if (form.accountId) {
      dispatch(fetchDealsByAccount(form.accountId));
      dispatch(fetchContactsDropdown({ accountId: form.accountId }));
    } else {
      setForm((prev) => ({ ...prev, contactIds: [], dealId: "" }));
    }
  }, [form.accountId, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuotationById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (quotation && id) {
      setForm({
        quotationNumber: quotation.quotationNumber,
        accountId: quotation.accountId,
        accountName: quotation.accountName,
        dealId: quotation.dealId || "",
        contactIds: quotation.contactIds || [],
        date: quotation.issueDate?.slice(0, 10),
        validUntil: quotation.validUntil?.slice(0, 10) || "",
        notes: quotation.notes || "",
        terms: quotation.terms || "",
        headerDiscount: quotation.headerDiscount || 0,
        items: quotation.items.map((item) => ({
          itemId: item.itemId,
          sku: item.sku,
          category: item.category || "",
          description: item.description,
          make: item.make,
          mfgPartNo: item.mfgPartNo,
          uom: item.uom,
          remarks: item.remarks,
          qty: item.quantity,
          price:
            item.subItems?.length > 0
              ? item.subItems.reduce(
                  (sum, s) =>
                    sum +
                    Number(s.quantity || 1) *
                      Number(s.price || 0) *
                      (1 - Number(s.discount || 0) / 100),
                  0,
                )
              : item.price,
          discount: item.discount,

          // ✅ IMPORTANT
          // ✅ AVAILABLE OPTIONS (for selection UI)
          subItems: itemsList.find((p) => p.id === item.itemId)?.children || [],

          // ✅ ACTUAL SELECTED (FROM DB)
          selectedSubItems: (item.subItems || []).map((sub) => ({
            id: sub.itemId || sub.id,

            name: sub.name,

            sku: sub.sku || "",
            category: sub.category || "",

            description: sub.description,

            qty: Number(sub.quantity || 1),
            price: Number(sub.price || 0),
            discount: Number(sub.discount || 0),

            // ✅ ADD THIS (CRITICAL)
            lineTotal:
              Number(sub.quantity || 1) *
              Number(sub.price || 0) *
              (1 - Number(sub.discount || 0) / 100),
          })),
        })),
      });

      dispatch(fetchDealsByAccount(quotation.accountId));
      dispatch(fetchContactsDropdown({ accountId: quotation.accountId }));
    }
  }, [quotation, id, itemsList, dispatch]);

  /* ================= TOTALS ================= */

  const totals = useMemo(() => calcQuotationTotals(form), [form]);

  const selectedAccountName = useMemo(() => {
    return (
      accounts.find((a) => a.id === form.accountId)?.accountName ||
      form.accountName ||
      ""
    );
  }, [accounts, form.accountId, form.accountName]);

  const contactSummary = useMemo(() => {
    if (!form.contactIds?.length) return "No contacts selected";
    if (form.contactIds.length === 1) return "1 contact selected";
    return `${form.contactIds.length} contacts selected`;
  }, [form.contactIds]);

  const lineCount = useMemo(() => {
    return (
      form.items?.filter((i) => i.itemId || i.description || i.price).length ||
      0
    );
  }, [form.items]);

  /* ================= HANDLERS ================= */

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (index, key, value) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== index) return item;

        const next = { ...item, [key]: value };

        if (key === "itemId") {
          const product = itemsList.find((p) => p.id === value);

          if (product) {
            next.sku = product.sku;
            next.category = product.category || "";
            next.description = product.description || "";
            next.make = product.make || "";
            next.mfgPartNo = product.mfgPartNo || "";
            next.uom = product.uom || "";
            next.remarks = product.remarks || "";

            // ✅ IMPORTANT: DO NOT use parent price if sub-items exist
            next.subItems = product.children || [];
            next.selectedSubItems = [];

            next.price =
              product.children?.length > 0 ? 0 : Number(product.basePrice || 0);
          } else {
            next.sku = "";
            next.category = "";
            next.description = "";
            next.make = "";
            next.mfgPartNo = "";
            next.uom = "";
            next.remarks = "";

            next.price = 0;
            next.subItems = [];
            next.selectedSubItems = [];
          }
        }

        if (["qty", "price", "discount"].includes(key)) {
          next[key] = value === "" ? "" : Number(value);
        }

        return next;
      });

      return { ...prev, items };
    });
  };

  const toggleSubItem = (rowIndex, subItem) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== rowIndex) return item;

        const exists = item.selectedSubItems.find(
          (s) => s.id === (subItem.id || subItem.itemId),
        );

        const subId = subItem.id || subItem.itemId;

        let updatedSubs;

        if (exists) {
          updatedSubs = item.selectedSubItems.filter((s) => s.id !== subId);
        } else {
          updatedSubs = [
            ...item.selectedSubItems,
            {
              ...subItem,
              id: subId,
              sku: subItem.sku || "",
              category: subItem.category || "",
              qty: 1,
              price: subItem.basePrice || 0,
              discount: 0,
            },
          ];
        }

        // 🔥 CALCULATE TOTAL FROM SUB ITEMS
        const total = updatedSubs.reduce(
          (sum, s) =>
            sum + (s.qty || 1) * (s.price || 0) * (1 - (s.discount || 0) / 100),
          0,
        );

        return {
          ...item,
          selectedSubItems: updatedSubs,
          price: total, // ✅ CRITICAL FIX
        };
      });

      return { ...prev, items };
    });
  };

  const updateSubItem = (rowIndex, subId, key, value) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== rowIndex) return item;

        const updatedSubs = item.selectedSubItems.map((sub) =>
          sub.id === subId
            ? {
                ...sub,
                [key]: value === "" ? "" : Number(value),
              }
            : sub,
        );

        // 🔥 RECALCULATE TOTAL
        const total = updatedSubs.reduce(
          (sum, s) =>
            sum + (s.qty || 1) * (s.price || 0) * (1 - (s.discount || 0) / 100),
          0,
        );

        return {
          ...item,
          selectedSubItems: updatedSubs,
          price: total, // ✅ CRITICAL FIX
        };
      });

      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, newLineItem()],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const autoSave = async (updatedItems = form.items) => {
    if (!id) return;

    try {
      await dispatch(
        updateQuotation({
          id,
          data: {
            accountId: form.accountId,
            dealId: form.dealId,
            issueDate: form.date,
            validUntil: form.validUntil || null,
            notes: form.notes,
            terms: form.terms,
            items: form.items.map((item) => ({
              itemId: item.itemId,
              quantity: Number(item.qty || 1),
              price: Number(item.price || 0),
              discount: Number(item.discount || 0),
              subItems: (item.selectedSubItems || []).map((sub) => ({
                itemId: sub.id,
                name: sub.name,
                description: sub.description || "",
                quantity: Number(sub.qty || 1),
                price: Number(sub.price || 0),
                discount: Number(sub.discount || 0),
              })),
            })),
          },
        }),
      ).unwrap();

      toast.success("Synced");
    } catch (err) {
      toast.error("Sync failed");
    }
  };

  const saveQuotation = async () => {
    try {
      if (!form.accountId) return alert("Select account");
      if (!form.dealId) return alert("Select deal");
      if (!form.items.length) return alert("Add items");

      const invalidItem = form.items.find((i) => !i.itemId);
      if (invalidItem) return alert("Please select an item for every row");

      setIsSaving(true);

      const payload = {
        accountId: form.accountId,
        dealId: form.dealId,
        contactIds: form.contactIds,
        issueDate: form.date,
        validUntil: form.validUntil || null,
        notes: form.notes,
        terms: form.terms,
        items: form.items.map((item) => ({
          itemId: item.itemId,
          quantity: Number(item.qty || 1),
          price: Number(item.price || 0),
          discount: Number(item.discount || 0),

          // ✅ NEW: SEND SUB ITEMS
          subItems: (item.selectedSubItems || []).map((sub) => ({
            itemId: sub.id,
            name: sub.name, // ✅ REQUIRED (MANDATORY FIX)
            description: sub.description || "",
            quantity: Number(sub.qty || 1),
            price: Number(sub.price || 0),
            discount: Number(sub.discount || 0),
          })),
        })),
      };

      await dispatch(createQuotation(payload)).unwrap();
      navigate("/quotations");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-[1680px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* HERO / TOP BAR */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    <Sparkles className="h-3.5 w-3.5" />
                    Quotation Builder
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                    {isEdit ? "Edit Mode" : "Create Mode"}
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-700">
                    <FileText className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {isEdit ? "Edit Quotation" : "Create Quotation"}
                    </h1>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                      Build a professional quotation with account, project,
                      contacts, item master selection, and GST-aware totals in
                      one streamlined workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <PDFDownloadLink
                document={
                  <QuotationPdfDocument quotation={form} totals={totals} />
                }
                fileName={`${form.quotationNumber}.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={!form.accountId || loading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" />
                    {loading ? "Generating PDF..." : "Export PDF"}
                  </button>
                )}
              </PDFDownloadLink>

              <button
                onClick={saveQuotation}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Quotation"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Quotation No"
              value={form.quotationNumber}
              icon={Package}
              tone="indigo"
            />
            <StatCard
              label="GST"
              value={`GST ${GST_RATE}% (${CGST_RATE}% + ${SGST_RATE}%)`}
              icon={Percent}
              tone="emerald"
            />
            <StatCard
              label="Issue Date"
              value={form.date}
              icon={CalendarDays}
              tone="amber"
            />
            <StatCard
              label="Lines"
              value={`${lineCount || 0} item row(s)`}
              icon={FileText}
              tone="slate"
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <QuotationDetailsSection
              form={form}
              updateField={updateField}
              accounts={accounts}
              deals={deals}
              contacts={contacts}
            />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Quotation Snapshot
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Current selection and status summary for quick validation
                      before saving.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {selectedAccountName || "No account selected"}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {contactSummary}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {form.dealId ? "Deal selected" : "Deal pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {!form.accountId && (
                  <EmptyHint
                    title="Start with an account"
                    description="Select an account to unlock the deal, contact, and quotation workflow."
                    icon={AlertCircle}
                  />
                )}
                {form.accountId && !form.dealId && (
                  <EmptyHint
                    title="Pick a deal/project"
                    description="A deal/project is required before you can save and generate the final quotation."
                    icon={ShieldCheck}
                  />
                )}
                {form.accountId && form.dealId && (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Ready
                    </div>
                    <div className="mt-1 text-sm font-semibold text-emerald-900">
                      Quotation header is ready for item entry and totals
                      validation.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <QuotationItemsTable
              totals={totals}
              itemsList={itemsList}
              updateItem={updateItem}
              addItem={addItem}
              removeItem={removeItem}
              // ✅ NEW
              formItems={form.items}
              toggleSubItem={toggleSubItem}
              updateSubItem={updateSubItem} // ✅ ADD THIS
              autoSave={autoSave} // ✅ ADD THIS
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    Notes
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add internal remarks or customer-facing context.
                  </p>
                </div>
                <div className="p-5">
                  <textarea
                    rows={6}
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Add notes for this quotation..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    Terms & Conditions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Edit before sending if the customer requires custom
                    commercial terms.
                  </p>
                </div>
                <div className="p-5">
                  <textarea
                    rows={6}
                    value={form.terms}
                    onChange={(e) => updateField("terms", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <QuotationSummaryCard
              totals={totals}
              headerDiscount={form.headerDiscount}
            />

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Quick Checks
                </h3>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start justify-between gap-4">
                  <span>Account</span>
                  <span
                    className={
                      form.accountId
                        ? "font-semibold text-emerald-700"
                        : "font-medium text-amber-600"
                    }
                  >
                    {form.accountId ? "Selected" : "Pending"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Deal / Project</span>
                  <span
                    className={
                      form.dealId
                        ? "font-semibold text-emerald-700"
                        : "font-medium text-amber-600"
                    }
                  >
                    {form.dealId ? "Selected" : "Pending"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Contacts</span>
                  <span className="font-semibold text-slate-900">
                    {form.contactIds?.length || 0}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Items</span>
                  <span className="font-semibold text-slate-900">
                    {form.items?.length || 0}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Validity</span>
                  <span className="font-semibold text-slate-900">
                    {form.validUntil || "Not set"}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Recommendation
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Select a deal, ensure every row has an item, and verify tax
                  split before saving or exporting PDF.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        {/* <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
          Quotation totals are calculated on taxable value with GST split into
          CGST and SGST for local tax presentation.
        </div> */}
      </div>
    </div>
  );
}
