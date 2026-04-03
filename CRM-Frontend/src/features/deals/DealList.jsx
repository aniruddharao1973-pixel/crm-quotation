// // src/features/deals/DealList.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDeals, deleteDeal } from "./dealSlice";
// import { useDebounce } from "../../hooks/useDebounce";
// import {
//   STAGE_COLORS,
//   DEAL_STAGES,
//   formatDate,
//   formatLabel,
// } from "../../constants";

// import toast from "react-hot-toast";
// import {
//   PlusIcon,
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   DocumentTextIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   XMarkIcon,
//   ExclamationTriangleIcon,
// } from "@heroicons/react/24/outline";
// import { BriefcaseIcon } from "@heroicons/react/24/solid";

// const DealList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { deals, pagination, loading } = useSelector((s) => s.deals);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [stageFilter, setStageFilter] = useState("");

//   const [deleteModal, setDeleteModal] = useState({
//     open: false,
//     id: null,
//     name: "",
//   });

//   const [deleting, setDeleting] = useState(false);

//   const debouncedSearch = useDebounce(search);

//   useEffect(() => {
//     dispatch(
//       fetchDeals({
//         page,
//         limit: 10,
//         search: debouncedSearch,
//         stage: stageFilter || undefined,
//       })
//     );
//   }, [dispatch, page, debouncedSearch, stageFilter]);

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await dispatch(deleteDeal(deleteModal.id)).unwrap();
//       toast.success("Deal deleted successfully");
//       setDeleteModal({ open: false, id: null, name: "" });
//     } catch (err) {
//       toast.error(err || "Failed to delete deal");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setStageFilter("");
//     setPage(1);
//   };

//   const hasFilters = search || stageFilter;

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage your sales pipeline and track deal progress
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/deals/new")}
//           className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
//         >
//           <PlusIcon className="w-5 h-5 mr-2" />
//           New Deal
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-blue-50 rounded-lg">
//               <BriefcaseIcon className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {pagination?.total || 0}
//               </p>
//               <p className="text-sm text-gray-500">Total Deals</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-emerald-50 rounded-lg">
//               <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "CLOSED_WON").length}
//               </p>
//               <p className="text-sm text-gray-500">Won Deals</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-amber-50 rounded-lg">
//               <FunnelIcon className="w-6 h-6 text-amber-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "NEGOTIATION").length}
//               </p>
//               <p className="text-sm text-gray-500">In Negotiation</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-purple-50 rounded-lg">
//               <DocumentTextIcon className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "COMMERCIAL_PROPOSAL").length}
//               </p>
//               <p className="text-sm text-gray-500">Proposals Sent</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl border border-gray-200 p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* Search Input */}
//           <div className="relative flex-1">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search by deal name, account, or log ID..."
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>

