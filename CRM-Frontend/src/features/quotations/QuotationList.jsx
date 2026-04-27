// // src/features/quotations/QuotationList.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Plus,
//   FileText,
//   Search,
//   BadgeCheck,
//   Clock3,
//   Trash2,
// } from "lucide-react";
// import { fetchQuotations, deleteQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";

// export default function QuotationList() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { list, loading } = useSelector((state) => state.quotation);

//   const [search, setSearch] = useState("");

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotations());
//   }, [dispatch]);

//   const handleDelete = async (id, e) => {
//     e.stopPropagation(); // 🔥 VERY IMPORTANT (prevents row click navigation)

//     const confirmDelete = window.confirm("Delete this quotation?");
//     if (!confirmDelete) return;

//     try {
//       await dispatch(deleteQuotation(id)).unwrap();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete");
//     }
//   };

//   /* ================= FILTER ================= */
//   const quotations = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return list || [];

//     return (list || []).filter((x) => {
//       return (
//         x.quotationNo?.toLowerCase().includes(q) ||
//         x.account?.accountName?.toLowerCase().includes(q) ||
//         x.status?.toLowerCase().includes(q)
//       );
//     });
//   }, [search, list]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const total = quotations.length;
//     const draft = quotations.filter((q) => q.status === "DRAFT").length;
//     const sent = quotations.filter((q) => q.status === "SENT").length;

//     const value = quotations.reduce(
//       (sum, q) => sum + Number(q.grandTotal || 0),
//       0,
//     );

//     return { total, draft, sent, value };
//   }, [quotations]);

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-[calc(100vh-64px)]">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Quotation Hub</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage quotations with centralized GST calculation and totals
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search quotation, account..."
//               className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={() => navigate("/quotations/new")}
//             className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
//           >
//             <Plus size={16} />
//             New Quotation
//           </button>
//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard label="Total" value={stats.total} icon={<FileText />} />
//         <StatCard label="Draft" value={stats.draft} icon={<Clock3 />} />
//         <StatCard label="Sent" value={stats.sent} icon={<BadgeCheck />} />
//         <StatCard
//           label="Pipeline Value"
//           value={formatINR(stats.value)}
//           icon={<FileText />}
//         />
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="px-5 py-4 border-b border-slate-100">
//           <h2 className="font-semibold text-slate-900">Recent Quotations</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="p-4 text-left font-semibold">Quotation</th>
//                 <th className="p-4 text-left font-semibold">Account</th>
//                 <th className="p-4 text-left font-semibold">Issue Date</th>
//                 <th className="p-4 text-right font-semibold">Taxable</th>
//                 <th className="p-4 text-right font-semibold">Total</th>
//                 <th className="p-4 text-left font-semibold">Status</th>
//                 <th className="p-4 text-center font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={7} className="p-10 text-center text-slate-500">
//                     Loading quotations...
//                   </td>
//                 </tr>
//               )}

//               {/* DATA */}
//               {!loading &&
//                 quotations.map((q) => (
//                   <tr
//                     key={q.id}
//                     onClick={() => navigate(`/quotations/${q.id}`)}
//                     className="border-t border-slate-100 hover:bg-indigo-50/40 cursor-pointer transition"
//                   >
//                     <td className="p-4">
//                       <div className="font-semibold text-indigo-700">
//                         {q.quotationNo}
//                       </div>
//                     </td>

//                     <td className="p-4 text-slate-700">
//                       {q.account?.accountName || "-"}
//                     </td>

//                     <td className="p-4 text-slate-600">
//                       {q.issueDate
//                         ? new Date(q.issueDate).toLocaleDateString()
//                         : "-"}
//                     </td>

//                     <td className="p-4 text-right text-slate-700">
//                       {formatINR(
//                         Math.max(
//                           Number(q.subtotal || 0) -
//                             Number(q.discountTotal || 0),
//                           0,
//                         ),
//                       )}
//                     </td>

//                     <td className="p-4 text-right font-semibold text-slate-900">
//                       {formatINR(q.grandTotal || 0)}
//                     </td>

//                     <td className="p-4">
//                       <StatusBadge status={q.status} />
//                     </td>

//                     <td className="p-4 text-center">
//                       <button
//                         onClick={(e) => handleDelete(q.id, e)}
//                         className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-rose-600 hover:bg-rose-50"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//               {/* EMPTY */}
//               {!loading && quotations.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-12 text-center text-slate-500">
//                     No quotations found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-xs text-slate-500">{label}</div>
//           <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
//         </div>

