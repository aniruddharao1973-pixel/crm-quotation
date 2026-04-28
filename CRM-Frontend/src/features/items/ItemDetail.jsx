// // src/features/items/ItemDetail.jsx

// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ChevronLeft, Pencil, Trash2, Package } from "lucide-react";
// import { formatINR } from "../quotations/quotationUtils";

// export default function ItemDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { list } = useSelector((state) => state.items);

//   const item = list.find((i) => i.id === id);

//   if (!item) {
//     return (
//       <div className="p-6">
//         <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
//           Item not found.
//         </div>
//       </div>
//     );
//   }

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
//           <button
//             onClick={() => navigate(`/items/${id}/edit`)}
//             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//           >
//             <Pencil className="w-4 h-4" />
//             Edit
//           </button>

//           <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50">
//             <Trash2 className="w-4 h-4" />
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">
//         {/* LEFT */}
//         <div className="space-y-5">
//           {/* ITEM HEADER CARD */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
//                   <Package className="w-4 h-4" />
//                   Item Detail
//                 </div>

//                 <h1 className="mt-2 text-2xl font-bold text-slate-900">
//                   {item.name}
//                 </h1>

//                 <p className="text-sm text-slate-500 mt-1">SKU: {item.sku}</p>

//                 <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-3">
//                   {item.make && <span>Make: {item.make}</span>}
//                   {item.mfgPartNo && <span>PN: {item.mfgPartNo}</span>}
//                   {item.uom && <span>UOM: {item.uom}</span>}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DETAILS CARD */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
//             <h2 className="font-semibold text-slate-900 mb-4">
//               Item Information
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//               <Detail label="Item Name" value={item.name} />
//               <Detail label="SKU" value={item.sku} />

//               {/* 🔥 NEW FIELDS */}
//               <Detail label="Make" value={item.make} />
//               <Detail label="Mfg Part No" value={item.mfgPartNo} />
//               <Detail label="UOM" value={item.uom} />

//               <Detail label="Price" value={formatINR(item.basePrice || 0)} />

//               <Detail
//                 label="Created At"
//                 value={
//                   item.createdAt
//                     ? new Date(item.createdAt).toLocaleDateString()
//                     : "-"
//                 }
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="mt-5">
//               <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Description
//               </div>
//               <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
//                 {item.description || "No description provided."}
//               </p>
//             </div>
//             {/* 🔥 DEFAULT REMARKS */}
//             <div className="mt-5">
//               <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Default Remarks
//               </div>
//               <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
//                 {item.defaultRemarks || "No remarks"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="xl:sticky xl:top-6 space-y-5">
//           {/* PRICE CARD */}
//           <div className="rounded-2xl bg-indigo-600 text-white shadow-sm p-5">
//             <h3 className="font-semibold">Pricing</h3>

//             <div className="mt-4 rounded-xl bg-white/10 p-4">
//               <div className="text-xs uppercase tracking-wider text-indigo-100">
//                 Base Price
//               </div>
//               <div className="mt-2 text-2xl font-bold">
//                 {formatINR(item.basePrice || 0)}
//               </div>
//             </div>
//           </div>

//           {/* META CARD */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
//             <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//               Metadata
//             </div>

//             <div className="mt-3 space-y-2 text-sm">
//               <Detail
//                 label="Created"
//                 value={
//                   item.createdAt
//                     ? new Date(item.createdAt).toLocaleString()
//                     : "-"
//                 }
//               />
//               <Detail
//                 label="Updated"
//                 value={
//                   item.updatedAt
//                     ? new Date(item.updatedAt).toLocaleString()
//                     : "-"
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= HELPERS ================= */

// function Detail({ label, value }) {
//   return (
//     <div>
//       <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//         {label}
//       </div>
//       <div className="mt-1 text-sm font-semibold text-slate-900">
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

// // src/features/items/ItemDetail.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   ChevronLeft,
//   Pencil,
//   Trash2,
//   Package,
//   Tag,
//   DollarSign,
//   Calendar,
//   FileText,
//   Wrench,
//   Hash,
//   Ruler,
// } from "lucide-react";
// import { formatINR } from "../quotations/quotationUtils";

// export default function ItemDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { list } = useSelector((state) => state.items);

