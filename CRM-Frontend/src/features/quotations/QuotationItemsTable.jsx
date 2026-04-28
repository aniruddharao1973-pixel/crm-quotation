// // src/features/quotations/QuotationItemsTable.jsx

// import { Plus, Trash2 } from "lucide-react";
// import { formatINR } from "./quotationUtils";

// export default function QuotationItemsTable({
//   totals,
//   itemsList,
//   updateItem,
//   addItem,
//   removeItem,
// }) {
//   return (
//     <div className="rounded-2xl border bg-white overflow-hidden">

//       <div className="flex justify-between p-4 border-b">
//         <h2 className="font-semibold">Line Items</h2>

//         <button
//           onClick={addItem}
//           className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-xl text-sm"
//         >
//           <Plus className="w-4 h-4" />
//           Add Item
//         </button>
//       </div>

//       <table className="w-full text-sm">
//         <thead className="bg-slate-50">
//           <tr>
//             <th className="p-3 text-left">Item</th>
//             <th>Qty</th>
//             <th>Price</th>
//             <th>Discount</th>
//             <th>Total</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {totals.rows.map((row, index) => (
//             <tr key={index} className="border-t">

//               {/* ITEM */}
//               <td className="p-3">
//                 <select
//                   value={row.itemId}
//                   onChange={(e) =>
//                     updateItem(index, "itemId", e.target.value)
//                   }
//                   className="w-full rounded-xl border px-2 py-1"
//                 >
//                   <option value="">Select</option>
//                   {itemsList.map((i) => (
//                     <option key={i.id} value={i.id}>
//                       {i.name}
//                     </option>
//                   ))}
//                 </select>
//               </td>

//               {/* QTY */}
//               <td>
//                 <input
//                   type="number"
//                   value={row.qty}
//                   onChange={(e) =>
//                     updateItem(index, "qty", e.target.value)
//                   }
//                   className="w-full rounded-xl border px-2 py-1 text-right"
//                 />
//               </td>

//               {/* PRICE */}
//               <td>
//                 <input
//                   type="number"
//                   value={row.price}
//                   onChange={(e) =>
//                     updateItem(index, "price", e.target.value)
//                   }
//                   className="w-full rounded-xl border px-2 py-1 text-right"
//                 />
//               </td>

//               {/* DISCOUNT */}
//               <td>
//                 <input
//                   type="number"
//                   value={row.discount}
//                   onChange={(e) =>
//                     updateItem(index, "discount", e.target.value)
//                   }
//                   className="w-full rounded-xl border px-2 py-1 text-right"
//                 />
//               </td>

//               {/* TOTAL */}
//               <td className="font-semibold text-right pr-2">
//                 {formatINR(row.net)}
//               </td>

//               {/* DELETE */}
//               <td className="text-center">
//                 <button onClick={() => removeItem(index)}>
//                   <Trash2 className="w-4 h-4 text-red-500" />
//                 </button>
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // src/features/quotations/QuotationItemsTable.jsx

// import {
//   Plus,
//   Trash2,
//   PackageSearch,
//   Sparkles,
//   Calculator,
// } from "lucide-react";
// import { formatINR } from "./quotationUtils";

// function Metric({ label, value }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
//       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
//         {label}
//       </div>
//       <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
//     </div>
//   );
// }

// function CellLabel({ children }) {
//   return (
//     <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
//       {children}
//     </div>
//   );
// }

// export default function QuotationItemsTable({
//   totals,
//   itemsList,
//   updateItem,
//   addItem,
//   removeItem,
//   formItems,
//   toggleSubItem,
//   updateSubItem,
//   autoSave, // ✅ ADD THIS
// }) {
//   const rowCount = totals?.rows?.length || 0;
//   const filledCount =
//     totals?.rows?.filter(
//       (row) => row.itemId || row.description || row.qty || row.price,
//     )?.length || 0;

//   return (
//     <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//       <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-5 py-4 sm:px-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div>
//             <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
//               <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
//               Line Items
//             </div>
//             <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
//               Item breakdown
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Select products from master data and fine-tune quantity, pricing,
//               and discount per row.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <Metric label="Rows" value={`${rowCount} total`} />
//             <Metric label="Filled" value={`${filledCount} active`} />
//             <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
//           </div>
//         </div>
//       </div>

//       <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
//         <button
//           onClick={addItem}
//           className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
//         >
//           <Plus className="h-4 w-4" />
//           Add Item Row
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-[1400px] w-full border-separate border-spacing-0 text-sm">
//           <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
//             <tr className="text-slate-600">
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Item
//               </th>

//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 SKU
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Category
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Description
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Qty
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Price
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Discount
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Line Total
//               </th>
//               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {totals.rows.map((row, index) => {
//               const formRow = formItems[index];
//               const selectedItem = itemsList.find((i) => i.id === row.itemId);

