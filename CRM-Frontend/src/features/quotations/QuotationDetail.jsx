// // src/features/quotations/QuotationDetail.jsx

// import { useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { Download, Pencil, ChevronLeft, FileText } from "lucide-react";

// import { fetchQuotationById, clearSelectedQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";
// import QuotationPdfDocument from "./QuotationPdfDocument";

// export default function QuotationDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { selected: data, loading } = useSelector((state) => state.quotation);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotationById(id));

//     return () => {
//       dispatch(clearSelectedQuotation());
//     };
//   }, [dispatch, id]);

//   /* ================= DATA ================= */

//   /* ================= TOTALS ================= */
//   const totals = useMemo(() => {
//     if (!data) return null;

//     const subtotal = Number(data.subtotal || 0);
//     const discount = Number(data.discountTotal || 0);
//     const taxable = Math.max(subtotal - discount, 0);

//     const taxTotal = Number(data.taxTotal || 0);
//     const cgst = taxTotal / 2;
//     const sgst = taxTotal / 2;

//     const grandTotal = Number(data.grandTotal || 0);

//     return {
//       subtotal,
//       discount,
//       taxable,
//       cgst,
//       sgst,
//       grandTotal,
//     };
//   }, [data]);

//   /* ================= LOADING ================= */
//   if (loading || !data) {
//     return (
//       <div className="p-6 text-center text-slate-500">Loading quotation...</div>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 sm:p-6 bg-slate-50 min-h-[calc(100vh-64px)]">
//       {/* HEADER */}
//       <div className="mb-4 flex items-center justify-between gap-3">
//         <button
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back
//         </button>

//         <div className="flex items-center gap-2">
//           <PDFDownloadLink
//             document={<QuotationPdfDocument quotation={data} totals={totals} />}
//             fileName={`${data.quotationNo}.pdf`}
//           >
//             {({ loading }) => (
//               <button
//                 disabled={loading}
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//               >
//                 <Download className="w-4 h-4" />
//                 {loading ? "Generating..." : "Export PDF"}
//               </button>
//             )}
//           </PDFDownloadLink>

//           <button
//             onClick={() => navigate(`/quotations/${id}/edit`)}
//             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//           >
//             <Pencil className="w-4 h-4" />
//             Edit
//           </button>
//         </div>
//       </div>

//       {/* HEADER CARD */}
//       <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
//         <div className="flex items-start justify-between">
//           <div>
//             <div className="flex items-center gap-2 text-xs text-slate-500 uppercase font-semibold">
//               <FileText className="w-4 h-4" />
//               Quotation
//             </div>

//             <h1 className="mt-2 text-2xl font-bold text-slate-900">
//               {data.quotationNo}
//             </h1>

//             <p className="text-sm text-slate-500 mt-1">
//               {data.account?.accountName || "-"}
//             </p>
//           </div>

//           <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
//             {data.status}
//           </span>
//         </div>
//       </div>

//       {/* INFO CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
//         <MiniCard label="Issue Date" value={data.issueDate?.slice(0, 10)} />
//         <MiniCard label="Valid Until" value={data.validUntil?.slice(0, 10)} />
//         <MiniCard label="Account" value={data.account?.accountName} />
//       </div>

//       {/* ITEMS TABLE */}
//       <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden mb-5">
//         <div className="px-5 py-4 border-b border-slate-100">
//           <h2 className="font-semibold text-slate-900">Line Items</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="p-4 text-left">SKU</th>
//                 <th className="p-4 text-left">Description</th>
//                 <th className="p-4 text-left">Make</th>
//                 <th className="p-4 text-left">Mfg PN</th>
//                 <th className="p-4 text-left">UOM</th>
//                 <th className="p-4 text-right">Qty</th>
//                 <th className="p-4 text-right">Price</th>
//                 <th className="p-4 text-right">Discount</th>
//                 <th className="p-4 text-right">Total</th>
//                 <th className="p-4 text-left">Remarks</th>
//               </tr>
//             </thead>

//             <tbody>
//               {(data.items || []).map((item) => (
//                 <tr key={item.id} className="border-t border-slate-100">
//                   <td className="p-4 text-slate-700">{item.sku}</td>

//                   <td className="p-4 text-slate-600">
//                     {item.description || "-"}
//                   </td>

//                   <td className="p-4 text-slate-600">{item.make || "-"}</td>

//                   <td className="p-4 text-slate-600">
//                     {item.mfgPartNo || "-"}
//                   </td>

//                   <td className="p-4 text-slate-600">{item.uom || "-"}</td>

//                   <td className="p-4 text-right">{item.quantity}</td>

//                   <td className="p-4 text-right">{formatINR(item.price)}</td>

//                   <td className="p-4 text-right">{formatINR(item.discount)}</td>

//                   <td className="p-4 text-right font-semibold text-slate-900">
//                     {formatINR(item.lineTotal)}
//                   </td>

//                   <td className="p-4 text-slate-600">{item.remarks || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* NOTES */}
//       <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
//         <h3 className="font-semibold text-slate-900">Notes</h3>
//         <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
//           {data.notes || "-"}
//         </p>

//         <h3 className="mt-5 font-semibold text-slate-900">
//           Terms & Conditions
//         </h3>
//         <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
//           {data.terms || "-"}
//         </p>
//       </div>

//       {/* TOTALS */}
//       <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
//         <div className="space-y-2 text-sm">
//           <SummaryRow label="Subtotal" value={formatINR(totals.subtotal)} />
//           <SummaryRow
//             label="Quotation Discount"
//             value={formatINR(totals.discount)}
//           />
//           <SummaryRow label="Taxable Value" value={formatINR(totals.taxable)} />

//           <div className="border-t border-dashed pt-2">
//             <SummaryRow label="CGST" value={formatINR(totals.cgst)} />
//             <SummaryRow label="SGST" value={formatINR(totals.sgst)} />
//           </div>

//           <div className="border-t pt-3">
//             <SummaryRow
//               label={<span className="font-semibold">Grand Total</span>}
//               value={
//                 <span className="font-bold">
//                   {formatINR(totals.grandTotal)}
//                 </span>
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function SummaryRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span className="text-slate-600">{label}</span>
//       <span className="text-slate-900">{value}</span>
//     </div>
//   );
// }

// function MiniCard({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
//       <div className="text-xs text-slate-500 uppercase font-semibold">
//         {label}
//       </div>
//       <div className="mt-2 text-sm font-semibold text-slate-900">
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

// // src/features/quotations/QuotationDetail.jsx

// import { useEffect, useMemo, Fragment } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import QuotationPdfDocument from "./pdf/QuotationPdfDocument";
// import {
//   Download,
//   Pencil,
//   ChevronLeft,
//   FileText,
//   Calendar,
//   Building2,
//   Package,
//   Tag,
//   Wrench,
//   Hash,
//   Ruler,
//   Layers,
//   MessageSquare,
//   FileCheck,
//   TrendingUp,
//   DollarSign,
//   Receipt,
//   PercentIcon,
//   Calculator,
//   RefreshCw,
// } from "lucide-react";