//   function findItemRecursive(items, id) {
//     for (const item of items) {
//       if (item.id === id) return item;

//       if (item.children?.length) {
//         const found = findItemRecursive(item.children, id);
//         if (found) return found;
//       }
//     }
//     return null;
//   }

//   const item = findItemRecursive(list, id);

//   if (!item) {
//     return (
//       <div className="p-6">
//         <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
//           <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
//           <h3 className="text-lg font-semibold text-slate-900 mb-2">
//             Item not found
//           </h3>
//           <p className="text-slate-500 mb-6">
//             The item you're looking for doesn't exist.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Go back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/30 min-h-[calc(100vh-64px)]">
//       {/* HEADER */}
//       <div className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Back to Items
//         </button>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
//               <Package className="w-4 h-4" />
//               Item Details
//             </div>
//             <h1 className="text-3xl font-bold text-slate-900">{item.name}</h1>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => navigate(`/items/${id}/edit`)}
//               className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
//             >
//               <Pencil className="w-4 h-4" />
//               Edit Item
//             </button>

//             <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 shadow-sm hover:shadow-md transition-all">
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
//         {/* LEFT */}
//         <div className="space-y-6">
//           {/* ITEM OVERVIEW CARD */}
//           <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
//                 <Package className="w-6 h-6" />
//               </div>

//               <div className="flex-1">
//                 <h2 className="text-xl font-bold text-slate-900 mb-1">
//                   {item.name}
//                 </h2>

//                 <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
//                   <Tag className="w-4 h-4" />
//                   <span className="font-mono font-semibold">{item.sku}</span>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {item.category && (
//                     <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
//                       <Tag className="w-3.5 h-3.5" />
//                       {item.category}
//                     </div>
//                   )}

//                   {item.make && (
//                     <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
//                       <Wrench className="w-3.5 h-3.5" />
//                       {item.make}
//                     </div>
//                   )}

//                   {item.mfgPartNo && (
//                     <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium">
//                       <Hash className="w-3.5 h-3.5" />
//                       {item.mfgPartNo}
//                     </div>
//                   )}

//                   {item.uom && (
//                     <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
//                       <Ruler className="w-3.5 h-3.5" />
//                       {item.uom}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SPECIFICATIONS CARD */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
//             <div className="flex items-center gap-2 mb-5">
//               <FileText className="w-5 h-5 text-indigo-600" />
//               <h2 className="font-bold text-slate-900 text-lg">
//                 Specifications
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
//               <DetailItem
//                 icon={<Package className="w-4 h-4" />}
//                 label="Item Name"
//                 value={item.name}
//               />
//               <DetailItem
//                 icon={<Tag className="w-4 h-4" />}
//                 label="SKU"
//                 value={item.sku}
//               />
//               <DetailItem
//                 icon={<Tag className="w-4 h-4" />}
//                 label="Category"
//                 value={item.category}
//               />
//               <DetailItem
//                 icon={<Wrench className="w-4 h-4" />}
//                 label="Make"
//                 value={item.make}
//               />
//               <DetailItem
//                 icon={<Hash className="w-4 h-4" />}
//                 label="Mfg Part No"
//                 value={item.mfgPartNo}
//               />
//               <DetailItem
//                 icon={<Ruler className="w-4 h-4" />}
//                 label="UOM"
//                 value={item.uom}
//               />
//               <DetailItem
//                 icon={<DollarSign className="w-4 h-4" />}
//                 label="Base Price"
//                 value={formatINR(item.basePrice || 0)}
//                 highlight
//               />
//             </div>

//             {/* DIVIDER */}
//             <div className="my-6 border-t border-slate-200"></div>

//             {/* DESCRIPTION */}
//             <div>
//               <div className="flex items-center gap-2 mb-3">
//                 <FileText className="w-4 h-4 text-slate-500" />
//                 <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
//                   Description
//                 </div>
//               </div>
//               <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                 <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
//                   {item.description || "No description provided."}
//                 </p>
//               </div>
//             </div>