//               return (
//                 <>
//                   {/* ================= MAIN ROW ================= */}
//                   <tr
//                     key={index}
//                     className="group border-b border-slate-100 transition hover:bg-slate-50/70"
//                   >
//                     {/* ITEM */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Item</CellLabel>
//                       <div className="space-y-2">
//                         <div className="relative">
//                           <select
//                             value={row.itemId}
//                             onChange={(e) =>
//                               updateItem(index, "itemId", e.target.value)
//                             }
//                             className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                           >
//                             <option value="">Select item</option>
//                             {itemsList.map((i) => (
//                               <option key={i.id} value={i.id}>
//                                 {i.name}
//                                 {i.sku ? ` • ${i.sku}` : ""}
//                               </option>
//                             ))}
//                           </select>
//                           <PackageSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//                         </div>

//                         <div className="text-xs text-slate-500">
//                           {selectedItem ? (
//                             <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700">
//                               {selectedItem.sku || "SKU not set"}
//                               {selectedItem.category
//                                 ? ` · ${selectedItem.category}`
//                                 : ""}
//                             </span>
//                           ) : (
//                             <span className="text-slate-400">
//                               Choose from master data
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </td>

//                     {/* SKU */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>SKU</CellLabel>
//                       <div className="text-sm text-slate-700">
//                         {selectedItem?.sku || "-"}
//                       </div>
//                     </td>

//                     {/* CATEGORY */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Category</CellLabel>
//                       <div className="text-sm text-slate-700">
//                         {selectedItem?.category || "-"}
//                       </div>
//                     </td>

//                     {/* DESCRIPTION */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Description</CellLabel>
//                       <input
//                         value={row.description}
//                         onChange={(e) =>
//                           updateItem(index, "description", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm"
//                       />
//                     </td>

//                     {/* QTY */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Qty</CellLabel>
//                       <input
//                         type="number"
//                         min="1"
//                         value={row.qty === 0 ? "" : row.qty}
//                         onChange={(e) =>
//                           updateItem(index, "qty", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                       />
//                     </td>

//                     {/* PRICE */}
//                     {/* PRICE */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Price</CellLabel>
//                       <input
//                         type="number"
//                         min="0"
//                         disabled={
//                           formItems[index]?.selectedSubItems?.length > 0
//                         }
//                         value={row.price === 0 ? "" : row.price}
//                         onChange={(e) =>
//                           updateItem(index, "price", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         placeholder={
//                           formItems[index]?.selectedSubItems?.length > 0
//                             ? "Auto from sub-items"
//                             : ""
//                         }
//                         className="w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
//                       />
//                     </td>

//                     {/* DISCOUNT */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Discount</CellLabel>
//                       <input
//                         type="number"
//                         min="0"
//                         value={row.discount === 0 ? "" : row.discount}
//                         onChange={(e) =>
//                           updateItem(index, "discount", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         className="w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                       />
//                     </td>

//                     {/* TOTAL */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Line Total</CellLabel>
//                       <div className="inline-flex min-w-32 items-center rounded-2xl bg-emerald-50 px-3 py-2.5 text-right text-sm font-semibold text-emerald-700">
//                         {formatINR(row.net)}
//                       </div>
//                     </td>

//                     {/* ACTION */}
//                     <td className="px-4 py-4 align-top">
//                       <CellLabel>Action</CellLabel>
//                       <button
//                         onClick={() => removeItem(index)}
//                         className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100 hover:text-rose-700"
//                         aria-label="Remove row"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* ================= SUB ITEMS AS ROWS (ENHANCED UX) ================= */}
//                   {formItems[index]?.subItems?.length > 0 &&
//                     formItems[index].subItems.map((sub) => {
//                       const selected = formItems[index].selectedSubItems.find(
//                         (s) => s.id === sub.id,
//                       );

//                       const checked = !!selected;

//                       const qty = selected?.qty || 1;
//                       const price = selected?.price ?? sub.basePrice ?? 0;
//                       const discount = selected?.discount || 0;

//                       const lineTotal = qty * price - discount;

//                       return (
//                         <tr
//                           key={sub.id}
//                           className={`border-b transition ${
//                             checked
//                               ? "bg-emerald-50/60"
//                               : "bg-slate-50 hover:bg-slate-100"
//                           }`}
//                         >
//                           {/* ITEM + CHECKBOX */}
//                           <td className="px-4 py-3">
//                             <div className="flex items-start gap-2 ml-8">
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() => toggleSubItem(index, sub)}
//                                 className="mt-1 accent-indigo-600"
//                               />

//                               <div className="flex flex-col">
//                                 <span className="text-sm font-semibold text-slate-800">
//                                   {sub.name}
//                                 </span>

//                                 {sub.uom && (
//                                   <span className="text-xs text-slate-400">
//                                     {sub.uom}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* SKU */}
//                           <td className="px-4 py-3">
//                             <div className="text-sm text-slate-700">
//                               {sub.sku || "-"}
//                             </div>
//                           </td>

//                           {/* CATEGORY */}
//                           <td className="px-4 py-3">
//                             <div className="text-sm text-slate-700">
//                               {sub.category || "-"}
//                             </div>
//                           </td>