// import { fetchQuotationById, clearSelectedQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";

// export default function QuotationDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { selected: data, loading } = useSelector((state) => state.quotation);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotationById(id));

//     return () => {
//       dispatch(clearSelectedQuotation());
//     };
//   }, [dispatch, id]);

//   /* ================= TOTALS ================= */
//   // const totals = useMemo(() => {
//   //   if (!data) return null;

//   //   // ✅ CALCULATE FROM ITEMS (SOURCE OF TRUTH)
//   //   const subtotal = (data.items || []).reduce((sum, item) => {
//   //     return sum + Number(item.lineTotal || 0);
//   //   }, 0);

//   //   const discount = Number(data.discountTotal || 0);
//   //   const taxable = Math.max(subtotal - discount, 0);

//   //   const cgst = taxable * 0.09;
//   //   const sgst = taxable * 0.09;

//   //   const grandTotal = taxable + cgst + sgst;

//   //   return {
//   //     subtotal,
//   //     discount,
//   //     taxable,
//   //     cgst,
//   //     sgst,
//   //     grandTotal,
//   //   };
//   // }, [data]);

//   const totals = useMemo(() => {
//     if (!data) return null;

//     return {
//       subtotal: Number(data.subtotal || 0),
//       discount: Number(data.discountTotal || 0),
//       taxable: Math.max(
//         Number(data.subtotal || 0) - Number(data.discountTotal || 0),
//         0,
//       ),
//       cgst: Number(data.taxTotal || 0) / 2,
//       sgst: Number(data.taxTotal || 0) / 2,
//       grandTotal: Number(data.grandTotal || 0),
//     };
//   }, [data]);

//   /* ================= LOADING ================= */
//   if (loading || !data) {
//     return (
//       <div className="p-6 min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/20">
//         <div className="text-center">
//           <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
//           <p className="text-slate-600 font-medium">
//             Loading quotation details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* ================= STATUS COLOR ================= */
//   const getStatusColor = (status) => {
//     const colors = {
//       Draft: "bg-slate-100 text-slate-700 border-slate-200",
//       Sent: "bg-blue-100 text-blue-700 border-blue-200",
//       Accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
//       Rejected: "bg-rose-100 text-rose-700 border-rose-200",
//     };
//     return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/20 min-h-[calc(100vh-64px)]">
//       {/* HEADER */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back to Quotations
//         </button>

//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//               <FileText className="w-4 h-4" />
//               Quotation Details
//             </div>
//             {/* <h1 className="text-3xl font-bold text-slate-900 mb-2">
//               {data.quotationNo}
//             </h1>
//             <p className="text-sm text-slate-600">
//               Created on{" "}
//               {new Date(data.createdAt).toLocaleDateString("en-IN", {
//                 dateStyle: "long",
//               })}
//             </p> */}
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
//             <PDFDownloadLink
//               document={<QuotationPdfDocument quotation={data} />}
//               fileName={`${data.quotationNo || data.quotationNumber || "quotation"}.pdf`}
//             >
//               {({ loading: pdfLoading }) => (
//                 <button
//                   disabled={pdfLoading}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow-md disabled:opacity-60 transition-all"
//                 >
//                   <Download className="w-4 h-4" />
//                   {pdfLoading ? "Generating..." : "Export PDF"}
//                 </button>
//               )}
//             </PDFDownloadLink>

//             <button
//               onClick={() => navigate(`/quotations/${id}/edit`)}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               <Pencil className="w-4 h-4" />
//               Edit Quotation
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 items-start">
//         {/* LEFT COLUMN */}
//         <div className="space-y-7">
//           {/* HEADER CARD */}
//           <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//             <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-slate-200 px-6 py-5">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
//                     <FileText className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-slate-900">
//                       {data.quotationNo}
//                     </h2>
//                     <p className="text-sm text-slate-600 mt-0.5">
//                       {data.account?.accountName || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 <span
//                   className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${getStatusColor(data.status)}`}
//                 >
//                   <span className="w-2 h-2 rounded-full bg-current"></span>
//                   {data.status}
//                 </span>
//               </div>
//             </div>

//             {/* INFO GRID */}
//             <div className="p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <InfoItem
//                   icon={<Calendar className="w-4 h-4" />}
//                   label="Issue Date"
//                   value={new Date(data.issueDate).toLocaleDateString("en-IN", {
//                     dateStyle: "medium",
//                   })}
//                 />
//                 <InfoItem
//                   icon={<Calendar className="w-4 h-4" />}
//                   label="Valid Until"
//                   value={new Date(data.validUntil).toLocaleDateString("en-IN", {
//                     dateStyle: "medium",
//                   })}
//                 />
//                 <InfoItem
//                   icon={<Building2 className="w-4 h-4" />}
//                   label="Account"
//                   value={data.account?.accountName}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ITEMS TABLE */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//             <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-6 py-5">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-xl bg-slate-200 text-slate-700">
//                   <Package className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-slate-900 text-lg">
//                     Line Items
//                   </h2>
//                   <p className="text-sm text-slate-600 mt-0.5">
//                     {data.items?.length || 0}{" "}
//                     {data.items?.length === 1 ? "item" : "items"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
//                   <tr>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       SKU
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       Make
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       Mfg PN
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       UOM
//                     </th>
//                     <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                       Qty
//                     </th>
//                     <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                       Discount
//                     </th>
//                     <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                       Remarks
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-100">
//                   {(data.items || []).map((item) => (
//                     <Fragment key={item.id}>
//                       {/* 🔷 PARENT ROW */}
//                       <tr className="bg-slate-50 hover:bg-slate-100/70 transition-colors">
//                         {/* SKU */}
//                         <td className="p-4">
//                           <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 font-mono text-xs font-semibold">
//                             <Tag className="w-3 h-3" />
//                             {item.sku || "-"}
//                           </div>
//                         </td>

//                         {/* DESCRIPTION */}
//                         <td className="p-4">
//                           <div className="max-w-xs font-semibold text-slate-900 leading-snug">
//                             {item.description || "-"}
//                           </div>
//                         </td>

//                         {/* CATEGORY */}
//                         <td className="p-4">
//                           {item.category ? (
//                             <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-semibold">
//                               <Layers className="w-3 h-3" />
//                               {item.category}
//                             </div>
//                           ) : (
//                             <span className="text-slate-400 text-xs">-</span>
//                           )}
//                         </td>

//                         {/* MAKE */}
//                         <td className="p-4 text-slate-700 text-sm">
//                           {item.make || "-"}
//                         </td>