//             {/* DEFAULT REMARKS */}
//             <div className="mt-5">
//               <div className="flex items-center gap-2 mb-3">
//                 <FileText className="w-4 h-4 text-slate-500" />
//                 <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
//                   Default Remarks
//                 </div>
//               </div>
//               <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
//                 <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
//                   {item.defaultRemarks || "No remarks"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="xl:sticky xl:top-6 space-y-6">
//           {/* PRICE CARD */}
//           <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg hover:shadow-xl transition-shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="p-2 rounded-lg bg-white/20">
//                 <DollarSign className="w-5 h-5" />
//               </div>
//               <h3 className="font-bold text-lg">Pricing Information</h3>
//             </div>

//             <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
//               <div className="text-xs uppercase tracking-wider text-indigo-100 mb-2">
//                 Base Price
//               </div>
//               <div className="text-3xl font-bold">
//                 {formatINR(item.basePrice || 0)}
//               </div>
//               <div className="mt-3 pt-3 border-t border-white/20">
//                 <div className="text-xs text-indigo-100">
//                   Excluding taxes and discounts
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* META CARD */}
//           <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Calendar className="w-5 h-5 text-slate-500" />
//               <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
//                 Timeline
//               </div>
//             </div>

//             <div className="space-y-4">
//               <TimelineItem
//                 label="Created"
//                 value={
//                   item.createdAt
//                     ? new Date(item.createdAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })
//                     : "-"
//                 }
//               />
//               <div className="border-t border-slate-100"></div>
//               <TimelineItem
//                 label="Last Updated"
//                 value={
//                   item.updatedAt
//                     ? new Date(item.updatedAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })
//                     : "-"
//                 }
//               />
//             </div>
//           </div>

//           {/* QUICK STATS */}
//           <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-sm p-6">
//             <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-slate-300">
//               Quick Stats
//             </h3>
//             <div className="space-y-3">
//               <StatItem label="Status" value="Active" />
//               <StatItem label="Category" value={item.category || "-"} />
//               <StatItem label="Stock" value="Available" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= HELPER COMPONENTS ================= */

// function DetailItem({ icon, label, value, highlight = false }) {
//   return (
//     <div className="group">
//       <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//         <span className="text-slate-400">{icon}</span>
//         {label}
//       </div>
//       <div
//         className={`text-sm font-semibold ${
//           highlight ? "text-indigo-600 text-lg" : "text-slate-900"
//         }`}
//       >
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//         {label}
//       </div>
//       <div className="mt-1 text-sm font-semibold text-slate-900">
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

// function TimelineItem({ label, value }) {
//   return (
//     <div className="flex items-start justify-between gap-3">
//       <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//         {label}
//       </div>
//       <div className="text-sm font-semibold text-slate-900 text-right">
//         {value}
//       </div>
//     </div>
//   );
// }

// function StatItem({ label, value }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span className="text-xs text-slate-300">{label}</span>
//       <span className="text-sm font-semibold text-white">{value}</span>
//     </div>
//   );
// }