//           {/* Stage Filter */}
//           <div className="relative">
//             <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//             <select
//               value={stageFilter}
//               onChange={(e) => {
//                 setStageFilter(e.target.value);
//                 setPage(1);
//               }}
//               className="w-full sm:w-56 pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
//             >
//               <option value="">All Stages</option>
//               {DEAL_STAGES.map((s) => (
//                 <option key={s} value={s}>
//                   {formatLabel(s)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Clear Filters */}
//           {hasFilters && (
//             <button
//               onClick={clearFilters}
//               className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               <XMarkIcon className="w-4 h-4 mr-1.5" />
//               Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="flex flex-col items-center gap-3">
//               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//               <p className="text-sm text-gray-500">Loading deals...</p>
//             </div>
//           </div>
//         ) : deals.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <BriefcaseIcon className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">
//               No deals found
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {hasFilters
//                 ? "Try adjusting your search or filters"
//                 : "Get started by creating your first deal"}
//             </p>
//             {!hasFilters && (
//               <button
//                 onClick={() => navigate("/deals/new")}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <PlusIcon className="w-4 h-4 mr-1.5" />
//                 Create Deal
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Deal Log ID
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Logged On
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Deal Name
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Account Name
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Product Group
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Stage
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Person In Charge
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Weightage
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Closing Date
//                     </th>
//                     <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {deals.map((deal, index) => {
//                     const stageColor = STAGE_COLORS[deal.stage] || {
//                       bg: "bg-gray-50",
//                       text: "text-gray-700",
//                       dot: "bg-gray-500",
//                     };

//                     return (
//                       <tr
//                         key={deal.id}
//                         className="hover:bg-gray-50/50 transition-colors duration-150"
//                       >
//                         {/* Deal Log ID */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm font-medium text-gray-900">
//                             {deal.dealLogId}
//                           </span>
//                         </td>

//                         {/* Logged On */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-500">
//                             {formatDate(deal.createdAt)}
//                           </span>
//                         </td>

//                         {/* Deal Name */}
//                         <td className="px-6 py-4">
//                           <Link
//                             to={`/deals/${deal.id}`}
//                             className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//                           >
//                             {deal.dealName}
//                           </Link>
//                         </td>

//                         {/* Account Name */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {deal.account?.accountName || (
//                               <span className="text-gray-400">—</span>
//                             )}
//                           </span>
//                         </td>

//                         {/* Product Group */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {deal.productGroup || (
//                               <span className="text-gray-400">—</span>
//                             )}
//                           </span>
//                         </td>

//                         {/* Stage Badge */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${stageColor.bg} ${stageColor.text}`}
//                           >
//                             <span
//                               className={`w-1.5 h-1.5 rounded-full ${stageColor.dot}`}
//                             />
//                             {formatLabel(deal.stage)}
//                           </span>
//                         </td>

//                         {/* Person In Charge */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {deal.personInCharge || (
//                               <span className="text-gray-400">—</span>
//                             )}
//                           </span>
//                         </td>

//                         {/* Weightage */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {deal.weightage ? (
//                             <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//                               {formatLabel(deal.weightage)}
//                             </span>
//                           ) : (
//                             <span className="text-sm text-gray-400">—</span>
//                           )}
//                         </td>

//                         {/* Closing Date */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-500">
//                             {formatDate(deal.closingDate)}
//                           </span>
//                         </td>

//                         {/* Actions */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               onClick={() => navigate(`/deals/${deal.id}`)}
//                               className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                               title="View Deal"
//                             >
//                               <EyeIcon className="w-4.5 h-4.5" />
//                             </button>
//                             <button
//                               onClick={() => navigate(`/deals/${deal.id}/edit`)}
//                               className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
//                               title="Edit Deal"
//                             >
//                               <PencilSquareIcon className="w-4.5 h-4.5" />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 setDeleteModal({
//                                   open: true,
//                                   id: deal.id,
//                                   name: deal.dealName,
//                                 })
//                               }
//                               className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Delete Deal"
//                             >
//                               <TrashIcon className="w-4.5 h-4.5" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {pagination?.pages > 1 && (
//               <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
//                 <p className="text-sm text-gray-600">
//                   Showing{" "}
//                   <span className="font-medium">
//                     {(page - 1) * 10 + 1}
//                   </span>{" "}
//                   to{" "}
//                   <span className="font-medium">
//                     {Math.min(page * 10, pagination.total)}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-medium">{pagination.total}</span> deals
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeftIcon className="w-4 h-4 mr-1" />
//                     Previous
//                   </button>
//                   <div className="hidden sm:flex items-center gap-1">
//                     {Array.from({ length: pagination.pages }, (_, i) => i + 1)
//                       .filter((p) => {
//                         if (pagination.pages <= 7) return true;
//                         if (p === 1 || p === pagination.pages) return true;
//                         if (Math.abs(p - page) <= 1) return true;
//                         return false;
//                       })
//                       .map((p, idx, arr) => {
//                         const showEllipsis =
//                           idx > 0 && p - arr[idx - 1] > 1;
//                         return (
//                           <div key={p} className="flex items-center">
//                             {showEllipsis && (
//                               <span className="px-2 text-gray-400">...</span>
//                             )}
//                             <button
//                               onClick={() => setPage(p)}
//                               className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
//                                 page === p
//                                   ? "bg-blue-600 text-white"
//                                   : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             >
//                               {p}
//                             </button>
//                           </div>
//                         );
//                       })}
//                   </div>
//                   <button
//                     onClick={() =>
//                       setPage((p) => Math.min(pagination.pages, p + 1))
//                     }
//                     disabled={page === pagination.pages}
//                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRightIcon className="w-4 h-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {deleteModal.open && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             {/* Backdrop */}
//             <div
//               className="fixed inset-0 bg-black/50 transition-opacity"
//               onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
//             />

//             {/* Modal */}
//             <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
//               <div className="flex items-center gap-4">
//                 <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                   <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Delete Deal
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Are you sure you want to delete "{deleteModal.name}"? This
//                     action cannot be undone.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center justify-end gap-3">
//                 <button
//                   onClick={() =>
//                     setDeleteModal({ open: false, id: null, name: "" })
//                   }
//                   disabled={deleting}
//                   className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete Deal"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DealList;

// // src/features/deals/DealList.jsx
// import { useEffect, useState, useMemo, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDeals, deleteDeal, importDeals } from "./dealSlice";
// import { STAGE_COLORS, formatDate, formatLabel } from "../../constants";

// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import {
//   PlusIcon,
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
//   FunnelIcon,
//   DocumentTextIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   XMarkIcon,
//   ExclamationTriangleIcon,
//   ChevronUpIcon,
//   ChevronDownIcon,
//   ArrowsUpDownIcon,
//   BarsArrowDownIcon,
//   BarsArrowUpIcon,
//   CheckIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
// } from "@heroicons/react/24/outline";
// import { BriefcaseIcon } from "@heroicons/react/24/solid";

// // Sort columns configuration
// const SORT_COLUMNS = [
//   { key: "dealLogId", label: "Deal Log ID" },
//   { key: "createdAt", label: "Logged On" },
//   { key: "dealName", label: "Deal Name" },
//   { key: "accountName", label: "Account Name" },
//   { key: "productGroup", label: "Product Group" },
//   { key: "stage", label: "Stage" },
//   { key: "personInCharge", label: "Person In Charge" },
//   { key: "weightage", label: "Weightage" },
//   { key: "closingDate", label: "Closing Date" },
// ];

// // Helper to parse deal log ID for sorting (e.g., FY2526.1010)
// const parseDealLogId = (logId) => {
//   if (!logId) return { year: 0, number: 0 };
//   const match = logId.match(/FY(\d+)\.(\d+)/);
//   if (match) {
//     return { year: parseInt(match[1]), number: parseInt(match[2]) };
//   }
//   return { year: 0, number: 0 };
// };

// // Sort Dropdown Component
// const SortDropdown = ({ isOpen, onClose, sortConfig, onSortChange }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 z-40" onClick={onClose} />

//       {/* Dropdown */}
//       <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-80 max-w-[95vw] bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden">
//         {/* Header */}
//         <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
//           <div className="flex items-center justify-between">
//             <h3 className="text-sm font-semibold text-gray-900">
//               Sort Options
//             </h3>
//             <button
//               onClick={() =>
//                 onSortChange({ column: "dealLogId", order: "desc" })
//               }
//               className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Reset Default
//             </button>
//           </div>
//         </div>

//         {/* Column Selection */}
//         <div className="p-3">
//           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//             Sort By Column
//           </label>
//           <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
//             {SORT_COLUMNS.map((col) => (
//               <button
//                 key={col.key}
//                 onClick={() => onSortChange({ ...sortConfig, column: col.key })}
//                 className={`
//                   w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all
//                   ${
//                     sortConfig.column === col.key
//                       ? "bg-blue-50 text-blue-700 font-medium"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }
//                 `}
//               >
//                 <span>{col.label}</span>
//                 {sortConfig.column === col.key && (
//                   <CheckIcon className="w-4 h-4 text-blue-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Order Selection */}
//         <div className="px-3 pb-3">
//           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//             Sort Order
//           </label>
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               onClick={() => onSortChange({ ...sortConfig, order: "asc" })}
//               className={`
//                 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all
//                 ${
//                   sortConfig.order === "asc"
//                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                     : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                 }
//               `}
//             >
//               <BarsArrowUpIcon className="w-4 h-4" />
//               Ascending
//             </button>
//             <button
//               onClick={() => onSortChange({ ...sortConfig, order: "desc" })}
//               className={`
//                 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all
//                 ${
//                   sortConfig.order === "desc"
//                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                     : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                 }
//               `}
//             >
//               <BarsArrowDownIcon className="w-4 h-4" />
//               Descending
//             </button>
//           </div>
//         </div>

//         {/* Apply Button */}
//         <div className="px-3 py-3 border-t border-gray-100 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
//           >
//             Apply Sorting
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// // Sortable Column Header Component
// const SortableHeader = ({
//   label,
//   columnKey,
//   sortConfig,
//   onSort,
//   className = "",
// }) => {
//   const isActive = sortConfig.column === columnKey;

//   return (
//     <th
//       className={`px-6 py-4 text-left sticky top-0 bg-gray-50 border-b border-gray-200 z-10 ${className}`}
//     >
//       <button
//         onClick={() => onSort(columnKey)}
//         className={`
//           inline-flex items-center gap-1.5 transition-colors
//           ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}
//         `}
//       >
//         <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
//         <span className="flex flex-col -space-y-1">
//           <ChevronUpIcon
//             className={`w-3 h-3 ${
//               isActive && sortConfig.order === "asc"
//                 ? "text-blue-600"
//                 : "text-gray-300"
//             }`}
//           />
//           <ChevronDownIcon
//             className={`w-3 h-3 ${
//               isActive && sortConfig.order === "desc"
//                 ? "text-blue-600"
//                 : "text-gray-300"
//             }`}
//           />
//         </span>
//       </button>
//     </th>
//   );
// };

// const DealList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { deals, pagination, loading } = useSelector((s) => s.deals);
//   const { user: currentUser } = useSelector((s) => s.auth);

//   const fileInputRef = useRef(null);
//   const [importing, setImporting] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const [showExportDropdown, setShowExportDropdown] = useState(false);

//   // Sort state - default to dealLogId descending (newest first)
//   const [sortConfig, setSortConfig] = useState({
//     column: "dealLogId",
//     order: "desc",
//   });
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [deleteModal, setDeleteModal] = useState({
//     open: false,
//     id: null,
//     name: "",
//   });
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     dispatch(
//       fetchDeals({
//         page,
//         limit,
//         sortBy: sortConfig.column,
//         sortOrder: sortConfig.order,
//       }),
//     );
//   }, [dispatch, page, limit, sortConfig]);

//   const handleImport = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImporting(true);
//     try {
//       const res = await dispatch(importDeals(file)).unwrap();
//       if (res.data?.errors?.length > 0) {
//         toast.error(`Import finished with ${res.data.errors.length} errors`);
//       }
//       toast.success(
//         `Import complete! Created: ${res.data?.created}, Updated: ${res.data?.updated}, Skipped: ${res.data?.skipped}`,
//       );
//     } catch (err) {
//       toast.error(err || "Failed to import deals");
//     } finally {
//       setImporting(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   // Client-side sorting (fallback if API doesn't support sorting)
//   const sortedDeals = useMemo(() => {
//     if (!deals || deals.length === 0) return [];

//     return [...deals].sort((a, b) => {
//       const { column, order } = sortConfig;
//       let comparison = 0;

//       switch (column) {
//         case "dealLogId":
//           const aLog = parseDealLogId(a.dealLogId);
//           const bLog = parseDealLogId(b.dealLogId);
//           comparison =
//             aLog.year !== bLog.year
//               ? aLog.year - bLog.year
//               : aLog.number - bLog.number;
//           break;

//         case "dealName":
//           comparison = (a.dealName || "").localeCompare(b.dealName || "");
//           break;

//         case "accountName":
//           comparison = (a.account?.accountName || "").localeCompare(
//             b.account?.accountName || "",
//           );
//           break;

//         case "productGroup":
//           comparison = (a.productGroup || "").localeCompare(
//             b.productGroup || "",
//           );
//           break;

//         case "stage":
//           comparison = (a.stage || "").localeCompare(b.stage || "");
//           break;

//         case "personInCharge":
//           comparison = (a.personInCharge || "").localeCompare(
//             b.personInCharge || "",
//           );
//           break;

//         case "weightage":
//           comparison = (a.weightage || "").localeCompare(b.weightage || "");
//           break;

//         case "createdAt":
//         case "closingDate":
//           const dateA = a[column] ? new Date(a[column]).getTime() : 0;
//           const dateB = b[column] ? new Date(b[column]).getTime() : 0;
//           comparison = dateA - dateB;
//           break;

//         default:
//           comparison = 0;
//       }

//       return order === "asc" ? comparison : -comparison;
//     });
//   }, [deals, sortConfig]);

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await dispatch(deleteDeal(deleteModal.id)).unwrap();
//       toast.success("Deal deleted successfully");
//       setDeleteModal({ open: false, id: null, name: "" });
//     } catch (err) {
//       toast.error(err || "Failed to delete deal");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleColumnSort = (columnKey) => {
//     setSortConfig((prev) => ({
//       column: columnKey,
//       order:
//         prev.column === columnKey && prev.order === "desc" ? "asc" : "desc",
//     }));
//     setPage(1);
//   };

//   const handleSortChange = (newConfig) => {
//     setSortConfig(newConfig);
//     setPage(1);
//   };

//   const resetSort = () => {
//     setSortConfig({ column: "dealLogId", order: "desc" });
//     setPage(1);
//   };

//   const prepareExportData = () => {
//     return sortedDeals.map((deal) => ({
//       "Deal Log ID": deal.dealLogId,
//       "Logged On": formatDate(deal.createdAt),
//       "Deal Name": deal.dealName,
//       "Account Name": deal.account?.accountName || "",
//       "Product Group": deal.productGroup || "",
//       Stage: formatLabel(deal.stage),
//       "Person In Charge": deal.personInCharge || "",
//       Weightage: deal.weightage || "",
//       "Closing Date": formatDate(deal.closingDate),
//     }));
//   };

//   const exportCSV = () => {
//     const data = prepareExportData();

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const csv = XLSX.utils.sheet_to_csv(worksheet);

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, `deals_export_${Date.now()}.csv`);

//     setShowExportDropdown(false);
//   };

//   const exportExcel = () => {
//     const data = prepareExportData();

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//     });

//     saveAs(blob, `deals_export_${Date.now()}.xlsx`);

//     setShowExportDropdown(false);
//   };

//   const isDefaultSort =
//     sortConfig.column === "dealLogId" && sortConfig.order === "desc";

//   const getCurrentSortLabel = () => {
//     const col = SORT_COLUMNS.find((c) => c.key === sortConfig.column);
//     const orderLabel = sortConfig.order === "asc" ? "↑" : "↓";
//     return col ? `${col.label} ${orderLabel}` : "";
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage your sales pipeline and track deal progress
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {/* IMPORT BUTTON */}
//           {(currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER") && (
//             <>
//               <input
//                 type="file"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleImport}
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={importing}
//                 className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
//               >
//                 {importing ? (
//                   <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <ArrowUpTrayIcon className="w-5 h-5" />
//                 )}
//                 {importing ? "Importing..." : "Import"}
//               </button>
//             </>
//           )}

//           <button
//             onClick={() => navigate("/deals/new")}
//             className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm"
//           >
//             <PlusIcon className="w-5 h-5 mr-2" />
//             New Deal
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-blue-50 rounded-lg">
//               <BriefcaseIcon className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {pagination?.total || sortedDeals.length}
//               </p>
//               <p className="text-sm text-gray-500">Total Deals</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-emerald-50 rounded-lg">
//               <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "CLOSED_WON").length}
//               </p>
//               <p className="text-sm text-gray-500">Won Deals</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-amber-50 rounded-lg">
//               <FunnelIcon className="w-6 h-6 text-amber-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "NEGOTIATION").length}
//               </p>
//               <p className="text-sm text-gray-500">In Negotiation</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-gray-200 p-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-purple-50 rounded-lg">
//               <DocumentTextIcon className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {deals.filter((d) => d.stage === "COMMERCIAL_PROPOSAL").length}
//               </p>
//               <p className="text-sm text-gray-500">Proposals Sent</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sort Controls */}
//       <div className="bg-white rounded-xl border border-gray-200 p-4">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           {/* Sort Info */}
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-500">
//               {pagination?.total || sortedDeals.length} deals
//             </span>
//             <span className="text-gray-300">•</span>
//             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
//               <ArrowsUpDownIcon className="w-3.5 h-3.5" />
//               {getCurrentSortLabel()}
//             </span>
//           </div>

//           {/* Sort Actions */}
//           <div className="flex items-center gap-2">
//             {/* EXPORT BUTTON */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowExportDropdown(!showExportDropdown)}
//                 className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
//               >
//                 <ArrowDownTrayIcon className="w-5 h-5" />
//                 Export
//               </button>

//               {showExportDropdown && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-40"
//                     onClick={() => setShowExportDropdown(false)}
//                   />

//                   <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
//                     <button
//                       onClick={exportExcel}
//                       className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Export as Excel
//                     </button>

//                     <button
//                       onClick={exportCSV}
//                       className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Export as CSV
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* Sort Dropdown Button */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowSortDropdown(!showSortDropdown)}
//                 className={`
//                   inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all
//                   ${
//                     showSortDropdown || !isDefaultSort
//                       ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                       : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
//                   }
//                 `}
//               >
//                 <ArrowsUpDownIcon className="w-5 h-5" />
//                 Sort
//                 {sortConfig.order === "desc" ? (
//                   <BarsArrowDownIcon className="w-4 h-4" />
//                 ) : (
//                   <BarsArrowUpIcon className="w-4 h-4" />
//                 )}
//               </button>

//               <SortDropdown
//                 isOpen={showSortDropdown}
//                 onClose={() => setShowSortDropdown(false)}
//                 sortConfig={sortConfig}
//                 onSortChange={handleSortChange}
//               />
//             </div>

//             {/* Reset Button */}
//             {!isDefaultSort && (
//               <button
//                 onClick={resetSort}
//                 className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <XMarkIcon className="w-4 h-4" />
//                 Reset
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="flex flex-col items-center gap-3">
//               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//               <p className="text-sm text-gray-500">Loading deals...</p>
//             </div>
//           </div>
//         ) : sortedDeals.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <BriefcaseIcon className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">
//               No deals found
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Get started by creating your first deal
//             </p>
//             <button
//               onClick={() => navigate("/deals/new")}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <PlusIcon className="w-4 h-4 mr-1.5" />
//               Create Deal
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto overflow-y-auto max-h-[600px] relative">
//               <table className="w-full border-separate border-spacing-0">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <SortableHeader
//                       label="Deal Log ID"
//                       columnKey="dealLogId"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="sticky left-0 z-30 shadow-[1px_0_0_0_rgba(229,231,235,1)] md:table-cell"
//                     />
//                     <SortableHeader
//                       label="Logged On"
//                       columnKey="createdAt"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="hidden lg:table-cell"
//                     />
//                     <SortableHeader
//                       label="Deal Name"
//                       columnKey="dealName"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="sticky left-0 md:left-24 z-20 shadow-[1px_0_0_0_rgba(229,231,235,1)]"
//                     />
//                     <SortableHeader
//                       label="Account Name"
//                       columnKey="accountName"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                     />
//                     <SortableHeader
//                       label="Product Group"
//                       columnKey="productGroup"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="hidden xl:table-cell"
//                     />
//                     <SortableHeader
//                       label="Stage"
//                       columnKey="stage"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                     />
//                     <SortableHeader
//                       label="Person In Charge"
//                       columnKey="personInCharge"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="hidden md:table-cell"
//                     />
//                     <SortableHeader
//                       label="Weightage"
//                       columnKey="weightage"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="hidden lg:table-cell"
//                     />
//                     <SortableHeader
//                       label="Closing Date"
//                       columnKey="closingDate"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="hidden sm:table-cell"
//                     />
//                     <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {sortedDeals.map((deal) => {
//                     const stageColor = STAGE_COLORS[deal.stage] || {
//                       bg: "bg-gray-50",
//                       text: "text-gray-700",
//                       dot: "bg-gray-500",
//                     };

//                     return (
//                       <tr
//                         key={deal.id}
//                         className="hover:bg-gray-50/50 transition-colors duration-150 group"
//                       >
//                         {/* Deal Log ID */}
//                         <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white group-hover:bg-gray-50 z-10 shadow-[1px_0_0_0_rgba(229,231,235,1)] md:table-cell">
//                           <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-sm font-mono font-medium text-gray-700">
//                             {deal.dealLogId}
//                           </span>
//                         </td>

//                         {/* Logged On */}
//                         <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
//                           <span className="text-sm text-gray-500">
//                             {formatDate(deal.createdAt)}
//                           </span>
//                         </td>

//                         {/* Deal Name */}
//                         <td className="px-6 py-4 sticky left-0 md:left-24 bg-white group-hover:bg-gray-50 z-10 shadow-[1px_0_0_0_rgba(229,231,235,1)]">
//                           <Link
//                             to={`/deals/${deal.id}`}
//                             className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors block max-w-[200px] truncate"
//                           >
//                             {deal.dealName}
//                           </Link>
//                         </td>

//                         {/* Account Name */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {deal.account?.accountName ? (
//                             <Link
//                               to={`/accounts/${deal.account.id}`}
//                               className="text-sm text-gray-900 hover:text-blue-600 transition-colors block max-w-[180px] truncate"
//                             >
//                               {deal.account.accountName}
//                             </Link>
//                           ) : (
//                             <span className="text-sm text-gray-400">—</span>
//                           )}
//                         </td>

//                         {/* Product Group */}
//                         <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell text-sm text-gray-600 uppercase">
//                           {formatLabel(deal.productGroup) || "—"}
//                         </td>

//                         {/* Stage */}
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${stageColor.bg} ${stageColor.text} ${stageColor.border || ""}`}
//                           >
//                             <span
//                               className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stageColor.dot}`}
//                             />
//                             {formatLabel(deal.stage)}
//                           </span>
//                         </td>

//                         {/* Person In Charge */}
//                         <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
//                           <span className="text-sm text-gray-600 font-medium">
//                             {deal.personInCharge || "—"}
//                           </span>
//                         </td>

//                         {/* Weightage */}
//                         <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
//                           <span className="text-sm text-gray-500 italic">
//                             {formatLabel(deal.weightage) || "—"}
//                           </span>
//                         </td>

//                         {/* Closing Date */}
//                         <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
//                           <span className="text-sm text-gray-600">
//                             {formatDate(deal.closingDate)}
//                           </span>
//                         </td>

//                         {/* Actions */}
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white group-hover:bg-gray-50 z-10 shadow-[-1px_0_0_0_rgba(229,231,235,1)]">
//                           <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
//                             <button
//                               onClick={() => navigate(`/deals/${deal.id}`)}
//                               className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                               title="View Deal"
//                             >
//                               <EyeIcon className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => navigate(`/deals/${deal.id}/edit`)}
//                               className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
//                               title="Edit Deal"
//                             >
//                               <PencilSquareIcon className="w-4 h-4" />
//                             </button>
//                             {currentUser?.role !== "SALES_REP" && (
//                               <button
//                                 onClick={() =>
//                                   setDeleteModal({
//                                     open: true,
//                                     id: deal.id,
//                                     name: deal.dealName,
//                                   })
//                                 }
//                                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                                 title="Delete Deal"
//                               >
//                                 <TrashIcon className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50 gap-4">
//               <div className="flex items-center gap-4">
//                 <p className="text-sm text-gray-600">
//                   Showing{" "}
//                   <span className="font-medium">{(page - 1) * limit + 1}</span>{" "}
//                   to{" "}
//                   <span className="font-medium">
//                     {Math.min(page * limit, pagination?.total || 0)}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-medium">
//                     {pagination?.total || 0}
//                   </span>{" "}
//                   deals
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-gray-500 font-medium">Rows:</span>
//                   <select
//                     value={limit}
//                     onChange={(e) => {
//                       setLimit(Number(e.target.value));
//                       setPage(1);
//                     }}
//                     className="text-xs font-medium bg-white border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
//                   >
//                     {[10, 20, 50].map((v) => (
//                       <option key={v} value={v}>
//                         {v}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {pagination?.pages > 1 && (
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeftIcon className="w-4 h-4 mr-1" />
//                     Previous
//                   </button>
//                   <div className="hidden sm:flex items-center gap-1">
//                     {Array.from({ length: pagination.pages }, (_, i) => i + 1)
//                       .filter((p) => {
//                         if (pagination.pages <= 7) return true;
//                         if (p === 1 || p === pagination.pages) return true;
//                         if (Math.abs(p - page) <= 1) return true;
//                         return false;
//                       })
//                       .map((p, idx, arr) => {
//                         const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
//                         return (
//                           <div key={p} className="flex items-center">
//                             {showEllipsis && (
//                               <span className="px-2 text-gray-400">...</span>
//                             )}
//                             <button
//                               onClick={() => setPage(p)}
//                               className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
//                                 page === p
//                                   ? "bg-blue-600 text-white"
//                                   : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                             >
//                               {p}
//                             </button>
//                           </div>
//                         );
//                       })}
//                   </div>
//                   <button
//                     onClick={() =>
//                       setPage((p) => Math.min(pagination.pages, p + 1))
//                     }
//                     disabled={page === pagination.pages}
//                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRightIcon className="w-4 h-4 ml-1" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {deleteModal.open && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             {/* Backdrop */}
//             <div
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//               onClick={() =>
//                 setDeleteModal({ open: false, id: null, name: "" })
//               }
//             />

//             {/* Modal */}
//             <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
//               <div className="text-center">
//                 <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Delete Deal
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-6">
//                   Are you sure you want to delete{" "}
//                   <span className="font-medium text-gray-700">
//                     "{deleteModal.name}"
//                   </span>
//                   ? This action cannot be undone.
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() =>
//                     setDeleteModal({ open: false, id: null, name: "" })
//                   }
//                   disabled={deleting}
//                   className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete Deal"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DealList;

// src/features/deals/DealList.jsx
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals, deleteDeal, bulkDeleteDeals, importDeals } from "./dealSlice";
import { STAGE_COLORS, formatDate, formatLabel } from "../../constants";