//                         {/* MFG PN */}
//                         <td className="p-4 text-slate-700 text-sm">
//                           {item.mfgPartNo || "-"}
//                         </td>

//                         {/* UOM */}
//                         <td className="p-4 text-slate-700 text-sm">
//                           {item.uom || "-"}
//                         </td>

//                         {/* QTY */}
//                         <td className="p-4 text-right font-semibold text-slate-900">
//                           {item.quantity ?? "-"}
//                         </td>

//                         {/* PRICE */}
//                         <td className="p-4 text-right text-slate-700">
//                           {item.price ? formatINR(item.price) : "-"}
//                         </td>

//                         {/* DISCOUNT */}
//                         <td className="p-4 text-right">
//                           {item.discount > 0 ? (
//                             <span className="text-rose-600 text-xs font-semibold">
//                               {item.discount}%
//                             </span>
//                           ) : (
//                             <span className="text-slate-400 text-xs">-</span>
//                           )}
//                         </td>

//                         {/* TOTAL */}
//                         <td className="p-4 text-right">
//                           <div className="inline-flex px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
//                             {formatINR(item.lineTotal)}
//                           </div>
//                         </td>

//                         {/* REMARKS */}
//                         <td className="p-4 text-slate-600 text-sm max-w-[200px] truncate">
//                           {item.remarks || "-"}
//                         </td>
//                       </tr>

//                       {/* 🔹 SUB ITEMS */}
//                       {item.subItems?.map((sub) => (
//                         <tr
//                           key={sub.id}
//                           className="hover:bg-indigo-50/40 transition-colors"
//                         >
//                           {/* SKU */}
//                           <td className="p-4 pl-10">
//                             <div className="text-xs text-slate-500 font-mono">
//                               ↳ {sub.sku || "-"}
//                             </div>
//                           </td>

//                           {/* NAME */}
//                           <td className="p-4">
//                             <div className="max-w-xs text-sm text-slate-800">
//                               {sub.name || "-"}
//                             </div>
//                           </td>

//                           {/* CATEGORY */}
//                           <td className="p-4">
//                             {sub.category ? (
//                               <span className="inline-block px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-xs">
//                                 {sub.category}
//                               </span>
//                             ) : (
//                               <span className="text-slate-400 text-xs">-</span>
//                             )}
//                           </td>

//                           {/* MAKE */}
//                           <td className="p-4 text-slate-700 text-sm">
//                             {sub.make || "-"}
//                           </td>

//                           {/* MFG */}
//                           <td className="p-4 text-slate-700 text-sm">
//                             {sub.mfgPartNo || "-"}
//                           </td>

//                           {/* UOM */}
//                           <td className="p-4 text-slate-700 text-sm">
//                             {sub.uom || "-"}
//                           </td>

//                           {/* QTY */}
//                           <td className="p-4 text-right text-slate-900 text-sm">
//                             {sub.quantity}
//                           </td>

//                           {/* PRICE */}
//                           <td className="p-4 text-right text-slate-700 text-sm">
//                             {formatINR(sub.price)}
//                           </td>

//                           {/* DISCOUNT */}
//                           <td className="p-4 text-right">
//                             {sub.discount > 0 ? (
//                               <span className="text-rose-500 text-xs font-medium">
//                                 {sub.discount}%
//                               </span>
//                             ) : (
//                               <span className="text-slate-400 text-xs">-</span>
//                             )}
//                           </td>

//                           {/* TOTAL */}
//                           <td className="p-4 text-right text-slate-900 font-semibold text-sm">
//                             {formatINR(sub.lineTotal)}
//                           </td>

//                           {/* REMARKS */}
//                           <td className="p-4 text-slate-400 text-xs">-</td>
//                         </tr>
//                       ))}
//                     </Fragment>
//                   ))}
//                 </tbody>

//                 <tfoot className="bg-slate-50 border-t border-slate-200">
//                   {/* SUBTOTAL */}
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-3 text-right text-sm font-semibold text-slate-600"
//                     >
//                       Subtotal
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <div className="text-base font-bold text-slate-900">
//                         {formatINR(totals.subtotal)}
//                       </div>
//                     </td>
//                     <td />
//                   </tr>

//                   {/* DISCOUNT */}
//                   {totals.discount > 0 && (
//                     <tr>
//                       <td
//                         colSpan={9}
//                         className="px-4 py-2.5 text-right text-sm font-medium text-rose-600"
//                       >
//                         Discount
//                       </td>
//                       <td className="px-4 py-2.5 text-right text-sm font-semibold text-rose-600">
//                         -{formatINR(totals.discount)}
//                       </td>
//                       <td />
//                     </tr>
//                   )}

//                   {/* TAXABLE */}
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-2.5 text-right text-sm font-medium text-slate-500"
//                     >
//                       Taxable Value
//                     </td>
//                     <td className="px-4 py-2.5 text-right text-sm font-semibold text-slate-800">
//                       {formatINR(totals.taxable)}
//                     </td>
//                     <td />
//                   </tr>

//                   {/* CGST */}
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-2 text-right text-xs text-slate-500"
//                     >
//                       CGST (9%)
//                     </td>
//                     <td className="px-4 py-2 text-right text-sm font-medium text-slate-700">
//                       {formatINR(totals.cgst)}
//                     </td>
//                     <td />
//                   </tr>

//                   {/* SGST */}
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-2 text-right text-xs text-slate-500"
//                     >
//                       SGST (9%)
//                     </td>
//                     <td className="px-4 py-2 text-right text-sm font-medium text-slate-700">
//                       {formatINR(totals.sgst)}
//                     </td>
//                     <td />
//                   </tr>

//                   {/* GRAND TOTAL */}
//                   <tr className="bg-slate-100 border-t border-slate-300">
//                     <td
//                       colSpan={9}
//                       className="px-4 py-4 text-right text-base font-bold text-slate-900"
//                     >
//                       Grand Total
//                     </td>
//                     <td className="px-4 py-4 text-right">
//                       <div className="text-xl font-extrabold text-emerald-600 tracking-tight">
//                         {formatINR(totals.grandTotal)}
//                       </div>
//                     </td>
//                     <td />
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* NOTES & TERMS */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//             <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200 px-6 py-5">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
//                   <MessageSquare className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-slate-900 text-lg">
//                     Additional Information
//                   </h2>
//                   <p className="text-sm text-slate-600 mt-0.5">
//                     Notes and terms
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 space-y-5">
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <MessageSquare className="w-4 h-4 text-slate-500" />
//                   <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
//                     Notes
//                   </h3>
//                 </div>
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                   <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
//                     {data.notes || "No notes provided"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="group">
//       <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//         <span className="text-slate-400">{icon}</span>
//         {label}
//       </div>
//       <div className="text-sm font-semibold text-slate-900">{value || "-"}</div>
//     </div>
//   );
// }