// src/features/items/ItemDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  Pencil,
  Trash2,
  Package,
  Tag,
  DollarSign,
  Calendar,
  FileText,
  Wrench,
  Hash,
  Ruler,
  BadgeCheck,
  Clock3,
  Layers,
  Sparkles,
  Building2,
} from "lucide-react";
import { formatINR } from "../quotations/quotationUtils";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.items);

  function findItemRecursive(items, targetId) {
    for (const item of items) {
      if (item.id === targetId) return item;

      if (item.children?.length) {
        const found = findItemRecursive(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  }

  const item = findItemRecursive(list, id);
  const childCount = item?.children?.length || 0;

  if (!item) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_22%),linear-gradient(to_bottom,_#f8fafc,_#f8fafc,_#eef2ff_120%)] px-3 py-4 sm:px-5 sm:py-5">
        <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-[1700px] items-center justify-center">
          <div className="w-full max-w-xl rounded-[28px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-slate-900">
              Item not found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              The item you are looking for does not exist or has been removed.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.26)] transition hover:bg-indigo-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.10),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_22%),linear-gradient(to_bottom,_#f8fafc,_#f8fafc,_#eef2ff_120%)] px-3 py-4 sm:px-5 sm:py-5">
      <div className="mx-auto w-full max-w-[1700px] space-y-5">
        {/* HERO */}
        <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="relative px-5 py-5 sm:px-6 lg:px-7">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.06),transparent_35%,rgba(16,185,129,0.05)_72%,transparent)]" />

            <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Items
                </button>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Item Details
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-700 ring-1 ring-inset ring-indigo-100">
                    <Package className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      {item.name}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 shadow-sm">
                        <Tag className="h-3.5 w-3.5 text-slate-400" />
                        {item.sku || "-"}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Active
                      </span>

                      {childCount > 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <Layers className="h-3.5 w-3.5" />
                          {childCount} child item{childCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate(`/items/${id}/edit`)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] transition hover:from-indigo-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-[0_16px_34px_rgba(79,70,229,0.34)]"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Item
                </button>

                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-5 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* OVERVIEW */}
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(255,255,255,0.95))] px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-700 ring-1 ring-inset ring-indigo-100">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                      Item Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Master data summary for quotations, pricing, and catalog
                      usage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <InfoTile label="Item Name" value={item.name} />
                        <InfoTile label="SKU" value={item.sku} mono />
                        <InfoTile label="Category" value={item.category} />
                        <InfoTile label="Make" value={item.make} />
                        <InfoTile
                          label="Mfg Part No"
                          value={item.mfgPartNo}
                          mono
                        />
                        <InfoTile label="UOM" value={item.uom} />
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-xl bg-indigo-50 p-2 text-indigo-700">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                            Description
                          </h3>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4 text-sm leading-7 text-slate-700">
                        {item.description || "No description provided."}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-amber-100 bg-amber-50/70 p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                            Default Remarks
                          </h3>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap rounded-2xl border border-amber-100 bg-white px-4 py-4 text-sm leading-7 text-slate-700 shadow-sm">
                        {item.defaultRemarks || "No remarks"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-slate-500" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                          Pricing
                        </h3>
                      </div>

                      <div className="rounded-[24px] bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-5 text-white shadow-[0_14px_30px_rgba(79,70,229,0.24)]">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-100">
                          Base Price
                        </div>
                        <div className="mt-2 text-4xl font-black tracking-tight">
                          {formatINR(item.basePrice || 0)}
                        </div>
                        <p className="mt-2 text-sm text-indigo-100/90">
                          Excluding taxes and discounts.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-slate-500" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                          Timeline
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <TimelineRow
                          icon={<Clock3 className="h-4 w-4" />}
                          label="Created"
                          value={
                            item.createdAt
                              ? new Date(item.createdAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  },
                                )
                              : "-"
                          }
                        />
                        <div className="h-px bg-slate-100" />
                        <TimelineRow
                          icon={<Clock3 className="h-4 w-4" />}
                          label="Last Updated"
                          value={
                            item.updatedAt
                              ? new Date(item.updatedAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  },
                                )
                              : "-"
                          }
                        />
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_14px_30px_rgba(15,23,42,0.22)]">
                      <div className="mb-4 flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-emerald-400" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
                          Quick Stats
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <StatRow label="Status" value="Active" />
                        <StatRow
                          label="Category"
                          value={item.category || "-"}
                        />
                        <StatRow label="Children" value={String(childCount)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
              <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(79,70,229,0.10),rgba(255,255,255,0.95))] px-5 py-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Snapshot
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Quick glance at pricing and structure.
                </p>
              </div>

              <div className="space-y-3 p-5">
                <SummaryCard
                  label="Base Price"
                  value={formatINR(item.basePrice || 0)}
                />
                <SummaryCard label="SKU" value={item.sku || "-"} mono />
                <SummaryCard label="Category" value={item.category || "-"} />
                <SummaryCard label="Make" value={item.make || "-"} />
                <SummaryCard
                  label="Mfg Part No"
                  value={item.mfgPartNo || "-"}
                  mono
                />
                <SummaryCard label="UOM" value={item.uom || "-"} />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function InfoTile({ label, value, mono = false }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white px-4 py-4 shadow-sm">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div
        className={`mt-2 text-sm font-semibold text-slate-900 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, mono = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 shadow-sm">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div
        className={`mt-1.5 text-sm font-semibold text-slate-900 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function TimelineRow({ icon, label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <div className="max-w-[55%] text-right text-sm font-semibold leading-6 text-slate-900">
        {value}
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