//                           {/* DESCRIPTION (EDITABLE) */}
//                           <td className="px-4 py-3">
//                             <input
//                               value={
//                                 selected?.description ?? sub.description ?? ""
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "description",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-full rounded-xl border px-2 py-1 text-sm ${
//                                 checked
//                                   ? "border-slate-200 bg-white"
//                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* QTY */}
//                           <td className="px-4 py-3">
//                             <input
//                               type="number"
//                               min="1"
//                               value={
//                                 checked
//                                   ? qty === 0
//                                     ? ""
//                                     : qty
//                                   : sub.baseQty || 1
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "qty",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-20 rounded-xl border px-2 py-1 text-right text-sm ${
//                                 checked
//                                   ? "border-slate-200 bg-white"
//                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* PRICE */}
//                           <td className="px-4 py-3">
//                             <input
//                               type="number"
//                               min="0"
//                               value={
//                                 checked
//                                   ? price === 0
//                                     ? ""
//                                     : price
//                                   : sub.basePrice || 0
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "price",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-24 rounded-xl border px-2 py-1 text-right text-sm ${
//                                 checked
//                                   ? "border-slate-200 bg-white"
//                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* DISCOUNT */}
//                           <td className="px-4 py-3">
//                             <input
//                               type="number"
//                               min="0"
//                               value={
//                                 checked ? (discount === 0 ? "" : discount) : 0
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "discount",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-24 rounded-xl border px-2 py-1 text-right text-sm ${
//                                 checked
//                                   ? "border-slate-200 bg-white"
//                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* TOTAL */}
//                           <td className="px-4 py-3 text-right">
//                             <div
//                               className={`inline-flex min-w-28 justify-end rounded-xl px-3 py-1.5 text-sm font-semibold ${
//                                 checked
//                                   ? "bg-emerald-100 text-emerald-700"
//                                   : "bg-slate-200 text-slate-500"
//                               }`}
//                             >
//                               ₹{checked ? lineTotal : 0}
//                             </div>
//                           </td>

//                           {/* ACTION */}
//                           <td className="px-4 py-3 text-center">
//                             {checked && (
//                               <button
//                                 onClick={() => toggleSubItem(index, sub)}
//                                 className="text-xs text-rose-500 hover:text-rose-600"
//                               >
//                                 Remove
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//           <Metric
//             label="Taxable Value"
//             value={formatINR(totals?.taxable || 0)}
//           />
//           <Metric
//             label="GST Total"
//             value={formatINR((totals?.cgst || 0) + (totals?.sgst || 0))}
//           />
//           <Metric
//             label="Grand Total"
//             value={formatINR(totals?.grandTotal || 0)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/features/quotations/QuotationItemsTable.jsx

// import { Plus, Trash2, PackageSearch, Sparkles } from "lucide-react";
// import { formatINR } from "./quotationUtils";

// function Metric({ label, value }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
//       <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
//         {label}
//       </div>
//       <div className="mt-0.5 text-sm font-semibold text-slate-900">{value}</div>
//     </div>
//   );
// }

// function CellLabel({ children }) {
//   return (
//     <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
//       {children}
//     </div>
//   );
// }

// export default function QuotationItemsTable({
//   totals,
//   itemsList,
//   updateItem,
//   addItem,
//   removeItem,
//   formItems,
//   toggleSubItem,
//   updateSubItem,
//   autoSave,
// }) {
//   const rowCount = totals?.rows?.length || 0;
//   const filledCount =
//     totals?.rows?.filter(
//       (row) => row.itemId || row.description || row.qty || row.price,
//     )?.length || 0;

//   return (
//     <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//       {/* ── HEADER ── */}
//       <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-5 py-4 sm:px-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
//               <Sparkles className="h-3 w-3 text-indigo-400" />
//               Line Items
//             </div>
//             <h2 className="mt-1.5 text-base font-semibold tracking-tight text-slate-900">
//               Item breakdown
//             </h2>
//             <p className="mt-0.5 text-xs text-slate-400">
//               Select products from master data and fine-tune quantity, pricing,
//               and discount per row.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <Metric label="Rows" value={`${rowCount} total`} />
//             <Metric label="Filled" value={`${filledCount} active`} />
//             <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
//           </div>
//         </div>
//       </div>

//       {/* ── TOOLBAR ── */}
//       <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
//         <button
//           onClick={addItem}
//           className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700"
//         >
//           <Plus className="h-3.5 w-3.5" />
//           Add Item Row
//         </button>
//       </div>

//       {/* ── TABLE ── */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[1400px] w-full border-separate border-spacing-0 text-sm">
//           {/* THEAD */}
//           <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
//             <tr>
//               {[
//                 "Item",
//                 "SKU",
//                 "Category",
//                 "Description",
//                 "Qty",
//                 "Price",
//                 "Discount",
//                 "Line Total",
//                 "",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="border-b border-slate-100 px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 whitespace-nowrap"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {totals.rows.map((row, index) => {
//               const selectedItem = itemsList.find((i) => i.id === row.itemId);

//               return (
//                 <>
//                   {/* ── MAIN ROW ── */}
//                   <tr
//                     key={index}
//                     className="group border-b border-slate-100 transition hover:bg-slate-50/50"
//                   >
//                     {/* ITEM */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Item</CellLabel>
//                       <div className="relative">
//                         <select
//                           value={row.itemId}
//                           onChange={(e) => {
//                             const selectedId = e.target.value;
//                             const selectedItem = itemsList.find(
//                               (i) => i.id === selectedId,
//                             );

//                             // 1. Set main item
//                             // 1. Set main item + auto fill values
//                             updateItem(index, "itemId", selectedId);
//                             updateItem(
//                               index,
//                               "price",
//                               selectedItem?.basePrice || 0,
//                             );
//                             updateItem(
//                               index,
//                               "discount",
//                               selectedItem?.discount || 0,
//                             );
//                             updateItem(
//                               index,
//                               "description",
//                               selectedItem?.description || "",
//                             );

//                             if (selectedItem?.children?.length) {
//                               // 2. Auto attach subItems
//                               updateItem(
//                                 index,
//                                 "subItems",
//                                 selectedItem.children,
//                               );

//                               // 3. Auto select ALL subItems
//                               updateItem(
//                                 index,
//                                 "selectedSubItems",
//                                 selectedItem.children.map((child) => ({
//                                   id: child.id,
//                                   itemId: child.id,
//                                   name: child.name,
//                                   qty: child.baseQty || 1,
//                                   price: child.basePrice || 0,
//                                   discount: child.discount || 0,
//                                   description: child.description || "",
//                                 })),
//                               );

//                               // 4. OPTIONAL: set parent price = 0 (since children drive total)
//                               //   updateItem(index, "price", 0);
//                             } else {
//                               // if no children → clear subItems
//                               updateItem(index, "subItems", []);
//                               updateItem(index, "selectedSubItems", []);
//                             }
//                           }}
//                           className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                         >
//                           <option value="">Select item</option>
//                           {itemsList.map((i) => (
//                             <option key={i.id} value={i.id}>
//                               {i.name}
//                               {i.sku ? ` • ${i.sku}` : ""}
//                             </option>
//                           ))}
//                         </select>
//                         <PackageSearch className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
//                       </div>
//                       {selectedItem && (
//                         <div className="mt-1.5 text-[11px] text-slate-400">
//                           {selectedItem.sku || "No SKU"}
//                           {selectedItem.category
//                             ? ` · ${selectedItem.category}`
//                             : ""}
//                         </div>
//                       )}
//                     </td>

//                     {/* SKU */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>SKU</CellLabel>
//                       <div className="text-sm text-slate-500">
//                         {selectedItem?.sku || (
//                           <span className="text-slate-300">—</span>
//                         )}
//                       </div>
//                     </td>

//                     {/* CATEGORY */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Category</CellLabel>
//                       <div className="text-sm text-slate-500">
//                         {selectedItem?.category || (
//                           <span className="text-slate-300">—</span>
//                         )}
//                       </div>
//                     </td>

//                     {/* DESCRIPTION */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Description</CellLabel>
//                       <input
//                         value={row.description}
//                         onChange={(e) =>
//                           updateItem(index, "description", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                       />
//                     </td>

//                     {/* QTY */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Qty</CellLabel>
//                       <input
//                         type="number"
//                         min="1"
//                         value={row.qty === 0 ? "" : row.qty}
//                         onChange={(e) =>
//                           updateItem(index, "qty", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                       />
//                     </td>

//                     {/* PRICE */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Price</CellLabel>
//                       <input
//                         type="number"
//                         min="0"
//                         disabled={false}
//                         value={row.price === 0 ? "" : row.price}
//                         onChange={(e) =>
//                           updateItem(index, "price", e.target.value)
//                         }
//                         onBlur={() => autoSave(formItems)}
//                         placeholder=""
//                         className="w-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
//                       />
//                     </td>

//                     {/* DISCOUNT */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Discount</CellLabel>

//                       <div className="relative w-28">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={row.discount === 0 ? "" : row.discount}
//                           onChange={(e) =>
//                             updateItem(index, "discount", e.target.value)
//                           }
//                           onBlur={() => autoSave(formItems)}
//                           className="w-full rounded-xl border border-slate-200 bg-white px-3 pr-8 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
//                         />

//                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
//                           %
//                         </span>
//                       </div>
//                     </td>

//                     {/* LINE TOTAL */}
//                     <td className="px-4 py-3 align-top">
//                       <CellLabel>Line Total</CellLabel>
//                       <div className="inline-flex min-w-28 items-center justify-end rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
//                         {formatINR(
//                           Number(row.qty || 1) *
//                             Number(row.price || 0) *
//                             (1 - Number(row.discount || 0) / 100),
//                         )}
//                       </div>
//                     </td>

//                     {/* ACTION */}
//                     <td className="px-4 py-3 align-top">
//                       <button
//                         onClick={() => removeItem(index)}
//                         className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 transition hover:bg-rose-100 hover:text-rose-700"
//                         aria-label="Remove row"
//                       >
//                         <Trash2 className="h-3.5 w-3.5" />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* ── SUB-ITEM ROWS ── */}
//                   {formItems[index]?.subItems?.length > 0 &&
//                     formItems[index].subItems.map((sub) => {
//                       const selected = formItems[index].selectedSubItems.find(
//                         (s) => s.id === (sub.id || sub.itemId),
//                       );

//                       const checked = !!selected;
//                       const qty = selected?.qty || 1;
//                       const price = selected?.price ?? sub.basePrice ?? 0;
//                       const discount = selected?.discount || 0;
//                       const lineTotal = qty * price * (1 - discount / 100);

//                       return (
//                         <tr
//                           key={sub.id}
//                           className={`border-b border-slate-100 transition ${
//                             checked
//                               ? "bg-indigo-50/30 hover:bg-indigo-50/50"
//                               : "bg-slate-50/60 hover:bg-slate-100/60"
//                           }`}
//                         >
//                           {/* ITEM + CHECKBOX */}
//                           <td className="px-4 py-2.5">
//                             <div className="flex items-center gap-2.5 pl-6">
//                               <div
//                                 className={`h-4 w-0.5 rounded-full ${checked ? "bg-indigo-300" : "bg-slate-200"}`}
//                               />
//                               <input
//                                 type="checkbox"
//                                 checked={formItems[index].selectedSubItems.some(
//                                   (s) => s.id === (sub.id || sub.itemId),
//                                 )}
//                                 onChange={() => toggleSubItem(index, sub)}
//                               />
//                               <div className="flex flex-col">
//                                 <span
//                                   className={`text-xs font-medium ${checked ? "text-slate-800" : "text-slate-500"}`}
//                                 >
//                                   {sub.name}
//                                 </span>
//                                 {sub.uom && (
//                                   <span className="text-[10px] text-slate-400">
//                                     {sub.uom}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </td>

//                           {/* SKU */}
//                           <td className="px-4 py-2.5">
//                             <span className="text-xs text-slate-400">
//                               {sub.sku || "—"}
//                             </span>
//                           </td>

//                           {/* CATEGORY */}
//                           <td className="px-4 py-2.5">
//                             <span className="text-xs text-slate-400">
//                               {sub.category || "—"}
//                             </span>
//                           </td>

//                           {/* DESCRIPTION */}
//                           <td className="px-4 py-2.5">
//                             <input
//                               value={
//                                 selected?.description ?? sub.description ?? ""
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "description",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-full rounded-lg border px-2.5 py-1.5 text-xs transition ${
//                                 checked
//                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
//                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* QTY */}
//                           <td className="px-4 py-2.5">
//                             <input
//                               type="number"
//                               min="1"
//                               value={
//                                 checked
//                                   ? qty === 0
//                                     ? ""
//                                     : qty
//                                   : sub.baseQty || 1
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "qty",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-20 rounded-lg border px-2.5 py-1.5 text-right text-xs transition ${
//                                 checked
//                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
//                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* PRICE */}
//                           <td className="px-4 py-2.5">
//                             <input
//                               type="number"
//                               min="0"
//                               value={
//                                 checked
//                                   ? price === 0
//                                     ? ""
//                                     : price
//                                   : sub.basePrice || 0
//                               }
//                               disabled={!checked}
//                               onChange={(e) =>
//                                 updateSubItem(
//                                   index,
//                                   sub.id,
//                                   "price",
//                                   e.target.value,
//                                 )
//                               }
//                               onBlur={() => autoSave(formItems)}
//                               className={`w-24 rounded-lg border px-2.5 py-1.5 text-right text-xs transition ${
//                                 checked
//                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
//                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
//                               }`}
//                             />
//                           </td>

//                           {/* DISCOUNT */}
//                           <td className="px-4 py-2.5">
//                             <div className="relative w-24">
//                               <input
//                                 type="number"
//                                 min="0"
//                                 max="100"
//                                 value={
//                                   checked ? (discount === 0 ? "" : discount) : 0
//                                 }
//                                 disabled={!checked}
//                                 onChange={(e) =>
//                                   updateSubItem(
//                                     index,
//                                     sub.id,
//                                     "discount",
//                                     e.target.value,
//                                   )
//                                 }
//                                 onBlur={() => autoSave(formItems)}
//                                 className={`w-full rounded-lg border px-2.5 pr-6 py-1.5 text-right text-xs transition ${
//                                   checked
//                                     ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
//                                     : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
//                                 }`}
//                               />

//                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
//                                 %
//                               </span>
//                             </div>
//                           </td>
//                           {/* TOTAL */}
//                           <td className="px-4 py-2.5 text-right">
//                             <div
//                               className={`inline-flex min-w-24 justify-end rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
//                                 checked
//                                   ? "bg-emerald-50 text-emerald-700"
//                                   : "bg-transparent text-slate-300"
//                               }`}
//                             >
//                               ₹{checked ? lineTotal : 0}
//                             </div>
//                           </td>

//                           {/* ACTION */}
//                           <td className="px-4 py-2.5 text-center">
//                             {checked && (
//                               <button
//                                 onClick={() => toggleSubItem(index, sub)}
//                                 className="text-[11px] font-medium text-rose-400 hover:text-rose-600 transition"
//                               >
//                                 Remove
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   {/* ── GROUP TOTAL ROW ── */}
//                   {formItems[index]?.selectedSubItems?.length > 0 && (
//                     <tr className="bg-indigo-50/40 border-b border-slate-200">
//                       <td colSpan={6}></td>

//                       <td className="px-4 py-2.5 text-right text-xs font-semibold text-slate-600">
//                         Total
//                       </td>

//                       <td className="px-4 py-2.5 text-right">
//                         <div className="inline-flex min-w-28 justify-end rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-700">
//                           {formatINR(
//                             (() => {
//                               const parentTotal =
//                                 Number(row.qty || 1) *
//                                 Number(row.price || 0) *
//                                 (1 - Number(row.discount || 0) / 100);

//                               const subTotal = formItems[
//                                 index
//                               ].selectedSubItems.reduce((sum, sub) => {
//                                 const qty = Number(sub.qty || 1);
//                                 const price = Number(sub.price || 0);
//                                 const discount = Number(sub.discount || 0);

//                                 return sum + qty * price * (1 - discount / 100);
//                               }, 0);

//                               return parentTotal + subTotal;
//                             })(),
//                           )}
//                         </div>
//                       </td>

//                       <td></td>
//                     </tr>
//                   )}
//                 </>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* ── FOOTER ── */}
//       <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
//         <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
//           <Metric
//             label="Taxable Value"
//             value={formatINR(totals?.taxable || 0)}
//           />
//           <Metric
//             label="GST Total"
//             value={formatINR((totals?.cgst || 0) + (totals?.sgst || 0))}
//           />
//           <Metric
//             label="Grand Total"
//             value={formatINR(totals?.grandTotal || 0)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// src/features/quotations/QuotationItemsTable.jsx

import {
  Plus,
  Trash2,
  PackageSearch,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { formatINR } from "./quotationUtils";

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function CellLabel({ children }) {
  return (
    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
      {children}
    </div>
  );
}

function RowBadge({ children, tone = "slate" }) {
  const classes = {
    slate: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${classes[tone] || classes.slate}`}
    >
      {children}
    </span>
  );
}

export default function QuotationItemsTable({
  totals,
  itemsList,
  updateItem,
  addItem,
  removeItem,
  formItems,
  toggleSubItem,
  updateSubItem,
  autoSave,
}) {
  const rowCount = totals?.rows?.length || 0;
  const filledCount =
    totals?.rows?.filter(
      (row) => row.itemId || row.description || row.qty || row.price,
    )?.length || 0;

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
      {/* HEADER */}
      <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(248,250,252,0.95),rgba(255,255,255,0.95),rgba(238,242,255,0.75))] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              Line Items
            </div>
            <h2 className="mt-1.5 text-base font-semibold tracking-tight text-slate-900">
              Item breakdown
            </h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-400">
              Select products from master data and fine-tune quantity, pricing,
              and discount per row.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Metric label="Rows" value={`${rowCount} total`} />
            <Metric label="Filled" value={`${filledCount} active`} />
            <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
            <RowBadge tone="emerald">
              {formItems?.filter((item) => item.selectedSubItems?.length > 0)
                ?.length || 0}{" "}
              grouped
            </RowBadge>
          </div>

          <button
            onClick={addItem}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_22px_rgba(79,70,229,0.18)] transition hover:bg-indigo-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Item Row
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[560px] rounded-b-[28px]">
        <table className="min-w-[1550px] w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
            <tr>
              {[
                "Item",
                "SKU",
                "Category",
                "Description",
                "Qty",
                "Price",
                "Discount",
                "Line Total",
                "",
              ].map((h, index) => (
                <th
                  key={h}
                  className={`border-b border-slate-100 px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 whitespace-nowrap ${
                    index === 0 ? "pl-7" : ""
                  } ${index === 1 ? "pl-4" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {totals.rows.map((row, index) => {
              const selectedItem = itemsList.find((i) => i.id === row.itemId);

              return (
                <FragmentWrapper key={`row-${index}`}>
                  {/* MAIN ROW */}
                  <tr className="group border-b border-slate-100 transition hover:bg-slate-50/70">
                    {/* ITEM */}
                    <td className="px-6 py-4 align-top w-[340px]">
                      <CellLabel>Item</CellLabel>
                      <div className="relative pr-3">
                        <select
                          value={row.itemId}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedItem = itemsList.find(
                              (i) => i.id === selectedId,
                            );

                            updateItem(index, "itemId", selectedId);
                            updateItem(
                              index,
                              "discount",
                              selectedItem?.discount || 0,
                            );
                            updateItem(
                              index,
                              "description",
                              selectedItem?.description || "",
                            );

                            if (selectedItem?.children?.length) {
                              updateItem(
                                index,
                                "subItems",
                                selectedItem.children,
                              );
                              updateItem(
                                index,
                                "selectedSubItems",
                                selectedItem.children.map((child) => ({
                                  id: child.id,
                                  itemId: child.id,
                                  name: child.name,
                                  qty: child.baseQty || 1,
                                  price: child.basePrice || 0,
                                  discount: child.discount || 0,
                                  description: child.description || "",
                                })),
                              );
                            } else {
                              updateItem(index, "subItems", []);
                              updateItem(index, "selectedSubItems", []);
                            }
                          }}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                        >
                          <option value="">Select item</option>
                          {itemsList.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.name}
                              {i.sku ? ` • ${i.sku}` : ""}
                            </option>
                          ))}
                        </select>
                        <PackageSearch className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                      </div>

                      {selectedItem && (
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          {selectedItem.sku && (
                            <RowBadge>{selectedItem.sku}</RowBadge>
                          )}
                          {selectedItem.category && (
                            <RowBadge tone="indigo">
                              {selectedItem.category}
                            </RowBadge>
                          )}
                        </div>
                      )}
                    </td>

                    {/* SKU */}
                    <td className="px-6 py-4 align-top w-[170px]">
                      <CellLabel>SKU</CellLabel>
                      <div className="pl-2 border-l border-slate-100 text-sm text-slate-500">
                        {selectedItem?.sku || (
                          <span className="text-slate-300">—</span>
                        )}
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4 align-top w-[180px]">
                      <CellLabel>Category</CellLabel>
                      <div className="pl-2 text-sm text-slate-500">
                        {selectedItem?.category || (
                          <span className="text-slate-300">—</span>
                        )}
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-6 py-4 align-top w-[420px]">
                      <CellLabel>Description</CellLabel>
                      <textarea
                        value={row.description}
                        rows={3}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                        onBlur={() => autoSave(formItems)}
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                        placeholder="Add description"
                      />
                    </td>

                    {/* QTY */}
                    <td className="px-6 py-4 align-top w-[110px]">
                      <CellLabel>Qty</CellLabel>
                      <input
                        type="number"
                        min="1"
                        value={row.qty === 0 ? "" : row.qty}
                        onChange={(e) =>
                          updateItem(index, "qty", e.target.value)
                        }
                        onBlur={() => autoSave(formItems)}
                        className="w-24 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 align-top w-[150px]">
                      <CellLabel>Price</CellLabel>
                      <input
                        type="number"
                        min="0"
                        value={row.price === 0 ? "" : row.price}
                        onChange={(e) =>
                          updateItem(index, "price", e.target.value)
                        }
                        onBlur={() => autoSave(formItems)}
                        className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </td>

                    {/* DISCOUNT */}
                    <td className="px-6 py-4 align-top w-[140px]">
                      <CellLabel>Discount</CellLabel>
                      <div className="relative w-28">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={row.discount === 0 ? "" : row.discount}
                          onChange={(e) =>
                            updateItem(index, "discount", e.target.value)
                          }
                          onBlur={() => autoSave(formItems)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 pr-8 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          %
                        </span>
                      </div>
                    </td>

                    {/* LINE TOTAL */}
                    <td className="px-6 py-4 align-top w-[180px]">
                      <CellLabel>Line Total</CellLabel>
                      <div className="inline-flex min-w-28 items-center justify-end rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                        {formatINR(
                          Number(row.qty || 1) *
                            Number(row.price || 0) *
                            (1 - Number(row.discount || 0) / 100),
                        )}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 align-top w-[80px]">
                      <button
                        onClick={() => removeItem(index)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-500 transition hover:bg-rose-100 hover:text-rose-700"
                        aria-label="Remove row"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>

                  {/* SUB-ITEM ROWS */}
                  {formItems[index]?.subItems?.length > 0 &&
                    formItems[index].subItems.map((sub) => {
                      const selected = formItems[index].selectedSubItems.find(
                        (s) => s.id === (sub.id || sub.itemId),
                      );

                      const checked = !!selected;
                      const qty = selected?.qty || 1;
                      const price = selected?.price ?? sub.basePrice ?? 0;
                      const discount = selected?.discount || 0;
                      const lineTotal = qty * price * (1 - discount / 100);

                      return (
                        <tr
                          key={sub.id}
                          className={`border-b border-slate-100 transition ${
                            checked
                              ? "bg-indigo-50/35 hover:bg-indigo-50/55"
                              : "bg-slate-50/70 hover:bg-slate-100/60"
                          }`}
                        >
                          {/* ITEM + CHECKBOX */}
                          <td className="px-6 py-3 align-top w-[340px]">
                            <div className="flex items-center gap-3 pl-6">
                              <div
                                className={`h-4 w-1 rounded-full ${
                                  checked ? "bg-indigo-300" : "bg-slate-200"
                                }`}
                              />
                              <input
                                type="checkbox"
                                checked={formItems[index].selectedSubItems.some(
                                  (s) => s.id === (sub.id || sub.itemId),
                                )}
                                onChange={() => toggleSubItem(index, sub)}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <div className="flex min-w-0 flex-col">
                                <span
                                  className={`text-xs font-medium leading-5 whitespace-normal break-words ${
                                    checked
                                      ? "text-slate-800"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {sub.name}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {sub.uom || "Sub item"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* SKU */}
                          <td className="px-6 py-3 align-top w-[170px]">
                            <span className="pl-2 border-l border-slate-100 text-xs text-slate-400">
                              {sub.sku || "—"}
                            </span>
                          </td>

                          {/* CATEGORY */}
                          <td className="px-6 py-3 align-top w-[180px]">
                            <span className="pl-2 text-xs text-slate-400">
                              {sub.category || "—"}
                            </span>
                          </td>

                          {/* DESCRIPTION */}
                          <td className="px-6 py-3 align-top w-[420px]">
                            <textarea
                              rows={2}
                              value={
                                selected?.description ?? sub.description ?? ""
                              }
                              disabled={!checked}
                              onChange={(e) =>
                                updateSubItem(
                                  index,
                                  sub.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                              onBlur={() => autoSave(formItems)}
                              className={`w-full resize-none rounded-xl border px-3 py-2 text-xs leading-5 transition ${
                                checked
                                  ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
                                  : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
                              }`}
                              placeholder="Description"
                            />
                          </td>

                          {/* QTY */}
                          <td className="px-6 py-3 align-top w-[110px]">
                            <input
                              type="number"
                              min="1"
                              value={
                                checked
                                  ? qty === 0
                                    ? ""
                                    : qty
                                  : sub.baseQty || 1
                              }
                              disabled={!checked}
                              onChange={(e) =>
                                updateSubItem(
                                  index,
                                  sub.id,
                                  "qty",
                                  e.target.value,
                                )
                              }
                              onBlur={() => autoSave(formItems)}
                              className={`w-20 rounded-xl border px-2.5 py-1.5 text-right text-xs transition ${
                                checked
                                  ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
                                  : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
                              }`}
                            />
                          </td>

                          {/* PRICE */}
                          <td className="px-6 py-3 align-top w-[150px]">
                            <input
                              type="number"
                              min="0"
                              value={
                                checked
                                  ? price === 0
                                    ? ""
                                    : price
                                  : sub.basePrice || 0
                              }
                              disabled={!checked}
                              onChange={(e) =>
                                updateSubItem(
                                  index,
                                  sub.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                              onBlur={() => autoSave(formItems)}
                              className={`w-24 rounded-xl border px-2.5 py-1.5 text-right text-xs transition ${
                                checked
                                  ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
                                  : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
                              }`}
                            />
                          </td>

                          {/* DISCOUNT */}
                          <td className="px-6 py-3 align-top w-[140px]">
                            <div className="relative w-24">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={
                                  checked ? (discount === 0 ? "" : discount) : 0
                                }
                                disabled={!checked}
                                onChange={(e) =>
                                  updateSubItem(
                                    index,
                                    sub.id,
                                    "discount",
                                    e.target.value,
                                  )
                                }
                                onBlur={() => autoSave(formItems)}
                                className={`w-full rounded-xl border px-2.5 py-1.5 pr-6 text-right text-xs transition ${
                                  checked
                                    ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
                                    : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
                                }`}
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                                %
                              </span>
                            </div>
                          </td>

                          {/* TOTAL */}
                          <td className="px-6 py-3 align-top w-[180px] text-right">
                            <div
                              className={`inline-flex min-w-24 justify-end rounded-xl px-2.5 py-1.5 text-xs font-semibold ${
                                checked
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-transparent text-slate-300"
                              }`}
                            >
                              {checked ? formatINR(lineTotal) : formatINR(0)}
                            </div>
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-3 align-top w-[80px] text-center">
                            {checked && (
                              <button
                                onClick={() => toggleSubItem(index, sub)}
                                className="text-[11px] font-medium text-rose-500 transition hover:text-rose-700"
                              >
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                  {/* GROUP TOTAL ROW */}
                  {formItems[index]?.selectedSubItems?.length > 0 && (
                    <tr className="border-b border-slate-200 bg-indigo-50/40">
                      <td colSpan={6} />
                      <td className="px-6 py-2.5 text-right text-xs font-semibold text-slate-600">
                        Total
                      </td>
                      <td className="px-6 py-2.5 text-right">
                        <div className="inline-flex min-w-28 justify-end rounded-xl bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                          {formatINR(
                            (() => {
                              const parentTotal =
                                Number(row.qty || 1) *
                                Number(row.price || 0) *
                                (1 - Number(row.discount || 0) / 100);

                              const subTotal = formItems[
                                index
                              ].selectedSubItems.reduce((sum, sub) => {
                                const qty = Number(sub.qty || 1);
                                const price = Number(sub.price || 0);
                                const discount = Number(sub.discount || 0);

                                return sum + qty * price * (1 - discount / 100);
                              }, 0);

                              return parentTotal + subTotal;
                            })(),
                          )}
                        </div>
                      </td>
                      <td />
                    </tr>
                  )}
                </FragmentWrapper>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"></div>
      </div>
    </div>
  );
}

function FragmentWrapper({ children, ...props }) {
  return <>{children}</>;
}