// function SummaryRow({
//   icon,
//   label,
//   value,
//   light = false,
//   small = false,
//   highlight,
// }) {
//   const textColor = light ? "text-white" : "text-slate-900";
//   const labelColor = light ? "text-slate-300" : "text-slate-600";
//   const highlightColors = {
//     rose: "text-rose-400",
//     emerald: "text-emerald-400",
//   };

//   return (
//     <div className="flex items-center justify-between gap-3">
//       <div className="flex items-center gap-2">
//         {icon && <span className={labelColor}>{icon}</span>}
//         <span className={`${labelColor} ${small ? "text-xs" : "text-sm"}`}>
//           {label}
//         </span>
//       </div>
//       <span
//         className={`${highlight ? highlightColors[highlight] : textColor} ${small ? "text-sm" : "text-base"} font-bold`}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// function QuickStat({ icon, label, value, color = "indigo" }) {
//   const colorClasses = {
//     indigo: "from-indigo-500 to-indigo-600",
//     emerald: "from-emerald-500 to-emerald-600",
//     rose: "from-rose-500 to-rose-600",
//   };

//   return (
//     <div className="rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all p-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div
//             className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white shadow-sm`}
//           >
//             {icon}
//           </div>
//           <div>
//             <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//               {label}
//             </div>
//             <div className="text-lg font-bold text-slate-900 mt-0.5">
//               {value}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MiniCard({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
//       <div className="text-xs text-slate-500 uppercase font-semibold">
//         {label}
//       </div>
//       <div className="mt-2 text-sm font-semibold text-slate-900">
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

//********************************************************************************************* */

// // src/features/quotations/QuotationDetail.jsx

// import { useEffect, useMemo, Fragment } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import QuotationPdfDocument from "./pdf/QuotationPdfDocument";
// import {
//   Download,
//   Pencil,
//   ChevronLeft,
//   FileText,
//   Calendar,
//   Building2,
//   Package,
//   Tag,
//   Layers,
//   MessageSquare,
//   RefreshCw,
//   CheckCircle2,
//   Clock,
//   XCircle,
//   Send,
//   ArrowUpRight,
//   Minus,
// } from "lucide-react";

// import { fetchQuotationById, clearSelectedQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";

// /* ================= STATUS CONFIG ================= */
// const STATUS_CONFIG = {
//   Draft: {
//     icon: Clock,
//     pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
//     dot: "bg-slate-400",
//     bar: "bg-slate-300",
//   },
//   Sent: {
//     icon: Send,
//     pill: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
//     dot: "bg-sky-500",
//     bar: "bg-sky-400",
//   },
//   Accepted: {
//     icon: CheckCircle2,
//     pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
//     dot: "bg-emerald-500",
//     bar: "bg-emerald-400",
//   },
//   Rejected: {
//     icon: XCircle,
//     pill: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
//     dot: "bg-rose-500",
//     bar: "bg-rose-400",
//   },
// };

// export default function QuotationDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { selected: data, loading } = useSelector((state) => state.quotation);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotationById(id));
//     return () => dispatch(clearSelectedQuotation());
//   }, [dispatch, id]);

//   /* ================= TOTALS ================= */
//   const totals = useMemo(() => {
//     if (!data) return null;
//     return {
//       subtotal: Number(data.subtotal || 0),
//       discount: Number(data.discountTotal || 0),
//       taxable: Math.max(
//         Number(data.subtotal || 0) - Number(data.discountTotal || 0),
//         0,
//       ),
//       cgst: Number(data.taxTotal || 0) / 2,
//       sgst: Number(data.taxTotal || 0) / 2,
//       grandTotal: Number(data.grandTotal || 0),
//     };
//   }, [data]);

//   /* ================= LOADING ================= */
//   if (loading || !data) {
//     return (
//       <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="relative">
//             <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
//               <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
//             </div>
//           </div>
//           <div className="text-center">
//             <p className="text-sm font-semibold text-slate-700">
//               Loading quotation
//             </p>
//             <p className="text-xs text-slate-400 mt-0.5">
//               Please wait a moment…
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statusCfg = STATUS_CONFIG[data.status] || STATUS_CONFIG.Draft;
//   const StatusIcon = statusCfg.icon;

//   /* ================= HELPERS ================= */
//   const fmtDate = (d) =>
//     d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-slate-50">
//       {/* ── TOP ACCENT BAR ── */}
//       <div className={`h-1 w-full ${statusCfg.bar}`} />

//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
//         {/* ── BREADCRUMB / NAV ── */}
//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => navigate(-1)}
//             className="group inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
//             <span className="font-medium">Quotations</span>
//           </button>

//           <div className="flex items-center gap-2">
//             <PDFDownloadLink
//               document={<QuotationPdfDocument quotation={data} />}
//               fileName={`${data.quotationNo || data.quotationNumber || "quotation"}.pdf`}
//             >
//               {({ loading: pdfLoading }) => (
//                 <button
//                   disabled={pdfLoading}
//                   className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all shadow-sm"
//                 >
//                   <Download className="w-4 h-4" />
//                   {pdfLoading ? "Generating…" : "Export PDF"}
//                 </button>
//               )}
//             </PDFDownloadLink>

//             <button
//               onClick={() => navigate(`/quotations/${id}/edit`)}
//               className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
//             >
//               <Pencil className="w-4 h-4" />
//               Edit
//             </button>
//           </div>
//         </div>

//         {/* ── HERO HEADER CARD ── */}
//         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//           <div className="p-6 sm:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
//               {/* Left: Number + Account */}
//               <div className="flex items-start gap-4">
//                 <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
//                   <FileText className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//                       {data.quotationNo}
//                     </h1>
//                     <span
//                       className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusCfg.pill}`}
//                     >
//                       <span
//                         className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}
//                       />
//                       {data.status}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-slate-500">
//                     {data.account?.accountName || "—"}
//                   </p>
//                 </div>
//               </div>