import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import {
  BriefcaseIcon as BriefcaseSolid,
  CheckCircleIcon as CheckCircleSolid,
} from "@heroicons/react/24/solid";

// Sort columns configuration
const SORT_COLUMNS = [
  { key: "dealLogId", label: "Deal Log ID" },
  { key: "createdAt", label: "Logged On" },
  { key: "dealName", label: "Deal Name" },
  { key: "accountName", label: "Account Name" },
  { key: "productGroup", label: "Product Group" },
  { key: "stage", label: "Stage" },
  { key: "personInCharge", label: "Person In Charge" },
  { key: "weightage", label: "Weightage" },
  { key: "closingDate", label: "Closing Date" },
];

const parseDealLogId = (logId) => {
  if (!logId) return { year: 0, number: 0 };
  const match = logId.match(/FY(\d+)\.(\d+)/);
  if (match) {
    return { year: parseInt(match[1]), number: parseInt(match[2]) };
  }
  return { year: 0, number: 0 };
};

// Sort Dropdown Component
const SortDropdown = ({ isOpen, onClose, sortConfig, onSortChange }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-80 max-w-[95vw] bg-white rounded-2xl border border-[#3B2E7E]/10 shadow-2xl shadow-[#3B2E7E]/10 z-50 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3B2E7E]/10 bg-gradient-to-r from-[#3B2E7E]/5 to-transparent">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Sort Options
            </h3>
            <button
              onClick={() => onSortChange({ column: "dealLogId", order: "desc" })}
              className="text-xs text-[#3B2E7E] hover:text-[#2A1F5C] font-semibold transition-colors"
            >
              Reset Default
            </button>
          </div>
        </div>
        <div className="p-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Sort By Column
          </label>
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {SORT_COLUMNS.map((col) => (
              <button
                key={col.key}
                onClick={() => onSortChange({ ...sortConfig, column: col.key })}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${
                  sortConfig.column === col.key
                    ? "bg-[#3B2E7E]/10 text-[#3B2E7E] font-semibold shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{col.label}</span>
                {sortConfig.column === col.key && (
                  <CheckCircleSolid className="w-5 h-5 text-[#3B2E7E]" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Sort Order
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSortChange({ ...sortConfig, order: "asc" })}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                sortConfig.order === "asc"
                  ? "bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white shadow-lg shadow-[#3B2E7E]/30"
                  : "bg-white text-slate-700 border-2 border-slate-200 hover:border-[#3B2E7E]/30 hover:bg-[#3B2E7E]/5"
              }`}
            >
              <BarsArrowUpIcon className="w-5 h-5" />
              Ascending
            </button>
            <button
              onClick={() => onSortChange({ ...sortConfig, order: "desc" })}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                sortConfig.order === "desc"
                  ? "bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white shadow-lg shadow-[#3B2E7E]/30"
                  : "bg-white text-slate-700 border-2 border-slate-200 hover:border-[#3B2E7E]/30 hover:bg-[#3B2E7E]/5"
              }`}
            >
              <BarsArrowDownIcon className="w-5 h-5" />
              Descending
            </button>
          </div>
        </div>
        <div className="px-4 py-4 border-t border-[#3B2E7E]/10 bg-[#3B2E7E]/5">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] rounded-xl hover:shadow-lg hover:shadow-[#3B2E7E]/30 transition-all"
          >
            Apply Sorting
          </button>
        </div>
      </div>
    </>
  );
};

// Sortable Column Header
const SortableHeader = ({ label, columnKey, sortConfig, onSort, className = "" }) => {
  const isActive = sortConfig.column === columnKey;

  return (
    <th className={`px-4 py-3.5 text-left ${className}`}>
      <button
        onClick={() => onSort(columnKey)}
        className={`inline-flex items-center gap-1.5 transition-colors group/sort ${
          isActive ? "text-[#3B2E7E]" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className="flex flex-col -space-y-1">
          <ChevronUpIcon
            className={`w-3 h-3 ${
              isActive && sortConfig.order === "asc"
                ? "text-[#3B2E7E]"
                : "text-slate-300 group-hover/sort:text-slate-400"
            }`}
          />
          <ChevronDownIcon
            className={`w-3 h-3 ${
              isActive && sortConfig.order === "desc"
                ? "text-[#3B2E7E]"
                : "text-slate-300 group-hover/sort:text-slate-400"
            }`}
          />
        </span>
      </button>
    </th>
  );
};

// Row Action Menu
const RowActionMenu = ({ deal, currentUser, onDelete, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`p-2 rounded-xl transition-all duration-200 ${
          isOpen
            ? "bg-[#3B2E7E]/10 text-[#3B2E7E]"
            : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        }`}
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 z-50 overflow-hidden py-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(`/deals/${deal.id}`);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[#3B2E7E]/5 hover:text-[#3B2E7E] transition-colors"
            >
              <EyeIcon className="w-4.5 h-4.5 text-slate-400" />
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(`/deals/${deal.id}/edit`);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <PencilSquareIcon className="w-4.5 h-4.5 text-slate-400" />
              Edit Deal
            </button>
            {currentUser?.role !== "SALES_REP" && (
              <>
                <div className="border-t border-slate-100 my-1.5" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(deal);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="w-4.5 h-4.5" />
                  Delete Deal
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const DealList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deals, pagination, loading } = useSelector((s) => s.deals);
  const { user: currentUser } = useSelector((s) => s.auth);

  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [selectedIds, setSelectedIds] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchInputRef = useRef(null);

  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    column: "dealLogId",
    order: "desc",
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleteModal, setBulkDeleteModal] = useState({
    open: false,
    count: 0,
  });

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === deals.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(deals.map((d) => d.id));
    }
  }, [deals, selectedIds]);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const handleBulkDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(bulkDeleteDeals(selectedIds)).unwrap();
      toast.success(`Successfully deleted ${selectedIds.length} deals`);
      setSelectedIds([]);
      setBulkDeleteModal({ open: false, count: 0 });
    } catch (err) {
      toast.error(err || "Failed to delete deals");
    } finally {
      setDeleting(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      fetchDeals({
        page,
        limit,
        sortBy: sortConfig.column,
        sortOrder: sortConfig.order,
        search: debouncedSearch || undefined,
      })
    );
  }, [dispatch, page, limit, sortConfig, debouncedSearch]);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const res = await dispatch(importDeals(file)).unwrap();
      if (res.data?.errors?.length > 0) {
        toast.error(`Import finished with ${res.data.errors.length} errors`);
      }
      toast.success(
        `Import complete! Created: ${res.data?.created}, Updated: ${res.data?.updated}, Skipped: ${res.data?.skipped}`
      );
    } catch (err) {
      toast.error(err || "Failed to import deals");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const sortedDeals = useMemo(() => {
    if (!deals || deals.length === 0) return [];

    return [...deals].sort((a, b) => {
      const { column, order } = sortConfig;
      let comparison = 0;

      switch (column) {
        case "dealLogId": {
          const aLog = parseDealLogId(a.dealLogId);
          const bLog = parseDealLogId(b.dealLogId);
          comparison =
            aLog.year !== bLog.year
              ? aLog.year - bLog.year
              : aLog.number - bLog.number;
          break;
        }
        case "dealName":
          comparison = (a.dealName || "").localeCompare(b.dealName || "");
          break;
        case "accountName":
          comparison = (a.account?.accountName || "").localeCompare(
            b.account?.accountName || ""
          );
          break;
        case "productGroup":
          comparison = (a.productGroup || "").localeCompare(b.productGroup || "");
          break;
        case "stage":
          comparison = (a.stage || "").localeCompare(b.stage || "");
          break;
        case "personInCharge":
          comparison = (a.personInCharge || "").localeCompare(b.personInCharge || "");
          break;
        case "weightage":
          comparison = (a.weightage || "").localeCompare(b.weightage || "");
          break;
        case "createdAt":
        case "closingDate": {
          const dateA = a[column] ? new Date(a[column]).getTime() : 0;
          const dateB = b[column] ? new Date(b[column]).getTime() : 0;
          comparison = dateA - dateB;
          break;
        }
        default:
          comparison = 0;
      }

      return order === "asc" ? comparison : -comparison;
    });
  }, [deals, sortConfig]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteDeal(deleteModal.id)).unwrap();
      toast.success("Deal deleted successfully");
      setDeleteModal({ open: false, id: null, name: "" });
    } catch (err) {
      toast.error(err || "Failed to delete deal");
    } finally {
      setDeleting(false);
    }
  };

  const handleColumnSort = (columnKey) => {
    setSortConfig((prev) => ({
      column: columnKey,
      order: prev.column === columnKey && prev.order === "desc" ? "asc" : "desc",
    }));
    setPage(1);
  };

  const handleSortChange = (newConfig) => {
    setSortConfig(newConfig);
    setPage(1);
  };

  const resetSort = () => {
    setSortConfig({ column: "dealLogId", order: "desc" });
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const prepareExportData = () => {
    return sortedDeals.map((deal) => ({
      "Deal Log ID": deal.dealLogId,
      "Logged On": formatDate(deal.createdAt),
      "Deal Name": deal.dealName,
      "Account Name": deal.account?.accountName || "",
      "Product Group": deal.productGroup || "",
      Stage: formatLabel(deal.stage),
      "Person In Charge": deal.personInCharge || "",
      Weightage: deal.weightage || "",
      "Closing Date": formatDate(deal.closingDate),
    }));
  };

  const exportCSV = () => {
    const data = prepareExportData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `deals_export_${Date.now()}.csv`);
    setShowExportDropdown(false);
  };

  const exportExcel = () => {
    const data = prepareExportData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, `deals_export_${Date.now()}.xlsx`);
    setShowExportDropdown(false);
  };

  const isDefaultSort = sortConfig.column === "dealLogId" && sortConfig.order === "desc";

  const getCurrentSortLabel = () => {
    const col = SORT_COLUMNS.find((c) => c.key === sortConfig.column);
    const orderLabel = sortConfig.order === "asc" ? "↑" : "↓";
    return col ? `${col.label} ${orderLabel}` : "";
  };

  const hasActiveFilters = !isDefaultSort || debouncedSearch;

  // Calculate stats
  const wonDeals = deals.filter((d) => d.stage === "CLOSED_WON").length;
  const negotiationDeals = deals.filter((d) => d.stage === "NEGOTIATION").length;
  const proposalDeals = deals.filter((d) => d.stage === "COMMERCIAL_PROPOSAL").length;

  return (
    <div className="h-full flex flex-col">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 flex-shrink-0">
        <div className="bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BriefcaseSolid className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{pagination?.total || sortedDeals.length}</p>
              <p className="text-xs font-medium text-purple-200">Total Deals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 p-4 hover:shadow-lg hover:shadow-emerald-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircleSolid className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-900">{wonDeals}</p>
              <p className="text-xs font-medium text-emerald-600">Won Deals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 p-4 hover:shadow-lg hover:shadow-amber-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-900">{negotiationDeals}</p>
              <p className="text-xs font-medium text-amber-600">Negotiation</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-200 p-4 hover:shadow-lg hover:shadow-violet-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <DocumentTextIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-violet-900">{proposalDeals}</p>
              <p className="text-xs font-medium text-violet-600">Proposals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#3B2E7E]/10 shadow-sm shadow-[#3B2E7E]/5 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-[#3B2E7E]/10 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deals..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:bg-white focus:border-[#3B2E7E] focus:ring-2 focus:ring-[#3B2E7E]/10 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Active filters */}
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-violet-50 text-violet-700 rounded-lg border border-violet-200">
                  <MagnifyingGlassIcon className="w-3 h-3" />
                  &ldquo;{debouncedSearch}&rdquo;
                  <button onClick={clearSearch} className="hover:text-violet-900">
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}

              {!isDefaultSort && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-[#3B2E7E]/10 text-[#3B2E7E] rounded-lg border border-[#3B2E7E]/20">
                  <ArrowsUpDownIcon className="w-3 h-3" />
                  {getCurrentSortLabel()}
                  <button onClick={resetSort} className="hover:text-[#2A1F5C]">
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={() => { resetSort(); setSearchQuery(""); }}
                  className="text-xs text-slate-500 hover:text-slate-700 font-semibold underline underline-offset-2"
                >
                  Clear all
                </button>
              )}

              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl border transition-all ${
                    showSortDropdown || !isDefaultSort
                      ? "bg-[#3B2E7E]/10 text-[#3B2E7E] border-[#3B2E7E]/30"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#3B2E7E]/30"
                  }`}
                >
                  <ArrowsUpDownIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort</span>
                </button>
                <SortDropdown
                  isOpen={showSortDropdown}
                  onClose={() => setShowSortDropdown(false)}
                  sortConfig={sortConfig}
                  onSortChange={handleSortChange}
                />
              </div>

              {/* Export */}
              <div className="relative">
                <button
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-white text-slate-600 border border-slate-200 rounded-xl hover:border-[#3B2E7E]/30 transition-all"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                {showExportDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowExportDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                      <button
                        onClick={exportExcel}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#3B2E7E]/5 hover:text-[#3B2E7E] transition-colors"
                      >
                        📊 Export Excel
                      </button>
                      <button
                        onClick={exportCSV}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#3B2E7E]/5 hover:text-[#3B2E7E] transition-colors"
                      >
                        📄 Export CSV
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Import */}
              {(currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER") && (
                <>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImport}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={importing}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-white text-slate-600 border border-slate-200 rounded-xl hover:border-[#3B2E7E]/30 transition-all disabled:opacity-50"
                  >
                    {importing ? (
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowUpTrayIcon className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{importing ? "Importing..." : "Import"}</span>
                  </button>
                </>
              )}

              {/* New Deal Button */}
              <button
                onClick={() => navigate("/deals/new")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[#3B2E7E]/25 active:scale-[0.98] transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">New Deal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="px-4 py-3 bg-gradient-to-r from-[#3B2E7E]/10 to-purple-50 border-b border-[#3B2E7E]/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] rounded-lg text-white font-bold text-sm shadow-lg shadow-[#3B2E7E]/30">
                  {selectedIds.length}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3B2E7E]">
                    {selectedIds.length} {selectedIds.length === 1 ? "deal" : "deals"} selected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-white/50 rounded-lg transition-all"
                >
                  Deselect
                </button>
                <button
                  onClick={() => setBulkDeleteModal({ open: true, count: selectedIds.length })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Container - This is the only part that scrolls */}
        <div className="flex-1 overflow-auto min-h-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-[#3B2E7E]/20 rounded-full" />
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#3B2E7E] border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-sm font-medium text-slate-500">Loading deals...</p>
              </div>
            </div>
          ) : sortedDeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B2E7E]/10 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                {debouncedSearch ? (
                  <MagnifyingGlassIcon className="w-8 h-8 text-[#3B2E7E]" />
                ) : (
                  <BriefcaseSolid className="w-8 h-8 text-[#3B2E7E]" />
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {debouncedSearch ? "No deals found" : "No deals yet"}
              </h3>
              <p className="text-sm text-slate-500 mb-4 text-center max-w-xs">
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"`
                  : "Get started by creating your first deal"}
              </p>
              {debouncedSearch ? (
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center px-4 py-2 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  <XMarkIcon className="w-4 h-4 mr-1.5" />
                  Clear Search
                </button>
              ) : (
                <button
                  onClick={() => navigate("/deals/new")}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[#3B2E7E]/25"
                >
                  <PlusIcon className="w-4 h-4 mr-1.5" />
                  Create Deal
                </button>
              )}
            </div>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-[#3B2E7E]/5 to-purple-50/50 border-b border-[#3B2E7E]/10">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={deals.length > 0 && selectedIds.length === deals.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-[#3B2E7E] focus:ring-[#3B2E7E]/20"
                    />
                  </th>
                  <SortableHeader label="Log ID" columnKey="dealLogId" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[110px]" />
                  <SortableHeader label="Deal Name" columnKey="dealName" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[180px]" />
                  <SortableHeader label="Account" columnKey="accountName" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[150px]" />
                  <SortableHeader label="Stage" columnKey="stage" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[140px]" />
                  <SortableHeader label="Owner" columnKey="personInCharge" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[120px] hidden md:table-cell" />
                  <SortableHeader label="Product" columnKey="productGroup" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[110px] hidden lg:table-cell" />
                  <SortableHeader label="Closing" columnKey="closingDate" sortConfig={sortConfig} onSort={handleColumnSort} className="min-w-[100px] hidden xl:table-cell" />
                  <th className="px-3 py-3 text-right w-12">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedDeals.map((deal, index) => {
                  const stageColor = STAGE_COLORS[deal.stage] || {
                    bg: "bg-slate-50",
                    text: "text-slate-700",
                    dot: "bg-slate-500",
                  };

                  return (
                    <tr
                      key={deal.id}
                      onClick={() => navigate(`/deals/${deal.id}`)}
                      className={`cursor-pointer transition-all duration-150 group hover:bg-[#3B2E7E]/5 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(deal.id)}
                          onChange={() => toggleSelect(deal.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#3B2E7E] focus:ring-[#3B2E7E]/20"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded-md bg-gradient-to-r from-[#3B2E7E]/10 to-purple-100 text-xs font-mono font-bold text-[#3B2E7E]">
                          {deal.dealLogId}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-[#3B2E7E] transition-colors line-clamp-1">
                          {deal.dealName}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {deal.account?.accountName ? (
                          <Link
                            to={`/accounts/${deal.account.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-slate-600 hover:text-[#3B2E7E] hover:underline line-clamp-1"
                          >
                            {deal.account.accountName}
                          </Link>
                        ) : (
                          <span className="text-sm text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${stageColor.bg} ${stageColor.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stageColor.dot}`} />
                          {formatLabel(deal.stage)}
                        </span>
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        {deal.personInCharge ? (
                          <div className="flex items-center gap-2">
                            {/* <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#3B2E7E] to-[#5A4A9C] flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-white">
                                {deal.personInCharge.charAt(0).toUpperCase()}
                              </span>
                            </div> */}
                            <span className="text-sm text-slate-600 line-clamp-1">{deal.personInCharge}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 hidden lg:table-cell">
                        {deal.productGroup ? (
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {formatLabel(deal.productGroup)}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 hidden xl:table-cell">
                        {deal.closingDate ? (
                          <span className="text-sm text-slate-500">{formatDate(deal.closingDate)}</span>
                        ) : (
                          <span className="text-sm text-slate-300">—</span>
                        )}
                      </td>

                      <td className="px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <RowActionMenu
                          deal={deal}
                          currentUser={currentUser}
                          onDelete={(d) => setDeleteModal({ open: true, id: d.id, name: d.dealName })}
                          onNavigate={navigate}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        {!loading && sortedDeals.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#3B2E7E]/10 bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-600">
                <span className="font-semibold text-slate-800">{(page - 1) * limit + 1}</span>
                <span className="text-slate-400"> – </span>
                <span className="font-semibold text-slate-800">{Math.min(page * limit, pagination?.total || 0)}</span>
                <span className="text-slate-400"> of </span>
                <span className="font-semibold text-slate-800">{pagination?.total || 0}</span>
              </span>
              <div className="flex items-center gap-1.5 border-l border-slate-300 pl-3">
                <label className="text-xs text-slate-500">Rows:</label>
                <select
                  value={limit}
                  onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#3B2E7E]/20 focus:border-[#3B2E7E] outline-none"
                >
                  {[10, 20, 50].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {pagination?.pages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-[#3B2E7E]/5 hover:text-[#3B2E7E] hover:border-[#3B2E7E]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                    .filter((p) => {
                      if (pagination.pages <= 7) return true;
                      if (p === 1 || p === pagination.pages) return true;
                      if (Math.abs(p - page) <= 1) return true;
                      return false;
                    })
                    .map((p, idx, arr) => {
                      const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                      return (
                        <div key={p} className="flex items-center">
                          {showEllipsis && <span className="px-1 text-slate-300">…</span>}
                          <button
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 text-sm font-semibold rounded-lg transition-all ${
                              page === p
                                ? "bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white shadow-md shadow-[#3B2E7E]/25"
                                : "text-slate-600 hover:bg-[#3B2E7E]/10 hover:text-[#3B2E7E]"
                            }`}
                          >
                            {p}
                          </button>
                        </div>
                      );
                    })}
                </div>

                <span className="sm:hidden text-sm text-slate-600 px-2 font-medium">
                  {page} / {pagination.pages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-[#3B2E7E]/5 hover:text-[#3B2E7E] hover:border-[#3B2E7E]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Deal</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-800">&ldquo;{deleteModal.name}&rdquo;</span>?
                  <br />
                  <span className="text-xs text-red-500 mt-1 inline-block">This cannot be undone.</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {bulkDeleteModal.open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setBulkDeleteModal({ open: false, count: 0 })}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Multiple Deals</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-red-600 text-lg">{bulkDeleteModal.count}</span> deals?
                  <br />
                  <span className="text-xs text-red-500 mt-1 block">This cannot be undone.</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setBulkDeleteModal({ open: false, count: 0 })}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={deleting}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete All"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealList;
// src/features/deals/DealList.jsx
// // src/features/deals/DealList.jsx
// import { useEffect, useState, useMemo, useRef, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDeals, deleteDeal, bulkDeleteDeals, importDeals } from "./dealSlice";
// import { STAGE_COLORS, formatDate, formatLabel } from "../../constants";

// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import {
//   PlusIcon,
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
//   FunnelIcon,
//   DocumentTextIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   XMarkIcon,
//   ExclamationTriangleIcon,
//   ChevronUpIcon,
//   ChevronDownIcon,
//   ArrowsUpDownIcon,
//   BarsArrowDownIcon,
//   BarsArrowUpIcon,
//   CheckIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   EllipsisVerticalIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import { BriefcaseIcon } from "@heroicons/react/24/solid";

// // Sort columns configuration
// const SORT_COLUMNS = [
//   { key: "dealLogId", label: "Deal Log ID" },
//   { key: "createdAt", label: "Logged On" },
//   { key: "dealName", label: "Deal Name" },
//   { key: "accountName", label: "Account Name" },
//   { key: "productGroup", label: "Product Group" },
//   { key: "stage", label: "Stage" },
//   { key: "personInCharge", label: "Person In Charge" },
//   { key: "weightage", label: "Weightage" },
//   { key: "closingDate", label: "Closing Date" },
// ];

// const parseDealLogId = (logId) => {
//   if (!logId) return { year: 0, number: 0 };
//   const match = logId.match(/FY(\d+)\.(\d+)/);
//   if (match) {
//     return { year: parseInt(match[1]), number: parseInt(match[2]) };
//   }
//   return { year: 0, number: 0 };
// };

// // Sort Dropdown Component
// const SortDropdown = ({ isOpen, onClose, sortConfig, onSortChange }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-40" onClick={onClose} />
//       <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-80 max-w-[95vw] bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden">
//         <div className="px-4 py-3 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50">
//           <div className="flex items-center justify-between">
//             <h3 className="text-sm font-semibold text-indigo-900">
//               Sort Options
//             </h3>
//             <button
//               onClick={() =>
//                 onSortChange({ column: "dealLogId", order: "desc" })
//               }
//               className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
//             >
//               Reset Default
//             </button>
//           </div>
//         </div>
//         <div className="p-3">
//           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//             Sort By Column
//           </label>
//           <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
//             {SORT_COLUMNS.map((col) => (
//               <button
//                 key={col.key}
//                 onClick={() =>
//                   onSortChange({ ...sortConfig, column: col.key })
//                 }
//                 className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all ${
//                   sortConfig.column === col.key
//                     ? "bg-indigo-50 text-indigo-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 <span>{col.label}</span>
//                 {sortConfig.column === col.key && (
//                   <CheckIcon className="w-4 h-4 text-indigo-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="px-3 pb-3">
//           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//             Sort Order
//           </label>
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               onClick={() => onSortChange({ ...sortConfig, order: "asc" })}
//               className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
//                 sortConfig.order === "asc"
//                   ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
//                   : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               <BarsArrowUpIcon className="w-4 h-4" />
//               Ascending
//             </button>
//             <button
//               onClick={() => onSortChange({ ...sortConfig, order: "desc" })}
//               className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
//                 sortConfig.order === "desc"
//                   ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
//                   : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               <BarsArrowDownIcon className="w-4 h-4" />
//               Descending
//             </button>
//           </div>
//         </div>
//         <div className="px-3 py-3 border-t border-gray-100 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
//           >
//             Apply Sorting
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// // Sortable Column Header
// const SortableHeader = ({
//   label,
//   columnKey,
//   sortConfig,
//   onSort,
//   className = "",
// }) => {
//   const isActive = sortConfig.column === columnKey;

//   return (
//     <th className={`px-4 py-3 text-left sticky top-0 z-10 ${className}`}>
//       <button
//         onClick={() => onSort(columnKey)}
//         className={`inline-flex items-center gap-1 transition-colors group/sort ${
//           isActive ? "text-indigo-700" : "text-gray-500 hover:text-gray-800"
//         }`}
//       >
//         <span className="text-[11px] font-semibold uppercase tracking-wider">
//           {label}
//         </span>
//         <span className="flex flex-col -space-y-1">
//           <ChevronUpIcon
//             className={`w-2.5 h-2.5 ${
//               isActive && sortConfig.order === "asc"
//                 ? "text-indigo-600"
//                 : "text-gray-300 group-hover/sort:text-gray-400"
//             }`}
//           />
//           <ChevronDownIcon
//             className={`w-2.5 h-2.5 ${
//               isActive && sortConfig.order === "desc"
//                 ? "text-indigo-600"
//                 : "text-gray-300 group-hover/sort:text-gray-400"
//             }`}
//           />
//         </span>
//       </button>
//     </th>
//   );
// };

// // Row Action Menu
// const RowActionMenu = ({ deal, currentUser, onDelete, onNavigate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsOpen(!isOpen);
//         }}
//         className={`p-1.5 rounded-lg transition-all duration-200 ${
//           isOpen
//             ? "bg-indigo-100 text-indigo-700"
//             : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
//         }`}
//       >
//         <EllipsisVerticalIcon className="w-5 h-5" />
//       </button>

//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40"
//             onClick={() => setIsOpen(false)}
//           />
//           <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden py-1">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onNavigate(`/deals/${deal.id}`);
//                 setIsOpen(false);
//               }}
//               className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
//             >
//               <EyeIcon className="w-4 h-4 text-gray-400" />
//               View Details
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onNavigate(`/deals/${deal.id}/edit`);
//                 setIsOpen(false);
//               }}
//               className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
//             >
//               <PencilSquareIcon className="w-4 h-4 text-gray-400" />
//               Edit Deal
//             </button>
//             {currentUser?.role !== "SALES_REP" && (
//               <>
//                 <div className="border-t border-gray-100 my-1" />
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete(deal);
//                     setIsOpen(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                 >
//                   <TrashIcon className="w-4 h-4" />
//                   Delete Deal
//                 </button>
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const DealList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { deals, pagination, loading } = useSelector((s) => s.deals);
//   const { user: currentUser } = useSelector((s) => s.auth);

//   const fileInputRef = useRef(null);
//   const [importing, setImporting] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(50);
//   const [selectedIds, setSelectedIds] = useState([]);

//   // Search state
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const searchInputRef = useRef(null);

//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [sortConfig, setSortConfig] = useState({
//     column: "dealLogId",
//     order: "desc",
//   });
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [deleteModal, setDeleteModal] = useState({
//     open: false,
//     id: null,
//     name: "",
//   });
//   const [deleting, setDeleting] = useState(false);
//   const [bulkDeleteModal, setBulkDeleteModal] = useState({
//     open: false,
//     count: 0,
//   });

//   const toggleSelectAll = useCallback(() => {
//     if (selectedIds.length === deals.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(deals.map((d) => d.id));
//     }
//   }, [deals, selectedIds]);

//   const toggleSelect = useCallback((id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
//     );
//   }, []);

//   const handleBulkDelete = async () => {
//     setDeleting(true);
//     try {
//       await dispatch(bulkDeleteDeals(selectedIds)).unwrap();
//       toast.success(`Successfully deleted ${selectedIds.length} deals`);
//       setSelectedIds([]);
//       setBulkDeleteModal({ open: false, count: 0 });
//     } catch (err) {
//       toast.error(err || "Failed to delete deals");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//       setPage(1);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   useEffect(() => {
//     dispatch(
//       fetchDeals({
//         page,
//         limit,
//         sortBy: sortConfig.column,
//         sortOrder: sortConfig.order,
//         search: debouncedSearch || undefined,
//       })
//     );
//   }, [dispatch, page, limit, sortConfig, debouncedSearch]);

//   const handleImport = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImporting(true);
//     try {
//       const res = await dispatch(importDeals(file)).unwrap();
//       if (res.data?.errors?.length > 0) {
//         toast.error(`Import finished with ${res.data.errors.length} errors`);
//       }
//       toast.success(
//         `Import complete! Created: ${res.data?.created}, Updated: ${res.data?.updated}, Skipped: ${res.data?.skipped}`
//       );
//     } catch (err) {
//       toast.error(err || "Failed to import deals");
//     } finally {
//       setImporting(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const sortedDeals = useMemo(() => {
//     if (!deals || deals.length === 0) return [];

//     return [...deals].sort((a, b) => {
//       const { column, order } = sortConfig;
//       let comparison = 0;

//       switch (column) {
//         case "dealLogId": {
//           const aLog = parseDealLogId(a.dealLogId);
//           const bLog = parseDealLogId(b.dealLogId);
//           comparison =
//             aLog.year !== bLog.year
//               ? aLog.year - bLog.year
//               : aLog.number - bLog.number;
//           break;
//         }
//         case "dealName":
//           comparison = (a.dealName || "").localeCompare(b.dealName || "");
//           break;
//         case "accountName":
//           comparison = (a.account?.accountName || "").localeCompare(
//             b.account?.accountName || ""
//           );
//           break;
//         case "productGroup":
//           comparison = (a.productGroup || "").localeCompare(
//             b.productGroup || ""
//           );
//           break;
//         case "stage":
//           comparison = (a.stage || "").localeCompare(b.stage || "");
//           break;
//         case "personInCharge":
//           comparison = (a.personInCharge || "").localeCompare(
//             b.personInCharge || ""
//           );
//           break;
//         case "weightage":
//           comparison = (a.weightage || "").localeCompare(b.weightage || "");
//           break;
//         case "createdAt":
//         case "closingDate": {
//           const dateA = a[column] ? new Date(a[column]).getTime() : 0;
//           const dateB = b[column] ? new Date(b[column]).getTime() : 0;
//           comparison = dateA - dateB;
//           break;
//         }
//         default:
//           comparison = 0;
//       }

//       return order === "asc" ? comparison : -comparison;
//     });
//   }, [deals, sortConfig]);

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await dispatch(deleteDeal(deleteModal.id)).unwrap();
//       toast.success("Deal deleted successfully");
//       setDeleteModal({ open: false, id: null, name: "" });
//     } catch (err) {
//       toast.error(err || "Failed to delete deal");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleColumnSort = (columnKey) => {
//     setSortConfig((prev) => ({
//       column: columnKey,
//       order:
//         prev.column === columnKey && prev.order === "desc" ? "asc" : "desc",
//     }));
//     setPage(1);
//   };

//   const handleSortChange = (newConfig) => {
//     setSortConfig(newConfig);
//     setPage(1);
//   };

//   const resetSort = () => {
//     setSortConfig({ column: "dealLogId", order: "desc" });
//     setPage(1);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const prepareExportData = () => {
//     return sortedDeals.map((deal) => ({
//       "Deal Log ID": deal.dealLogId,
//       "Logged On": formatDate(deal.createdAt),
//       "Deal Name": deal.dealName,
//       "Account Name": deal.account?.accountName || "",
//       "Product Group": deal.productGroup || "",
//       Stage: formatLabel(deal.stage),
//       "Person In Charge": deal.personInCharge || "",
//       Weightage: deal.weightage || "",
//       "Closing Date": formatDate(deal.closingDate),
//     }));
//   };

//   const exportCSV = () => {
//     const data = prepareExportData();
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const csv = XLSX.utils.sheet_to_csv(worksheet);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, `deals_export_${Date.now()}.csv`);
//     setShowExportDropdown(false);
//   };

//   const exportExcel = () => {
//     const data = prepareExportData();
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//     });
//     saveAs(blob, `deals_export_${Date.now()}.xlsx`);
//     setShowExportDropdown(false);
//   };

//   const isDefaultSort =
//     sortConfig.column === "dealLogId" && sortConfig.order === "desc";

//   const getCurrentSortLabel = () => {
//     const col = SORT_COLUMNS.find((c) => c.key === sortConfig.column);
//     const orderLabel = sortConfig.order === "asc" ? "↑" : "↓";
//     return col ? `${col.label} ${orderLabel}` : "";
//   };

//   const hasActiveFilters = !isDefaultSort || debouncedSearch;

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg shadow-indigo-200">
//               <BriefcaseIcon className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
//               <p className="text-sm text-gray-500">
//                 Manage your sales pipeline and track deal progress
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {(currentUser?.role === "ADMIN" ||
//             currentUser?.role === "MANAGER") && (
//             <>
//               <input
//                 type="file"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleImport}
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={importing}
//                 className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm disabled:opacity-50"
//               >
//                 {importing ? (
//                   <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <ArrowUpTrayIcon className="w-4 h-4" />
//                 )}
//                 {importing ? "Importing..." : "Import"}
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => navigate("/deals/new")}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-200"
//           >
//             <PlusIcon className="w-4 h-4" />
//             New Deal
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 hover:shadow-md hover:shadow-blue-100 transition-all">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-lg shadow-sm">
//               <BriefcaseIcon className="w-5 h-5 text-blue-600" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-2xl font-bold text-blue-900">
//                 {pagination?.total || sortedDeals.length}
//               </p>
//               <p className="text-xs font-medium text-blue-600/70">
//                 Total Deals
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 p-4 hover:shadow-md hover:shadow-emerald-100 transition-all">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-lg shadow-sm">
//               <CheckIcon className="w-5 h-5 text-emerald-600" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-2xl font-bold text-emerald-900">
//                 {deals.filter((d) => d.stage === "CLOSED_WON").length}
//               </p>
//               <p className="text-xs font-medium text-emerald-600/70">
//                 Won Deals
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-4 hover:shadow-md hover:shadow-amber-100 transition-all">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-lg shadow-sm">
//               <FunnelIcon className="w-5 h-5 text-amber-600" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-2xl font-bold text-amber-900">
//                 {deals.filter((d) => d.stage === "NEGOTIATION").length}
//               </p>
//               <p className="text-xs font-medium text-amber-600/70">
//                 In Negotiation
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100 p-4 hover:shadow-md hover:shadow-purple-100 transition-all">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white rounded-lg shadow-sm">
//               <DocumentTextIcon className="w-5 h-5 text-purple-600" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-2xl font-bold text-purple-900">
//                 {deals.filter((d) => d.stage === "COMMERCIAL_PROPOSAL").length}
//               </p>
//               <p className="text-xs font-medium text-purple-600/70">
//                 Proposals Sent
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Toolbar: Search + Sort + Export */}
//       <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
//         <div className="flex flex-col gap-3">
//           {/* Search Bar */}
//           <div className="relative">
//             <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
//             <input
//               ref={searchInputRef}
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by deal name, account, log ID, owner..."
//               className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <XMarkIcon className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* Bottom Row: Info + Actions */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-sm font-semibold text-gray-800">
//                 {pagination?.total || sortedDeals.length}{" "}
//                 <span className="font-normal text-gray-500">deals</span>
//               </span>

//               {debouncedSearch && (
//                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-violet-50 text-violet-700 rounded-full border border-violet-100">
//                   <MagnifyingGlassIcon className="w-3 h-3" />
//                   &ldquo;{debouncedSearch}&rdquo;
//                   <button
//                     onClick={clearSearch}
//                     className="ml-0.5 hover:text-violet-900 transition-colors"
//                   >
//                     <XMarkIcon className="w-3 h-3" />
//                   </button>
//                 </span>
//               )}

//               {!isDefaultSort && (
//                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
//                   <ArrowsUpDownIcon className="w-3 h-3" />
//                   {getCurrentSortLabel()}
//                   <button
//                     onClick={resetSort}
//                     className="ml-0.5 hover:text-indigo-900 transition-colors"
//                   >
//                     <XMarkIcon className="w-3 h-3" />
//                   </button>
//                 </span>
//               )}

//               {hasActiveFilters && (
//                 <button
//                   onClick={() => {
//                     resetSort();
//                     setSearchQuery("");
//                   }}
//                   className="text-xs text-gray-500 hover:text-gray-700 font-medium underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors"
//                 >
//                   Clear all
//                 </button>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               {/* Export */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowExportDropdown(!showExportDropdown)}
//                   className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
//                 >
//                   <ArrowDownTrayIcon className="w-4 h-4" />
//                   <span className="hidden sm:inline">Export</span>
//                 </button>
//                 {showExportDropdown && (
//                   <>
//                     <div
//                       className="fixed inset-0 z-40"
//                       onClick={() => setShowExportDropdown(false)}
//                     />
//                     <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
//                       <button
//                         onClick={exportExcel}
//                         className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
//                       >
//                         📊 Export as Excel
//                       </button>
//                       <button
//                         onClick={exportCSV}
//                         className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
//                       >
//                         📄 Export as CSV
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Sort */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowSortDropdown(!showSortDropdown)}
//                   className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-xl border transition-all ${
//                     showSortDropdown || !isDefaultSort
//                       ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
//                       : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
//                   }`}
//                 >
//                   <ArrowsUpDownIcon className="w-4 h-4" />
//                   <span className="hidden sm:inline">Sort</span>
//                   {sortConfig.order === "desc" ? (
//                     <BarsArrowDownIcon className="w-3.5 h-3.5" />
//                   ) : (
//                     <BarsArrowUpIcon className="w-3.5 h-3.5" />
//                   )}
//                 </button>
//                 <SortDropdown
//                   isOpen={showSortDropdown}
//                   onClose={() => setShowSortDropdown(false)}
//                   sortConfig={sortConfig}
//                   onSortChange={handleSortChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
      
//       {/* Bulk Actions Bar */}
//       {selectedIds.length > 0 && (
//         <div className="mb-4 flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg text-white font-bold text-sm shadow-indigo-200 shadow-lg">
//               {selectedIds.length}
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-indigo-900">
//                 {selectedIds.length} {selectedIds.length === 1 ? "Deal" : "Deals"} selected
//               </p>
//               <p className="text-xs text-indigo-600 font-medium">
//                 Bulk actions will apply to all selected items
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setSelectedIds([])}
//               className="px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-white rounded-lg transition-all"
//             >
//               Deselect All
//             </button>
//             <button
//               onClick={() => setBulkDeleteModal({ open: true, count: selectedIds.length })}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
//             >
//               <TrashIcon className="w-4 h-4" />
//               Delete Selected
//             </button>
//           </div>
//         </div>
//       )}
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//         {loading ? (
//           <div className="flex items-center justify-center py-24">
//             <div className="flex flex-col items-center gap-4">
//               <div className="relative">
//                 <div className="w-12 h-12 border-4 border-indigo-100 rounded-full" />
//                 <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//               </div>
//               <p className="text-sm font-medium text-gray-500">
//                 Loading deals...
//               </p>
//             </div>
//           </div>
//         ) : sortedDeals.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24">
//             <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
//               {debouncedSearch ? (
//                 <MagnifyingGlassIcon className="w-8 h-8 text-indigo-400" />
//               ) : (
//                 <BriefcaseIcon className="w-8 h-8 text-indigo-400" />
//               )}
//             </div>
//             <h3 className="text-base font-semibold text-gray-900 mb-1">
//               {debouncedSearch ? "No deals match your search" : "No deals found"}
//             </h3>
//             <p className="text-sm text-gray-500 mb-5">
//               {debouncedSearch
//                 ? `No results for "${debouncedSearch}". Try a different search term.`
//                 : "Get started by creating your first deal"}
//             </p>
//             {debouncedSearch ? (
//               <button
//                 onClick={clearSearch}
//                 className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
//               >
//                 <XMarkIcon className="w-4 h-4 mr-1.5" />
//                 Clear Search
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate("/deals/new")}
//                 className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md shadow-indigo-200"
//               >
//                 <PlusIcon className="w-4 h-4 mr-1.5" />
//                 Create Deal
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-480px)] min-h-[400px] relative">
//               <table className="w-full min-w-[950px]">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200">
//                     <th className="px-4 py-3 text-left w-10">
//                       <div className="flex items-center justify-center">
//                         <input
//                           type="checkbox"
//                           checked={deals.length > 0 && selectedIds.length === deals.length}
//                           onChange={toggleSelectAll}
//                           className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
//                         />
//                       </div>
//                     </th>
//                     <SortableHeader
//                       label="Log ID"
//                       columnKey="dealLogId"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[120px] bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Deal Name"
//                       columnKey="dealName"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[200px] bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Account"
//                       columnKey="accountName"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[170px] bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Stage"
//                       columnKey="stage"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[150px] bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Owner"
//                       columnKey="personInCharge"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[130px] hidden md:table-cell bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Product"
//                       columnKey="productGroup"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[120px] hidden lg:table-cell bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Weightage"
//                       columnKey="weightage"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[100px] hidden lg:table-cell bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Closing Date"
//                       columnKey="closingDate"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[115px] hidden xl:table-cell bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <SortableHeader
//                       label="Logged On"
//                       columnKey="createdAt"
//                       sortConfig={sortConfig}
//                       onSort={handleColumnSort}
//                       className="min-w-[110px] hidden xl:table-cell bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200"
//                     />
//                     <th className="px-3 py-3 text-right sticky top-0 bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-b border-gray-200 z-10 w-12">
//                       <span className="sr-only">Actions</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedDeals.map((deal, index) => {
//                     const stageColor = STAGE_COLORS[deal.stage] || {
//                       bg: "bg-gray-50",
//                       text: "text-gray-700",
//                       dot: "bg-gray-500",
//                     };

//                     return (
//                       <tr
//                         key={deal.id}
//                         onClick={() => navigate(`/deals/${deal.id}`)}
//                         className={`
//                           cursor-pointer transition-all duration-150 group
//                           ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
//                           hover:bg-indigo-50/50 hover:shadow-[inset_3px_0_0_0_rgb(99,102,241)]
//                         `}
//                       >
//                         {/* Checkbox */}
//                         <td className="px-4 py-3.5 w-10" onClick={(e) => e.stopPropagation()}>
//                           <div className="flex items-center justify-center">
//                             <input
//                               type="checkbox"
//                               checked={selectedIds.includes(deal.id)}
//                               onChange={() => toggleSelect(deal.id)}
//                               className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
//                             />
//                           </div>
//                         </td>

//                         {/* Log ID */}
//                         <td className="px-4 py-3.5">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gradient-to-r from-indigo-50 to-blue-50 text-xs font-mono font-semibold text-indigo-700 border border-indigo-100">
//                             {deal.dealLogId}
//                           </span>
//                         </td>

//                         {/* Deal Name */}
//                         <td className="px-4 py-3.5">
//                           <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors truncate max-w-[220px] block">
//                             {deal.dealName}
//                           </span>
//                         </td>

//                         {/* Account */}
//                         <td className="px-4 py-3.5">
//                           {deal.account?.accountName ? (
//                             <Link
//                               to={`/accounts/${deal.account.id}`}
//                               onClick={(e) => e.stopPropagation()}
//                               className="text-sm text-gray-700 hover:text-indigo-600 hover:underline decoration-indigo-300 underline-offset-2 transition-colors truncate max-w-[170px] block"
//                             >
//                               {deal.account.accountName}
//                             </Link>
//                           ) : (
//                             <span className="text-sm text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Stage */}
//                         <td className="px-4 py-3.5">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${stageColor.bg} ${stageColor.text} ${stageColor.border || ""}`}
//                           >
//                             <span
//                               className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stageColor.dot}`}
//                             />
//                             {formatLabel(deal.stage)}
//                           </span>
//                         </td>

//                         {/* Owner */}
//                         <td className="px-4 py-3.5 hidden md:table-cell">
//                           {deal.personInCharge ? (
//                             <div className="flex items-center gap-2">
//                               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center flex-shrink-0">
//                                 <span className="text-[10px] font-bold text-white">
//                                   {deal.personInCharge.charAt(0).toUpperCase()}
//                                 </span>
//                               </div>
//                               <span className="text-sm text-gray-700 truncate max-w-[100px]">
//                                 {deal.personInCharge}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="text-sm text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Product Group */}
//                         <td className="px-4 py-3.5 hidden lg:table-cell">
//                           {deal.productGroup ? (
//                             <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-xs font-medium text-gray-600 border border-gray-150">
//                               {formatLabel(deal.productGroup)}
//                             </span>
//                           ) : (
//                             <span className="text-sm text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Weightage */}
//                         <td className="px-4 py-3.5 hidden lg:table-cell">
//                           {deal.weightage ? (
//                             <span className="text-sm text-gray-600 font-medium">
//                               {formatLabel(deal.weightage)}
//                             </span>
//                           ) : (
//                             <span className="text-sm text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Closing Date */}
//                         <td className="px-4 py-3.5 hidden xl:table-cell">
//                           {deal.closingDate ? (
//                             <span className="text-sm text-gray-600">
//                               {formatDate(deal.closingDate)}
//                             </span>
//                           ) : (
//                             <span className="text-sm text-gray-300">—</span>
//                           )}
//                         </td>

//                         {/* Logged On */}
//                         <td className="px-4 py-3.5 hidden xl:table-cell">
//                           <span className="text-sm text-gray-400">
//                             {formatDate(deal.createdAt)}
//                           </span>
//                         </td>

//                         {/* Actions */}
//                         <td
//                           className="px-3 py-3.5 text-right"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <RowActionMenu
//                             deal={deal}
//                             currentUser={currentUser}
//                             onDelete={(d) =>
//                               setDeleteModal({
//                                 open: true,
//                                 id: d.id,
//                                 name: d.dealName,
//                               })
//                             }
//                             onNavigate={navigate}
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 gap-3">
//               <div className="flex items-center gap-3 text-sm">
//                 <span className="text-gray-500">
//                   <span className="font-semibold text-gray-700">
//                     {(page - 1) * limit + 1}
//                   </span>
//                   <span className="text-gray-400"> – </span>
//                   <span className="font-semibold text-gray-700">
//                     {Math.min(page * limit, pagination?.total || 0)}
//                   </span>
//                   <span className="text-gray-400"> of </span>
//                   <span className="font-semibold text-gray-700">
//                     {pagination?.total || 0}
//                   </span>
//                 </span>
//                 <div className="flex items-center gap-1.5 border-l border-gray-300 pl-3">
//                   <label className="text-xs text-gray-500">Rows</label>
//                   <select
//                     value={limit}
//                     onChange={(e) => {
//                       setLimit(Number(e.target.value));
//                       setPage(1);
//                     }}
//                     className="text-xs font-medium bg-white border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
//                   >
//                     {[10, 20, 50].map((v) => (
//                       <option key={v} value={v}>
//                         {v}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {pagination?.pages > 1 && (
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronLeftIcon className="w-4 h-4" />
//                   </button>

//                   <div className="hidden sm:flex items-center gap-1">
//                     {Array.from(
//                       { length: pagination.pages },
//                       (_, i) => i + 1
//                     )
//                       .filter((p) => {
//                         if (pagination.pages <= 7) return true;
//                         if (p === 1 || p === pagination.pages) return true;
//                         if (Math.abs(p - page) <= 1) return true;
//                         return false;
//                       })
//                       .map((p, idx, arr) => {
//                         const showEllipsis =
//                           idx > 0 && p - arr[idx - 1] > 1;
//                         return (
//                           <div key={p} className="flex items-center">
//                             {showEllipsis && (
//                               <span className="px-1 text-gray-300 text-sm">
//                                 …
//                               </span>
//                             )}
//                             <button
//                               onClick={() => setPage(p)}
//                               className={`w-8 h-8 text-sm font-medium rounded-lg transition-all ${
//                                 page === p
//                                   ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-indigo-200"
//                                   : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
//                               }`}
//                             >
//                               {p}
//                             </button>
//                           </div>
//                         );
//                       })}
//                   </div>

//                   <span className="sm:hidden text-sm text-gray-500 px-2 font-medium">
//                     {page} / {pagination.pages}
//                   </span>

//                   <button
//                     onClick={() =>
//                       setPage((p) => Math.min(pagination.pages, p + 1))
//                     }
//                     disabled={page === pagination.pages}
//                     className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//                   >
//                     <ChevronRightIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {deleteModal.open && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <div
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//               onClick={() =>
//                 setDeleteModal({ open: false, id: null, name: "" })
//               }
//             />
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all">
//               <div className="text-center">
//                 <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
//                   <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">
//                   Delete Deal
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-6">
//                   Are you sure you want to delete{" "}
//                   <span className="font-semibold text-gray-700">
//                     &ldquo;{deleteModal.name}&rdquo;
//                   </span>
//                   ?
//                   <br />
//                   <span className="text-xs text-red-500 mt-1 inline-block">
//                     This action cannot be undone.
//                   </span>
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() =>
//                     setDeleteModal({ open: false, id: null, name: "" })
//                   }
//                   disabled={deleting}
//                   className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-md shadow-red-200 disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bulk Delete Modal */}
//       {bulkDeleteModal.open && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <div
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//               onClick={() => setBulkDeleteModal({ open: false, count: 0 })}
//             />
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all">
//               <div className="text-center">
//                 <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
//                   <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">
//                   Delete Multiple Deals
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-6">
//                   Are you sure you want to delete{" "}
//                   <span className="font-bold text-red-600 text-lg">
//                     {bulkDeleteModal.count}
//                   </span>{" "}
//                   selected deals?
//                   <br />
//                   <span className="text-xs text-red-500 mt-2 block font-medium">
//                     This action is permanent and cannot be undone.
//                   </span>
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setBulkDeleteModal({ open: false, count: 0 })}
//                   disabled={deleting}
//                   className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBulkDelete}
//                   disabled={deleting}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-md shadow-red-200 disabled:opacity-50"
//                 >
//                   {deleting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete All"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DealList;