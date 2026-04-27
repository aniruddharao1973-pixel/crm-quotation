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
} from "lucide-react";
import { formatINR } from "../quotations/quotationUtils";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.items);

  function findItemRecursive(items, id) {
    for (const item of items) {
      if (item.id === id) return item;

      if (item.children?.length) {
        const found = findItemRecursive(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const item = findItemRecursive(list, id);

  if (!item) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Item not found
          </h3>
          <p className="text-slate-500 mb-6">
            The item you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <ChevronLeft className="w-4 h-4" />
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/30 min-h-[calc(100vh-64px)]">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Items
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <Package className="w-4 h-4" />
              Item Details
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{item.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/items/${id}/edit`)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
            >
              <Pencil className="w-4 h-4" />
              Edit Item
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 shadow-sm hover:shadow-md transition-all">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        {/* LEFT */}
        <div className="space-y-6">
          {/* ITEM OVERVIEW CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <Package className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {item.name}
                </h2>

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <Tag className="w-4 h-4" />
                  <span className="font-mono font-semibold">{item.sku}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.category && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      {item.category}
                    </div>
                  )}

                  {item.make && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                      <Wrench className="w-3.5 h-3.5" />
                      {item.make}
                    </div>
                  )}

                  {item.mfgPartNo && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium">
                      <Hash className="w-3.5 h-3.5" />
                      {item.mfgPartNo}
                    </div>
                  )}

                  {item.uom && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
                      <Ruler className="w-3.5 h-3.5" />
                      {item.uom}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS CARD */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-lg">
                Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <DetailItem
                icon={<Package className="w-4 h-4" />}
                label="Item Name"
                value={item.name}
              />
              <DetailItem
                icon={<Tag className="w-4 h-4" />}
                label="SKU"
                value={item.sku}
              />
              <DetailItem
                icon={<Tag className="w-4 h-4" />}
                label="Category"
                value={item.category}
              />
              <DetailItem
                icon={<Wrench className="w-4 h-4" />}
                label="Make"
                value={item.make}
              />
              <DetailItem
                icon={<Hash className="w-4 h-4" />}
                label="Mfg Part No"
                value={item.mfgPartNo}
              />
              <DetailItem
                icon={<Ruler className="w-4 h-4" />}
                label="UOM"
                value={item.uom}
              />
              <DetailItem
                icon={<DollarSign className="w-4 h-4" />}
                label="Base Price"
                value={formatINR(item.basePrice || 0)}
                highlight
              />
            </div>

            {/* DIVIDER */}
            <div className="my-6 border-t border-slate-200"></div>

            {/* DESCRIPTION */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-slate-500" />
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Description
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {item.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* DEFAULT REMARKS */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-slate-500" />
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Default Remarks
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {item.defaultRemarks || "No remarks"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="xl:sticky xl:top-6 space-y-6">
          {/* PRICE CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-white/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Pricing Information</h3>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-5">
              <div className="text-xs uppercase tracking-wider text-indigo-100 mb-2">
                Base Price
              </div>
              <div className="text-3xl font-bold">
                {formatINR(item.basePrice || 0)}
              </div>
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="text-xs text-indigo-100">
                  Excluding taxes and discounts
                </div>
              </div>
            </div>
          </div>

          {/* META CARD */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-slate-500" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Timeline
              </div>
            </div>

            <div className="space-y-4">
              <TimelineItem
                label="Created"
                value={
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "-"
                }
              />
              <div className="border-t border-slate-100"></div>
              <TimelineItem
                label="Last Updated"
                value={
                  item.updatedAt
                    ? new Date(item.updatedAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "-"
                }
              />
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-sm p-6">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-slate-300">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <StatItem label="Status" value="Active" />
              <StatItem label="Category" value={item.category || "-"} />
              <StatItem label="Stock" value="Available" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function DetailItem({ icon, label, value, highlight = false }) {
  return (
    <div className="group">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${
          highlight ? "text-indigo-600 text-lg" : "text-slate-900"
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-900">
        {value || "-"}
      </div>
    </div>
  );
}

function TimelineItem({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900 text-right">
        {value}
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-300">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