//               {/* Right: Quick meta */}
//               <div className="flex gap-6 sm:gap-8 text-sm">
//                 <MetaCol
//                   icon={<Calendar className="w-3.5 h-3.5" />}
//                   label="Issue date"
//                   value={fmtDate(data.issueDate)}
//                 />
//                 <MetaCol
//                   icon={<Clock className="w-3.5 h-3.5" />}
//                   label="Valid until"
//                   value={fmtDate(data.validUntil)}
//                 />
//                 <MetaCol
//                   icon={<Building2 className="w-3.5 h-3.5" />}
//                   label="Account"
//                   value={data.account?.accountName || "—"}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Summary totals strip */}
//           <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-4">
//             <div className="flex flex-wrap items-center gap-6 sm:gap-10">
//               <TotalChip
//                 label="Subtotal"
//                 value={formatINR(totals.subtotal)}
//                 muted
//               />
//               {totals.discount > 0 && (
//                 <TotalChip
//                   label="Discount"
//                   value={`-${formatINR(totals.discount)}`}
//                   red
//                 />
//               )}
//               <TotalChip
//                 label="Taxable"
//                 value={formatINR(totals.taxable)}
//                 muted
//               />
//               <TotalChip label="CGST 9%" value={formatINR(totals.cgst)} muted />
//               <TotalChip label="SGST 9%" value={formatINR(totals.sgst)} muted />
//               <div className="ml-auto">
//                 <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-0.5">
//                   Grand Total
//                 </p>
//                 <p className="text-2xl font-bold text-slate-900 tabular-nums">
//                   {formatINR(totals.grandTotal)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── MAIN CONTENT ── */}
//         <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
//           {/* ── LEFT: LINE ITEMS ── */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//             {/* Section header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
//                   <Package className="w-4 h-4 text-slate-600" />
//                 </div>
//                 <h2 className="font-semibold text-slate-800 text-sm">
//                   Line Items
//                 </h2>
//               </div>
//               <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
//                 {data.items?.length || 0}{" "}
//                 {data.items?.length === 1 ? "item" : "items"}
//               </span>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table
//                 className="w-full text-sm"
//                 style={{ tableLayout: "fixed", minWidth: "860px" }}
//               >
//                 <colgroup>
//                   <col style={{ width: "90px" }} />
//                   <col style={{ width: "200px" }} />
//                   <col style={{ width: "100px" }} />
//                   <col style={{ width: "90px" }} />
//                   <col style={{ width: "110px" }} />
//                   <col style={{ width: "60px" }} />
//                   <col style={{ width: "50px" }} />
//                   <col style={{ width: "90px" }} />
//                   <col style={{ width: "70px" }} />
//                   <col style={{ width: "100px" }} />
//                   <col style={{ width: "130px" }} />
//                 </colgroup>

//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-100">
//                     {[
//                       "SKU",
//                       "Description",
//                       "Category",
//                       "Make",
//                       "Mfg PN",
//                       "UOM",
//                       "Qty",
//                       "Price",
//                       "Disc.",
//                       "Total",
//                       "Remarks",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         className={`px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap ${["Qty", "Price", "Disc.", "Total"].includes(h) ? "text-right" : ""}`}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {(data.items || []).map((item, idx) => (
//                     <Fragment key={item.id}>
//                       {/* Parent row */}
//                       <tr
//                         className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
//                       >
//                         {/* SKU */}
//                         <td className="px-4 py-3.5">
//                           <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
//                             <Tag className="w-3 h-3" />
//                             {item.sku || "—"}
//                           </span>
//                         </td>

//                         {/* Description */}
//                         <td className="px-4 py-3.5">
//                           <p className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">
//                             {item.description || "—"}
//                           </p>
//                         </td>

//                         {/* Category */}
//                         <td className="px-4 py-3.5">
//                           {item.category ? (
//                             <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
//                               <Layers className="w-3 h-3" />
//                               {item.category}
//                             </span>
//                           ) : (
//                             <Dash />
//                           )}
//                         </td>

//                         {/* Make */}
//                         <td className="px-4 py-3.5 text-xs text-slate-600 truncate">
//                           {item.make || <Dash />}
//                         </td>

//                         {/* Mfg PN */}
//                         <td className="px-4 py-3.5 text-xs text-slate-600 font-mono truncate">
//                           {item.mfgPartNo || <Dash />}
//                         </td>

//                         {/* UOM */}
//                         <td className="px-4 py-3.5 text-xs text-slate-500">
//                           {item.uom || <Dash />}
//                         </td>

//                         {/* Qty */}
//                         <td className="px-4 py-3.5 text-right text-xs font-semibold text-slate-800">
//                           {item.quantity ?? <Dash />}
//                         </td>

//                         {/* Price */}
//                         <td className="px-4 py-3.5 text-right text-xs text-slate-600 tabular-nums">
//                           {item.price ? formatINR(item.price) : <Dash />}
//                         </td>

//                         {/* Discount */}
//                         <td className="px-4 py-3.5 text-right">
//                           {item.discount > 0 ? (
//                             <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
//                               {item.discount}%
//                             </span>
//                           ) : (
//                             <Dash />
//                           )}
//                         </td>

//                         {/* Total */}
//                         <td className="px-4 py-3.5 text-right">
//                           <span className="text-xs font-bold text-emerald-700 tabular-nums">
//                             {formatINR(item.lineTotal)}
//                           </span>
//                         </td>

//                         {/* Remarks */}
//                         <td className="px-4 py-3.5 text-xs text-slate-400 truncate">
//                           {item.remarks || <Dash />}
//                         </td>
//                       </tr>

//                       {/* Sub-items */}
//                       {(item.subItems || []).map((sub) => (
//                         <tr
//                           key={sub.id}
//                           className="border-b border-slate-50 bg-indigo-50/20 hover:bg-indigo-50/40 transition-colors"
//                         >
//                           {/* SKU (indented) */}
//                           <td className="px-4 py-2.5 pl-8">
//                             <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400">
//                               <span className="text-slate-300">↳</span>
//                               {sub.sku || "—"}
//                             </span>
//                           </td>

//                           <td className="px-4 py-2.5 text-xs text-slate-700">
//                             {sub.name || "—"}
//                           </td>

//                           <td className="px-4 py-2.5">
//                             {sub.category ? (
//                               <span className="text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
//                                 {sub.category}
//                               </span>
//                             ) : (
//                               <Dash />
//                             )}
//                           </td>

//                           <td className="px-4 py-2.5 text-xs text-slate-500 truncate">
//                             {sub.make || <Dash />}
//                           </td>
//                           <td className="px-4 py-2.5 text-xs text-slate-500 font-mono truncate">
//                             {sub.mfgPartNo || <Dash />}
//                           </td>
//                           <td className="px-4 py-2.5 text-xs text-slate-400">
//                             {sub.uom || <Dash />}
//                           </td>

//                           <td className="px-4 py-2.5 text-right text-xs text-slate-700">
//                             {sub.quantity}
//                           </td>
//                           <td className="px-4 py-2.5 text-right text-xs text-slate-500 tabular-nums">
//                             {formatINR(sub.price)}
//                           </td>

//                           <td className="px-4 py-2.5 text-right">
//                             {sub.discount > 0 ? (
//                               <span className="text-xs text-rose-500">
//                                 {sub.discount}%
//                               </span>
//                             ) : (
//                               <Dash />
//                             )}
//                           </td>

//                           <td className="px-4 py-2.5 text-right text-xs font-semibold text-slate-700 tabular-nums">
//                             {formatINR(sub.lineTotal)}
//                           </td>