//         <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     DRAFT: "bg-slate-100 text-slate-700",
//     SENT: "bg-blue-50 text-blue-700",
//     APPROVED: "bg-emerald-50 text-emerald-700",
//     REJECTED: "bg-rose-50 text-rose-700",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//         map[status] || map.DRAFT
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// src/features/quotations/QuotationList.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  FileText,
  Search,
  BadgeCheck,
  Clock3,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  Building2,
  Filter,
  Download,
  RefreshCw,
  X,
  MoreVertical,
  Edit,
  Copy,
  Send,
  Layers,
} from "lucide-react";
import { fetchQuotations, deleteQuotation } from "./quotationSlice";
import { formatINR } from "./quotationUtils";

export default function QuotationList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.quotation);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchQuotations());
  }, [dispatch]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteQuotation(id)).unwrap();
    } catch (err) {
      console.error(err);
      alert("Failed to delete quotation");
    }
  };

  const handleRefresh = () => {
    dispatch(fetchQuotations());
  };

  /* ================= FILTER ================= */
  const quotations = useMemo(() => {
    const q = search.trim().toLowerCase();
    let filtered = [...(list || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    // Search filter
    if (q) {
      filtered = filtered.filter((x) => {
        return (
          x.quotationNo?.toLowerCase().includes(q) ||
          x.account?.accountName?.toLowerCase().includes(q) ||
          x.status?.toLowerCase().includes(q)
        );
      });
    }

    // Status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (x) => x.status?.toUpperCase() === statusFilter,
      );
    }

    return filtered;
  }, [search, list, statusFilter]);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const all = list || [];
    const total = all.length;
    const draft = all.filter((q) => q.status?.toUpperCase() === "DRAFT").length;
    const sent = all.filter((q) => q.status?.toUpperCase() === "SENT").length;
    const approved = all.filter(
      (q) => q.status?.toUpperCase() === "ACCEPTED",
    ).length;

    const value = all.reduce((sum, q) => sum + Number(q.grandTotal || 0), 0);

    const avgValue = total > 0 ? value / total : 0;

    return { total, draft, sent, approved, value, avgValue };
  }, [list]);

  /* ================= UI ================= */
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/20 min-h-[calc(100vh-64px)]">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <FileText className="w-4 h-4" />
            Sales Management
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Quotation Hub
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Manage quotations with centralized GST calculation, track pipeline
            value, and monitor status across all deals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotations..."
              className="w-full sm:w-[280px] rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 shadow-sm transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-all"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => navigate("/quotations/new")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-sm font-bold text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Quotation
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Quotations"
          value={stats.total}
          icon={<Layers className="w-5 h-5" />}
          color="indigo"
          subtext={`${quotations.length} shown`}
        />
        <StatCard
          label="Draft"
          value={stats.draft}
          icon={<Clock3 className="w-5 h-5" />}
          color="slate"
          subtext="Pending completion"
        />
        <StatCard
          label="Sent"
          value={stats.sent}
          icon={<Send className="w-5 h-5" />}
          color="blue"
          subtext="Awaiting response"
        />
        <StatCard
          label="Approved"
          value={stats.approved}
          icon={<BadgeCheck className="w-5 h-5" />}
          color="emerald"
          subtext="Conversion ready"
        />
        <StatCard
          label="Total Pipeline"
          value={formatINR(stats.value)}
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
          subtext={`Avg: ${formatINR(stats.avgValue)}`}
        />
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Filter className="w-4 h-4" />
          Filter by status:
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "DRAFT", "SENT", "ACCEPTED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* TABLE HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">
              Quotation Records
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {quotations.length}{" "}
              {quotations.length === 1 ? "quotation" : "quotations"}
              {search && " matching your search"}
              {statusFilter !== "ALL" && ` with status: ${statusFilter}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
                  Quotation Details
                </th>
                <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
                  Account
                </th>
                <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
                  Taxable Value
                </th>
                <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
                  Grand Total
                </th>
                <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-center font-bold text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* LOADING */}
              {loading && (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                      <p className="text-slate-500 font-medium">
                        Loading quotations...
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                quotations.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => navigate(`/quotations/${q.id}`)}
                    className="hover:bg-indigo-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 transition">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-indigo-700 mb-1">
                            {q.quotationNo}
                          </div>
                          <div className="text-xs text-slate-500">
                            {q.items?.length || 0}{" "}
                            {q.items?.length === 1 ? "item" : "items"}
                          </div>

                          {q.items?.length > 0 && (
                            <div className="text-[11px] text-indigo-500 mt-0.5">
                              {[
                                ...new Set(
                                  q.items
                                    .map((i) => i.category)
                                    .filter(Boolean),
                                ),
                              ]
                                .slice(0, 2)
                                .join(", ")}
                              {q.items.length > 2 ? " +" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      {q.account?.accountName ? (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-900">
                            {q.account.accountName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>

                    <td className="p-4">
                      {q.issueDate ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-700">
                            {new Date(q.issueDate).toLocaleDateString("en-IN", {
                              dateStyle: "medium",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="font-semibold text-slate-700">
                        {formatINR(
                          (q.items || []).reduce((sum, item) => {
                            // ✅ if sub-items exist → use them
                            if (item.subItems?.length > 0) {
                              return (
                                sum +
                                item.subItems.reduce(
                                  (s, sub) =>
                                    s +
                                    Number(sub.quantity || 1) *
                                      Number(sub.price || 0) *
                                      (1 - Number(sub.discount || 0) / 100),
                                  0,
                                )
                              );
                            }

                            // ✅ fallback to parent
                            return (
                              sum +
                              Number(item.quantity || 1) *
                                Number(item.price || 0) *
                                (1 - Number(item.discount || 0) / 100)
                            );
                          }, 0),
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="font-bold text-slate-900 text-base">
                        {formatINR(
                          (() => {
                            const subtotal = (q.items || []).reduce(
                              (sum, item) => {
                                if (item.subItems?.length > 0) {
                                  return (
                                    sum +
                                    item.subItems.reduce(
                                      (s, sub) =>
                                        s +
                                        Number(sub.quantity || 1) *
                                          Number(sub.price || 0) *
                                          (1 - Number(sub.discount || 0) / 100),
                                      0,
                                    )
                                  );
                                }

                                return (
                                  sum +
                                  Number(item.quantity || 1) *
                                    Number(item.price || 0) *
                                    (1 - Number(item.discount || 0) / 100)
                                );
                              },
                              0,
                            );

                            const gst = subtotal * 0.18;

                            return subtotal + gst;
                          })(),
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <StatusBadge status={q.status?.toUpperCase()} />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/quotations/${q.id}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 font-medium text-xs transition"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/quotations/${q.id}/edit`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 font-medium text-xs transition"
                          title="Edit quotation"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>

                        <button
                          onClick={(e) => handleDelete(q.id, e)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium text-xs transition"
                          title="Delete quotation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {/* EMPTY */}
              {!loading && quotations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="p-4 rounded-2xl bg-slate-100">
                        <FileText className="w-12 h-12 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">
                          {search || statusFilter !== "ALL"
                            ? "No quotations found"
                            : "No quotations yet"}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4">
                          {search || statusFilter !== "ALL"
                            ? "Try adjusting your search or filters"
                            : "Get started by creating your first quotation"}
                        </p>
                        {!search && statusFilter === "ALL" && (
                          <button
                            onClick={() => navigate("/quotations/new")}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition"
                          >
                            <Plus className="w-4 h-4" />
                            Create First Quotation
                          </button>
                        )}
                        {(search || statusFilter !== "ALL") && (
                          <button
                            onClick={() => {
                              setSearch("");
                              setStatusFilter("ALL");
                            }}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
                          >
                            <X className="w-4 h-4" />
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        {!loading && quotations.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {quotations.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {list?.length || 0}
                </span>{" "}
                quotations
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">Per page:</span>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ label, value, icon, color = "indigo", subtext }) {
  const colorClasses = {
    indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/30",
    slate: "from-slate-500 to-slate-600 shadow-slate-500/30",
    blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
    emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
    amber: "from-amber-500 to-amber-600 shadow-amber-500/30",
  };

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div
          className={`w-full h-full bg-gradient-to-br ${colorClasses[color]} blur-2xl`}
        ></div>
      </div>

      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg ${colorClasses[color].split(" ")[1]}`}
          >
            {icon}
          </div>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {label}
        </div>
        <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
        {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    DRAFT: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      icon: <Clock3 className="w-3 h-3" />,
    },
    SENT: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: <Send className="w-3 h-3" />,
    },
    APPROVED: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: <BadgeCheck className="w-3 h-3" />,
    },
    REJECTED: {
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: <X className="w-3 h-3" />,
    },
  };

  const config = statusConfig[status] || statusConfig.DRAFT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text} ${config.border}`}
    >
      {config.icon}
      {status}
    </span>
  );
}