//                           <td className="px-4 py-2.5">
//                             <Dash />
//                           </td>
//                         </tr>
//                       ))}
//                     </Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals footer */}
//             <div className="border-t border-slate-100 px-6 py-5">
//               <div className="max-w-xs ml-auto space-y-2.5">
//                 <FooterRow
//                   label="Subtotal"
//                   value={formatINR(totals.subtotal)}
//                 />
//                 {totals.discount > 0 && (
//                   <FooterRow
//                     label="Discount"
//                     value={`-${formatINR(totals.discount)}`}
//                     red
//                   />
//                 )}
//                 <FooterRow
//                   label="Taxable value"
//                   value={formatINR(totals.taxable)}
//                   muted
//                 />
//                 <FooterRow
//                   label="CGST (9%)"
//                   value={formatINR(totals.cgst)}
//                   small
//                 />
//                 <FooterRow
//                   label="SGST (9%)"
//                   value={formatINR(totals.sgst)}
//                   small
//                 />
//                 <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
//                   <span className="text-sm font-bold text-slate-900">
//                     Grand Total
//                   </span>
//                   <span className="text-lg font-extrabold text-emerald-600 tabular-nums">
//                     {formatINR(totals.grandTotal)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── RIGHT SIDEBAR ── */}
//           <div className="space-y-4">
//             {/* Status card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
//                 Status
//               </p>
//               <div
//                 className={`flex items-center gap-3 rounded-xl px-4 py-3 ${statusCfg.pill}`}
//               >
//                 <StatusIcon className="w-5 h-5 shrink-0" />
//                 <span className="font-semibold text-sm">{data.status}</span>
//               </div>
//             </div>

//             {/* Account card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
//                 Account
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
//                   <Building2 className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800 leading-tight">
//                     {data.account?.accountName || "—"}
//                   </p>
//                   {data.account?.gstin && (
//                     <p className="text-xs text-slate-400 font-mono mt-0.5">
//                       {data.account.gstin}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Dates card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
//                 Timeline
//               </p>
//               <div className="space-y-3">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex items-center gap-2 text-xs text-slate-500">
//                     <Calendar className="w-3.5 h-3.5" />
//                     Issue date
//                   </div>
//                   <span className="text-xs font-semibold text-slate-800">
//                     {fmtDate(data.issueDate)}
//                   </span>
//                 </div>
//                 <div className="h-px bg-slate-100" />
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex items-center gap-2 text-xs text-slate-500">
//                     <Clock className="w-3.5 h-3.5" />
//                     Valid until
//                   </div>
//                   <span className="text-xs font-semibold text-slate-800">
//                     {fmtDate(data.validUntil)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Financial summary card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
//               <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
//                 Summary
//               </p>
//               <div className="space-y-2.5">
//                 <SidebarRow
//                   label="Subtotal"
//                   value={formatINR(totals.subtotal)}
//                 />
//                 {totals.discount > 0 && (
//                   <SidebarRow
//                     label="Discount"
//                     value={`-${formatINR(totals.discount)}`}
//                     red
//                   />
//                 )}
//                 <SidebarRow label="Taxable" value={formatINR(totals.taxable)} />
//                 <SidebarRow
//                   label="GST (18%)"
//                   value={formatINR(totals.cgst + totals.sgst)}
//                 />
//                 <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
//                   <span className="text-sm font-bold text-slate-900">
//                     Total
//                   </span>
//                   <span className="text-sm font-extrabold text-emerald-600 tabular-nums">
//                     {formatINR(totals.grandTotal)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Notes card */}
//             {data.notes && (
//               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
//                 <div className="flex items-center gap-2">
//                   <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
//                   <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
//                     Notes
//                   </p>
//                 </div>
//                 <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
//                   {data.notes}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── NOTES (if no sidebar notes or long notes) ── */}
//         {!data.notes && (
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100">
//               <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
//                 <MessageSquare className="w-4 h-4 text-amber-600" />
//               </div>
//               <h2 className="font-semibold text-slate-800 text-sm">Notes</h2>
//             </div>
//             <div className="px-6 py-5">
//               <p className="text-sm text-slate-400 italic">
//                 No notes provided.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= SUB-COMPONENTS ================= */

// function Dash() {
//   return <span className="text-slate-300 text-xs">—</span>;
// }

// function MetaCol({ icon, label, value }) {
//   return (
//     <div>
//       <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
//         {icon}
//         <span className="uppercase tracking-wider font-medium">{label}</span>
//       </div>
//       <p className="text-sm font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function TotalChip({ label, value, muted, red }) {
//   return (
//     <div>
//       <p className="text-xs text-slate-400 mb-0.5">{label}</p>
//       <p
//         className={`text-sm font-semibold tabular-nums ${red ? "text-rose-600" : muted ? "text-slate-600" : "text-slate-900"}`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function FooterRow({ label, value, small, muted, red }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span
//         className={`${small ? "text-xs text-slate-400" : "text-sm text-slate-500"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`tabular-nums font-semibold ${small ? "text-xs" : "text-sm"} ${red ? "text-rose-600" : muted ? "text-slate-500" : "text-slate-800"}`}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// function SidebarRow({ label, value, red }) {
//   return (
//     <div className="flex items-center justify-between gap-2">
//       <span className="text-xs text-slate-500">{label}</span>
//       <span
//         className={`text-xs font-semibold tabular-nums ${red ? "text-rose-600" : "text-slate-700"}`}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// src/features/quotations/QuotationDetail.jsx

import { useEffect, useMemo, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotationPdfDocument from "./pdf/QuotationPdfDocument";
import {
  Download,
  Pencil,
  ChevronLeft,
  FileText,
  Calendar,
  Building2,
  Package,
  Tag,
  Layers,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Receipt,
  PercentIcon,
  Calculator,
  RefreshCw,
  FileCheck,
  Hash,
  Ruler,
  Wrench,
} from "lucide-react";

import { fetchQuotationById, clearSelectedQuotation } from "./quotationSlice";
import { formatINR } from "./quotationUtils";

export default function QuotationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected: data, loading } = useSelector((state) => state.quotation);

  console.log("PDF DATA →", data);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchQuotationById(id));

    return () => {
      dispatch(clearSelectedQuotation());
    };
  }, [dispatch, id]);

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    if (!data) return null;

    return {
      subtotal: Number(data.subtotal || 0),
      discount: Number(data.discountTotal || 0),
      taxable: Math.max(
        Number(data.subtotal || 0) - Number(data.discountTotal || 0),
        0,
      ),
      cgst: Number(data.taxTotal || 0) / 2,
      sgst: Number(data.taxTotal || 0) / 2,
      grandTotal: Number(data.grandTotal || 0),
    };
  }, [data]);

  const itemCount = data?.items?.length || 0;
  const categoryCount = useMemo(() => {
    const categories = new Set();
    (data?.items || []).forEach((item) => {
      if (item.category) categories.add(item.category);
      (item.subItems || []).forEach((sub) => {
        if (sub.category) categories.add(sub.category);
      });
    });
    return categories.size;
  }, [data]);

  /* ================= LOADING ================= */
  if (loading || !data) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_24%),linear-gradient(to_bottom,_#f8fafc,_#f8fafc,_#eef2ff_120%)] px-4">
        <div className="rounded-3xl border border-white/70 bg-white/85 px-8 py-10 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur">
          <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-indigo-500" />
          <p className="font-medium text-slate-600">
            Loading quotation details...
          </p>
        </div>
      </div>
    );
  }

  /* ================= UI HELPERS ================= */
  const status = (data.status || "Draft").toString();
  const statusColor = getStatusColor(status);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_24%),linear-gradient(to_bottom,_#f8fafc,_#f8fafc,_#eef2ff_120%)] px-3 py-4 sm:px-5 sm:py-5">
      <div className="mx-auto w-full max-w-[1700px] space-y-5">
        {/* ================= TOP BAR ================= */}
        <div className="rounded-[28px] border border-white/70 bg-white/85 px-5 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-6 lg:px-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Quotations
              </button>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">
                <FileText className="h-3.5 w-3.5" />
                Quotation Details
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    {data.quotationNo}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                    {data.account?.accountName || "-"} · Created on{" "}
                    {formatDate(data.createdAt)}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${statusColor}`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PDFDownloadLink
                document={
                  data ? (
                    <QuotationPdfDocument
                      quotation={data}
                      totals={totals || {}}
                    />
                  ) : null
                }
                fileName={`${
                  data?.quotationNo || data?.quotationNumber || "quotation"
                }.pdf`}
              >
                {({ loading: pdfLoading }) => (
                  <button
                    disabled={pdfLoading}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" />
                    {pdfLoading ? "Preparing PDF..." : "Export Proposal"}
                  </button>
                )}
              </PDFDownloadLink>

              <button
                onClick={() => navigate(`/quotations/${id}/edit`)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] transition hover:from-indigo-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-[0_16px_34px_rgba(79,70,229,0.34)]"
              >
                <Pencil className="h-4 w-4" />
                Edit Quotation
              </button>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="w-full">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* OVERVIEW CARD */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(59,130,246,0.05),rgba(255,255,255,0.9))] px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        {data.quotationNo}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {data.account?.accountName || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <MiniStat
                      icon={<Calendar className="h-4 w-4" />}
                      label="Issue Date"
                      value={formatDate(data.issueDate)}
                    />
                    <MiniStat
                      icon={<Calendar className="h-4 w-4" />}
                      label="Valid Until"
                      value={formatDate(data.validUntil)}
                    />
                    <MiniStat
                      icon={<Building2 className="h-4 w-4" />}
                      label="Account"
                      value={data.account?.accountName || "-"}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:grid-cols-4 sm:px-6">
                <QuickStat
                  icon={<Layers className="h-4 w-4" />}
                  label="Items"
                  value={itemCount}
                  color="indigo"
                />
                <QuickStat
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Deal"
                  value={data.deal?.dealName || "-"}
                  color="emerald"
                />
                <QuickStat
                  icon={<Hash className="h-4 w-4" />}
                  label="Quotation No"
                  value="1"
                  color="rose"
                />
                <QuickStat
                  icon={<FileCheck className="h-4 w-4" />}
                  label="Status"
                  value={status}
                  color="indigo"
                />
              </div>
            </div>

            {/* ITEMS TABLE */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-5 sm:px-6 md:flex-row md:items-end md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-slate-200 p-2.5 text-slate-700">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Line Items
                    </h2>
                    <p className="mt-0.5 text-sm text-slate-600">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Pill
                    icon={<PercentIcon className="h-3.5 w-3.5" />}
                    label="GST Included"
                  />
                  <Pill
                    icon={<Calculator className="h-3.5 w-3.5" />}
                    label="Auto Totals"
                  />
                  <Pill
                    icon={<Receipt className="h-3.5 w-3.5" />}
                    label="Tax Summary"
                  />
                </div>
              </div>

              <div className="max-h-[400px] sm:max-h-[450px] lg:max-h-[520px] overflow-auto">
                <table className="w-full table-fixed text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-50/95 text-slate-500 backdrop-blur">
                    <tr className="border-b border-slate-200">
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[10%]">
                        SKU
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[28%]">
                        Description
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[12%]">
                        Category
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[10%]">
                        Make
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[12%]">
                        Mfg PN
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[6%]">
                        UOM
                      </th>
                      <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] w-[6%]">
                        Qty
                      </th>
                      <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] w-[8%]">
                        Price
                      </th>
                      <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] w-[8%]">
                        Discount
                      </th>
                      <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] w-[10%]">
                        Total
                      </th>
                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] w-[10%]">
                        Remarks
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {(data.items || []).map((item) => (
                      <Fragment key={item.id}>
                        {/* PARENT ROW */}
                        <tr className="bg-white hover:bg-indigo-50/30 transition">
                          <td className="px-5 py-4 align-top">
                            <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-800">
                              <Tag className="h-3 w-3" />
                              {item.sku || "-"}
                            </div>
                          </td>

                          {/* ✅ JUSTIFIED DESCRIPTION */}
                          <td className="px-5 py-4 align-top">
                            <div className="text-justify leading-7 text-slate-900 font-medium">
                              {item.description || "-"}
                            </div>
                          </td>

                          <td className="px-5 py-4 align-top">
                            {item.category ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                                <Layers className="h-3 w-3" />
                                {item.category}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">-</span>
                            )}
                          </td>

                          <td className="px-5 py-4 text-slate-700">
                            {item.make || "-"}
                          </td>
                          <td className="px-5 py-4 text-slate-700">
                            {item.mfgPartNo || "-"}
                          </td>
                          <td className="px-5 py-4 text-slate-700">
                            {item.uom || "-"}
                          </td>

                          <td className="px-5 py-4 text-right font-semibold">
                            {item.quantity ?? "-"}
                          </td>

                          <td className="px-5 py-4 text-right text-slate-700">
                            {item.price ? formatINR(item.price) : "-"}
                          </td>

                          <td className="px-5 py-4 text-right">
                            {item.discount > 0 ? (
                              <span className="text-xs font-semibold text-rose-600">
                                {item.discount}%
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">-</span>
                            )}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <div className="inline-flex rounded-xl bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                              {formatINR(item.lineTotal)}
                            </div>
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            <div className="max-w-[180px] truncate">
                              {item.remarks || "-"}
                            </div>
                          </td>
                        </tr>

                        {/* SUB ITEMS */}
                        {item.subItems?.map((sub) => (
                          <tr
                            key={sub.id}
                            className="bg-slate-50/40 hover:bg-indigo-50/20 transition"
                          >
                            <td className="px-5 py-4 pl-10 text-xs text-slate-500 font-mono">
                              ↳ {sub.sku || "-"}
                            </td>

                            <td className="px-5 py-4">
                              <div className="text-justify text-sm text-slate-800 leading-6">
                                {sub.name || "-"}
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              {sub.category ? (
                                <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700">
                                  {sub.category}
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">
                                  -
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 text-slate-700">
                              {sub.make || "-"}
                            </td>
                            <td className="px-5 py-4 text-slate-700">
                              {sub.mfgPartNo || "-"}
                            </td>
                            <td className="px-5 py-4 text-slate-700">
                              {sub.uom || "-"}
                            </td>

                            <td className="px-5 py-4 text-right">
                              {sub.quantity}
                            </td>
                            <td className="px-5 py-4 text-right">
                              {formatINR(sub.price)}
                            </td>

                            <td className="px-5 py-4 text-right">
                              {sub.discount > 0 ? (
                                <span className="text-xs text-rose-500">
                                  {sub.discount}%
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">
                                  -
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 text-right font-semibold">
                              {formatINR(sub.lineTotal)}
                            </td>

                            <td className="px-5 py-4 text-xs text-slate-400">
                              -
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>

                  {/* FOOTER unchanged */}
                  <tfoot className="border-t border-slate-200 bg-slate-50">
                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-3 text-right font-semibold text-slate-600"
                      >
                        Subtotal
                      </td>
                      <td className="px-5 py-3 text-right font-bold">
                        {formatINR(totals.subtotal)}
                      </td>
                      <td />
                    </tr>

                    {totals.discount > 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-5 py-2.5 text-right text-rose-600"
                        >
                          Discount
                        </td>
                        <td className="px-5 py-2.5 text-right text-rose-600 font-semibold">
                          -{formatINR(totals.discount)}
                        </td>
                        <td />
                      </tr>
                    )}

                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-2.5 text-right text-slate-500"
                      >
                        Taxable Value
                      </td>
                      <td className="px-5 py-2.5 text-right font-semibold">
                        {formatINR(totals.taxable)}
                      </td>
                      <td />
                    </tr>

                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-2 text-right text-xs text-slate-500"
                      >
                        CGST (9%)
                      </td>
                      <td className="px-5 py-2 text-right">
                        {formatINR(totals.cgst)}
                      </td>
                      <td />
                    </tr>

                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-2 text-right text-xs text-slate-500"
                      >
                        SGST (9%)
                      </td>
                      <td className="px-5 py-2 text-right">
                        {formatINR(totals.sgst)}
                      </td>
                      <td />
                    </tr>

                    <tr className="bg-slate-100 border-t">
                      <td
                        colSpan={9}
                        className="px-5 py-4 text-right font-bold"
                      >
                        Grand Total
                      </td>
                      <td className="px-5 py-4 text-right text-xl font-black text-emerald-600">
                        {formatINR(totals.grandTotal)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* NOTES */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(255,237,213,0.85))] px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-amber-100 p-2.5 text-amber-700">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Additional Information
                    </h2>
                    <p className="mt-0.5 text-sm text-slate-600">
                      Notes and terms
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">
                    Notes
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {data.notes || "No notes provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY PANEL */}
          {/* <aside className="space-y-6 xl:sticky xl:top-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.06)]">
              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(99,102,241,0.10),rgba(255,255,255,0.95))] px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Summary
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      Quotation Overview
                    </h3>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${statusColor}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {status}
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <SummaryRow
                    icon={<DollarSign className="h-4 w-4" />}
                    label="Subtotal"
                    value={formatINR(totals.subtotal)}
                  />
                  <div className="my-3 h-px bg-slate-200" />
                  <SummaryRow
                    icon={<PercentIcon className="h-4 w-4" />}
                    label="Discount"
                    value={`-${formatINR(totals.discount)}`}
                    highlight="rose"
                  />
                  <SummaryRow
                    icon={<Calculator className="h-4 w-4" />}
                    label="Taxable Value"
                    value={formatINR(totals.taxable)}
                  />
                  <SummaryRow
                    icon={<Receipt className="h-4 w-4" />}
                    label="CGST (9%)"
                    value={formatINR(totals.cgst)}
                  />
                  <SummaryRow
                    icon={<Receipt className="h-4 w-4" />}
                    label="SGST (9%)"
                    value={formatINR(totals.sgst)}
                  />
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 p-5 text-white shadow-[0_14px_30px_rgba(16,185,129,0.22)]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
                    <TrendingUp className="h-4 w-4" />
                    Grand Total
                  </div>
                  <div className="mt-3 text-3xl font-black tracking-tight">
                    {formatINR(totals.grandTotal)}
                  </div>
                  <p className="mt-2 text-sm text-emerald-50/90">
                    Final quotation amount including GST.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-slate-500" />
                    <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">
                      Metadata
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <SummaryRow
                      icon={<Calendar className="h-4 w-4" />}
                      label="Issue Date"
                      value={formatDate(data.issueDate)}
                      small
                    />
                    <SummaryRow
                      icon={<Calendar className="h-4 w-4" />}
                      label="Valid Until"
                      value={formatDate(data.validUntil)}
                      small
                    />
                    <SummaryRow
                      icon={<Building2 className="h-4 w-4" />}
                      label="Account"
                      value={data.account?.accountName || "-"}
                      small
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-slate-500" />
                    <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">
                      Quick Stats
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <MiniCard label="Items" value={itemCount} />
                    <MiniCard label="Categories" value={categoryCount} />
                    <MiniCard
                      label="Grand Total"
                      value={formatINR(totals.grandTotal)}
                    />
                    <MiniCard
                      label="Taxable"
                      value={formatINR(totals.taxable)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { dateStyle: "medium" });
}

function getStatusColor(status) {
  const normalized = (status || "").toString().trim().toUpperCase();

  const colors = {
    DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
    SENT: "bg-blue-100 text-blue-700 border-blue-200",
    ACCEPTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return colors[normalized] || "bg-slate-100 text-slate-700 border-slate-200";
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900">{value || "-"}</div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-900">
        {value || "-"}
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value, small = false, highlight }) {
  const highlightColors = {
    rose: "text-rose-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-500">{icon}</span>}
        <span className={`text-slate-600 ${small ? "text-xs" : "text-sm"}`}>
          {label}
        </span>
      </div>
      <span
        className={`font-bold ${
          highlight ? highlightColors[highlight] : "text-slate-900"
        } ${small ? "text-sm" : "text-base"}`}
      >
        {value}
      </span>
    </div>
  );
}

function QuickStat({ icon, label, value, color = "indigo" }) {
  const colorClasses = {
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    rose: "from-rose-500 to-rose-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-xl bg-gradient-to-br ${colorClasses[color]} p-2.5 text-white shadow-sm`}
        >
          {icon}
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </div>
          <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
      {icon}
      {label}
    </span>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-slate-900">
        {value || "-"}
      </div>
    </div>
  );
}
