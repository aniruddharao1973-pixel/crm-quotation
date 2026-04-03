// // src/components/assign/AssignmentGrid.jsx
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAssignment } from "../../features/assign/assignmentSlice";
// import { useState } from "react";

// export default function AssignmentGrid({ type }) {
//   const dispatch = useDispatch();

//   const {
//     users = [],
//     records = [],
//     loading = false,
//     toggleLoadingMap = {},
//   } = useSelector((state) => state.assignment) || {};

//   const getInitials = (name) =>
//     (name || "")
//       .split(" ")
//       .map((w) => w[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);

//   const palette = [
//     "bg-blue-500",
//     "bg-emerald-500",
//     "bg-violet-500",
//     "bg-amber-500",
//     "bg-rose-500",
//     "bg-cyan-500",
//     "bg-fuchsia-500",
//     "bg-teal-500",
//   ];

//   const [searchTerm, setSearchTerm] = useState("");

//   /* ─── TOGGLE SWITCH ─── */
//   const Toggle = ({ assigned, toggling, onToggle, label }) => (
//     <button
//       disabled={toggling}
//       onClick={onToggle}
//       role="switch"
//       aria-checked={assigned}
//       aria-label={label}
//       className={`
//         relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full
//         transition-colors duration-200 ease-in-out
//         focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
//         ${assigned ? "bg-blue-600" : "bg-gray-200"}
//         ${toggling ? "opacity-50 cursor-wait" : "cursor-pointer active:scale-95"}
//       `}
//     >
//       <span
//         className={`
//           pointer-events-none inline-flex items-center justify-center
//           h-[18px] w-[18px] rounded-full bg-white shadow-sm
//           transition-transform duration-200 ease-in-out
//           ${assigned ? "translate-x-[23px]" : "translate-x-[3px]"}
//         `}
//       >
//         {toggling && (
//           <span className="block w-2.5 h-2.5 border-[1.5px] border-gray-300 border-t-transparent rounded-full animate-spin" />
//         )}
//       </span>
//     </button>
//   );

//   /* ─── ROLE BADGE ─── */
//   const RoleBadge = ({ role }) => {
//     const map = {
//       SALES_REP: { cls: "bg-sky-50 text-sky-700", label: "Sales Rep" },
//       MANAGER: { cls: "bg-amber-50 text-amber-700", label: "Manager" },
//       ADMIN: { cls: "bg-rose-50 text-rose-700", label: "Admin" },
//     };
//     const { cls, label } = map[role] || {
//       cls: "bg-gray-100 text-gray-600",
//       label: role,
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold leading-tight ${cls}`}
//       >
//         {label}
//       </span>
//     );
//   };

//   /* ─── LOADING SKELETON ─── */
//   if (loading) {
//     return (
//       <div className="w-full h-full flex flex-col bg-white">
//         <div className="shrink-0 p-4 sm:p-6 border-b border-gray-100 space-y-3">
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 bg-gray-100 rounded-xl animate-pulse" />
//             <div className="space-y-1.5">
//               <div className="h-4 w-28 bg-gray-100 rounded-md animate-pulse" />
//               <div className="h-3 w-44 bg-gray-50 rounded-md animate-pulse" />
//             </div>
//           </div>
//           <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
//         </div>

//         {/* Mobile skeleton */}
//         <div className="flex-1 overflow-auto p-4 space-y-3 md:hidden">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div
//               key={i}
//               className="rounded-2xl border border-gray-100 overflow-hidden"
//             >
//               <div className="bg-gray-50 px-4 py-3">
//                 <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
//               </div>
//               <div className="divide-y divide-gray-50">
//                 {Array.from({ length: 3 }).map((_, j) => (
//                   <div
//                     key={j}
//                     className="flex items-center justify-between px-4 py-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
//                       <div className="space-y-1.5">
//                         <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
//                         <div className="h-2.5 w-14 bg-gray-100 rounded animate-pulse" />
//                       </div>
//                     </div>
//                     <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Desktop skeleton */}
//         <div className="flex-1 overflow-auto p-6 hidden md:block">
//           <div className="rounded-2xl border border-gray-100 overflow-hidden">
//             <div className="bg-gray-50 px-6 py-5">
//               <div className="flex items-center gap-12">
//                 {[130, 90, 90, 90].map((w, i) => (
//                   <div
//                     key={i}
//                     className="h-3 bg-gray-200 rounded animate-pulse"
//                     style={{ width: w }}
//                   />
//                 ))}
//               </div>
//             </div>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-12 px-6 py-4 border-t border-gray-50"
//               >
//                 <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
//                 {Array.from({ length: 3 }).map((_, j) => (
//                   <div
//                     key={j}
//                     className="h-6 w-11 bg-gray-100 rounded-full animate-pulse"
//                   />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const getIcon = () => {
//     switch (type) {
//       case "deal":
//         return "💼";
//       case "contact":
//         return "👤";
//       case "account":
//         return "🏢";
//       default:
//         return "🔐";
//     }
//   };

//   const filteredRecords = records.filter((r) => {
//     const search = (searchTerm || "").toLowerCase().trim();

//     if (!search) return true; // show all when empty

//     // Match record name
//     const matchRecord = (r.name || "").toLowerCase().includes(search);

//     // Match ONLY assigned users for this record
//     const matchUser = users.some((u) => {
//       const isAssigned = !!r.assignments?.[u.id];
//       const name = (u.name || "").toLowerCase();
//       const email = (u.email || "").toLowerCase();
//       const role = (u.role || "").toLowerCase();

//       return (
//         isAssigned &&
//         (name.includes(search) ||
//           email.includes(search) ||
//           role.includes(search))
//       );
//     });
//     return matchRecord || matchUser;
//   });

//   /* ─── MAIN RENDER ─── */
//   return (
//     <div className="w-full h-full flex flex-col bg-white font-sans">
//       {/* ═══ HEADER ═══ */}
//       <div className="shrink-0 px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100">
//         <div className="flex items-start justify-between mb-3.5">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-indigo-200 flex items-center justify-center shadow-sm shrink-0">
//               <span className="text-white text-sm">{getIcon()}</span>
//             </div>

//             <div>
//               <div className="flex items-center gap-2">
//                 <h2 className="text-base font-semibold text-gray-900 leading-tight">
//                   Manage {type} permissions
//                 </h2>
//                 {records.length > 0 && (
//                   <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold tabular-nums">
//                     {records.length}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-400 mt-0.5 leading-snug">
//                 Assign or revoke access for each user across{" "}
//                 {type.toLowerCase()} records
//               </p>
//             </div>
//           </div>

//           {users.length > 0 && (
//             <div className="hidden sm:flex items-center -space-x-1.5 mt-1">
//               {users.slice(0, 4).map((u, i) => (
//                 <div
//                   key={u.id}
//                   className={`w-7 h-7 rounded-full ${palette[i % palette.length]} flex items-center justify-center ring-2 ring-white`}
//                   title={u.name}
//                 >
//                   <span className="text-[9px] font-bold text-white">
//                     {getInitials(u.name)}
//                   </span>
//                 </div>
//               ))}
//               {users.length > 4 && (
//                 <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white">
//                   <span className="text-[9px] font-semibold text-gray-500">
//                     +{users.length - 4}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <svg
//             className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//             width="15"
//             height="15"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               cx="11"
//               cy="11"
//               r="7"
//               stroke="currentColor"
//               strokeWidth="2"
//             />
//             <path
//               d="M21 21l-4.35-4.35"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           <input
//             type="text"
//             value={searchTerm} // *
//             onChange={(e) => setSearchTerm(e.target.value)} // *
//             placeholder={`Search ${type.toLowerCase()} or user...`}
//             className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl
//               text-gray-900 placeholder:text-gray-400
//               focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 focus:bg-white
//               transition-all duration-150"
//           />
//         </div>
//       </div>

//       {/* ═══ CONTENT ═══ */}
//       <div className="flex-1 overflow-auto overscroll-contain">
//         {filteredRecords.length === 0 ? (
//           /* ── Empty State ── */
//           <div className="flex flex-col items-center justify-center h-full min-h-[320px] px-6 text-center">
//             <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
//               <svg
//                 width="28"
//                 height="28"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="text-gray-300"
//               >
//                 <rect
//                   x="3"
//                   y="3"
//                   width="18"
//                   height="18"
//                   rx="3"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                 />
//                 <path
//                   d="M9 9h6M9 12h6M9 15h4"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-sm font-semibold text-gray-900 mb-1">
//               No {type.toLowerCase()} records
//             </h3>
//             <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed">
//               There are no {type.toLowerCase()} records available. Try adjusting
//               your filters or create a new one.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* ═══════ MOBILE: Card Layout ═══════ */}
//             <div className="md:hidden p-4 space-y-3 pb-8">
//               {filteredRecords.map((r) => (
//                 <div
//                   key={r.id}
//                   className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
//                 >
//                   {/* Card title bar */}
//                   <div className="px-4 py-3 bg-gray-50/70 border-b border-gray-100 flex items-center gap-2.5">
//                     <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
//                     <span className="text-[13px] font-semibold text-gray-900 truncate">
//                       {r.name}
//                     </span>
//                   </div>

//                   {/* User rows */}
//                   <div className="divide-y divide-gray-100">
//                     {users.map((u, ui) => {
//                       const assigned = !!r.assignments?.[u.id];
//                       const isToggling = toggleLoadingMap?.[`${r.id}_${u.id}`];
//                       return (
//                         <div
//                           key={u.id}
//                           className="flex items-center justify-between px-4 py-3 active:bg-gray-50 transition-colors"
//                         >
//                           <div className="flex items-center gap-3 min-w-0">
//                             <div
//                               className={`w-8 h-8 rounded-full ${palette[ui % palette.length]} flex items-center justify-center shrink-0`}
//                             >
//                               <span className="text-[11px] font-bold text-white leading-none">
//                                 {getInitials(u.name)}
//                               </span>
//                             </div>
//                             <div className="min-w-0">
//                               <p className="text-[13px] font-medium text-gray-900 truncate leading-tight">
//                                 {u.name}
//                               </p>
//                               <div className="mt-0.5">
//                                 <RoleBadge role={u.role} />
//                               </div>
//                             </div>
//                           </div>
//                           <Toggle
//                             assigned={assigned}
//                             toggling={isToggling}
//                             onToggle={() =>
//                               dispatch(
//                                 toggleAssignment({
//                                   type,
//                                   recordId: r.id,
//                                   userId: u.id,
//                                   assigned: !assigned,
//                                 }),
//                               )
//                             }
//                             label={`Toggle ${u.name} access for ${r.name}`}
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* ═══════ DESKTOP: Table Layout ═══════ */}
//             <div className="hidden md:block p-6">
//               <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm border-collapse min-w-[600px]">
//                     <thead>
//                       <tr className="bg-gray-50/80 border-b border-gray-200">
//                         <th className="sticky left-0 z-20 bg-gray-50 text-left px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-52 min-w-[200px] border-r border-gray-100">
//                           {type} Name
//                         </th>
//                         {users.map((u, ui) => (
//                           <th
//                             key={u.id}
//                             className="px-5 py-4 text-center min-w-[130px]"
//                           >
//                             <div className="flex flex-col items-center gap-1.5">
//                               <div
//                                 className={`w-9 h-9 rounded-full ${palette[ui % palette.length]} flex items-center justify-center shadow-sm`}
//                               >
//                                 <span className="text-xs font-bold text-white">
//                                   {getInitials(u.name)}
//                                 </span>
//                               </div>
//                               <span className="text-[13px] font-semibold text-gray-800 leading-tight">
//                                 {u.name}
//                               </span>
//                               <RoleBadge role={u.role} />
//                             </div>
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {filteredRecords.map((r, ri) => (
//                         <tr
//                           key={r.id}
//                           className={`group transition-colors duration-100 hover:bg-blue-50/30 ${
//                             ri % 2 === 0 ? "bg-white" : "bg-gray-50/30"
//                           }`}
//                         >
//                           <td className="sticky left-0 z-10 bg-inherit px-6 py-3.5 border-b border-r border-gray-100 whitespace-nowrap">
//                             <div className="flex items-center gap-2.5">
//                               <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
//                               <span className="text-[13px] font-medium text-gray-800">
//                                 {r.name}
//                               </span>
//                             </div>
//                           </td>
//                           {users.map((u) => {
//                             const assigned = !!r.assignments?.[u.id];
//                             const isToggling =
//                               toggleLoadingMap?.[`${r.id}_${u.id}`];
//                             return (
//                               <td
//                                 key={u.id}
//                                 className="text-center py-3.5 px-5 border-b border-gray-100"
//                               >
//                                 <Toggle
//                                   assigned={assigned}
//                                   toggling={isToggling}
//                                   onToggle={() =>
//                                     dispatch(
//                                       toggleAssignment({
//                                         type,
//                                         recordId: r.id,
//                                         userId: u.id,
//                                         assigned: !assigned,
//                                       }),
//                                     )
//                                   }
//                                   label={`Toggle ${u.name} access for ${r.name}`}
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// ======================================================================================================================================
// // src/components/assign/AssignmentGrid.jsx
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAssignment } from "../../features/assign/assignmentSlice";
// import { useState } from "react";

// const palette = [
//   "bg-blue-500",
//   "bg-emerald-500",
//   "bg-violet-500",
//   "bg-amber-500",
//   "bg-rose-500",
//   "bg-cyan-500",
// ];

// const getInitials = (name) =>
//   (name || "")
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

// /* ─── TOGGLE ─── */
// const Toggle = ({ assigned, toggling, onToggle }) => (
//   <button
//     disabled={toggling}
//     onClick={onToggle}
//     aria-checked={assigned}
//     role="switch"
//     className={`
//       relative inline-flex h-7 w-12 shrink-0 items-center rounded-full
//       transition-all duration-200 focus:outline-none focus-visible:ring-2
//       focus-visible:ring-blue-400 focus-visible:ring-offset-1
//       ${assigned ? "bg-blue-600 shadow-inner shadow-blue-800/20" : "bg-gray-200"}
//       ${toggling ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
//     `}
//   >
//     {toggling ? (
//       <span className="absolute inset-0 flex items-center justify-center">
//         <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
//       </span>
//     ) : (
//       <span
//         className={`
//           h-5 w-5 bg-white rounded-full shadow-md
//           transition-transform duration-200 ease-in-out
//           ${assigned ? "translate-x-[22px]" : "translate-x-[4px]"}
//         `}
//       />
//     )}
//   </button>
// );

// /* ─── ROLE BADGE ─── */
// const RoleBadge = ({ role }) => {
//   const map = {
//     SALES_REP: {
//       cls: "bg-sky-50 text-sky-700 ring-sky-200",
//       label: "Sales Rep",
//     },
//     MANAGER: {
//       cls: "bg-amber-50 text-amber-700 ring-amber-200",
//       label: "Manager",
//     },
//     ADMIN: { cls: "bg-rose-50 text-rose-700 ring-rose-200", label: "Admin" },
//   };
//   const { cls, label } = map[role] || {
//     cls: "bg-gray-100 text-gray-500 ring-gray-200",
//     label: role,
//   };
//   return (
//     <span
//       className={`text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${cls}`}
//     >
//       {label}
//     </span>
//   );
// };

// /* ─── AVATAR ─── */
// const Avatar = ({ name, index, size = "sm" }) => {
//   const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
//   return (
//     <div
//       className={`${sz} rounded-full ${palette[index % palette.length]}
//         flex items-center justify-center ring-2 ring-white shadow-sm shrink-0`}
//     >
//       <span className="font-bold text-white">{getInitials(name)}</span>
//     </div>
//   );
// };

// /* ─── EMPTY STATE ─── */
// const EmptyState = ({ type }) => (
//   <div className="flex flex-col items-center justify-center py-16 text-center px-6">
//     <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//       <svg
//         className="w-8 h-8 text-gray-300"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={1.5}
//           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"
//         />
//       </svg>
//     </div>
//     <p className="text-sm font-medium text-gray-500">
//       No {type?.toLowerCase()} found
//     </p>
//     <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
//   </div>
// );

// /* ─── LOADING SKELETON ─── */
// const SkeletonRow = () => (
//   <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse">
//     <div className="px-4 py-3 bg-gray-50 border-b">
//       <div className="h-4 w-32 bg-gray-200 rounded-full" />
//     </div>
//     <div className="divide-y">
//       {[1, 2].map((i) => (
//         <div key={i} className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-gray-200" />
//             <div className="space-y-1.5">
//               <div className="h-3 w-24 bg-gray-200 rounded-full" />
//               <div className="h-2.5 w-14 bg-gray-100 rounded-full" />
//             </div>
//           </div>
//           <div className="w-12 h-7 bg-gray-200 rounded-full" />
//         </div>
//       ))}
//     </div>
//   </div>
// );

// /* ─── STATS PILL ─── */
// const StatsPill = ({ records, users }) => {
//   const totalAssigned = records.reduce((sum, r) => {
//     return sum + Object.values(r.assignments || {}).filter(Boolean).length;
//   }, 0);
//   const total = records.length * users.length;
//   if (!total) return null;
//   const pct = Math.round((totalAssigned / total) * 100);
// };

// export default function AssignmentGrid({ type }) {
//   const dispatch = useDispatch();

//   const {
//     users = [],
//     records = [],
//     loading = false,
//     toggleLoadingMap = {},
//   } = useSelector((state) => state.assignment) || {};

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(8);
//   const [showAssignedOnly, setShowAssignedOnly] = useState(false);

//   const filteredRecords = records
//     .filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter((r) =>
//       showAssignedOnly
//         ? Object.values(r.assignments || {}).some(Boolean)
//         : true,
//     );

//   const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

//   if (page > totalPages) {
//     setPage(1);
//   }

//   const paginatedRecords = filteredRecords.slice(
//     (page - 1) * pageSize,
//     page * pageSize,
//   );

//   return (
//     /*
//       KEY FIX: The wrapper must be `h-full flex flex-col` so the inner
//       scroll containers get a bounded height. Your parent must also give
//       this component a defined height (e.g. h-screen or h-[calc(100vh-Xpx)]).
//     */
//     <div className="w-full h-full flex flex-col bg-white">
//       {/* ─── HEADER ─── */}
//       <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
//         <div className="flex items-start justify-between gap-4 mb-3">
//           <div>
//             <h2 className="text-base font-semibold text-gray-900">
//               Manage {type} Permissions
//             </h2>
//             <p className="text-xs text-gray-400 mt-0.5">
//               {filteredRecords.length} {type?.toLowerCase()}
//               {filteredRecords.length !== 1 ? "s" : ""} &middot; {users.length}{" "}
//               user{users.length !== 1 ? "s" : ""}
//             </p>
//           </div>
//           <StatsPill records={filteredRecords} users={users} />
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <svg
//             className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//           <input
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             placeholder={`Search ${type?.toLowerCase() ?? ""}…`}
//             className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl
//               bg-gray-50 placeholder-gray-400
//               focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white
//               outline-none transition-all duration-150"
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ─── CONTENT ─── */}
//       {/*
//         `flex-1 min-h-0` is the magic combo:
//         - flex-1 → grow to fill remaining space
//         - min-h-0 → allow shrinking below content size (fixes flex overflow bug)
//         Without min-h-0, the child's overflow-y-auto has no upper bound and scroll never triggers.
//       */}
//       <div className="flex-1 min-h-0">
//         {/* ========== MOBILE ========== */}
//         <div className="md:hidden h-full overflow-y-auto overscroll-contain">
//           <div className="p-4 space-y-3 pb-6">
//             {loading ? (
//               <>
//                 <SkeletonRow />
//                 <SkeletonRow />
//                 <SkeletonRow />
//               </>
//             ) : filteredRecords.length === 0 ? (
//               <EmptyState type={type} />
//             ) : (
//               paginatedRecords.map((r) => {
//                 const assignedCount = Object.values(r.assignments || {}).filter(
//                   Boolean,
//                 ).length;
//                 return (
//                   <div
//                     key={r.id}
//                     className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden
//                       transition-shadow hover:shadow-md"
//                   >
//                     {/* Card header */}
//                     <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b flex items-center justify-between gap-2">
//                       <div className="flex items-center gap-2 min-w-0">
//                         <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
//                         <span className="text-sm font-semibold text-gray-900 break-words whitespace-normal">
//                           {r.name}
//                         </span>
//                       </div>
//                       <div className="flex flex-col items-end gap-1 shrink-0">
//                         <span className="text-[11px] text-gray-400">
//                           {assignedCount}/{users.length}
//                         </span>
//                         <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-blue-500"
//                             style={{
//                               width: `${(assignedCount / users.length) * 100}%`,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Users list */}
//                     <div className="divide-y divide-gray-50">
//                       {users.map((u, i) => {
//                         const assigned = !!r.assignments?.[u.id];
//                         const toggling =
//                           !!toggleLoadingMap?.[`${r.id}_${u.id}`];

//                         return (
//                           <div
//                             key={u.id}
//                             className={`flex items-center justify-between px-4 py-3 gap-3
//                               transition-colors duration-100
//                               ${assigned ? "bg-blue-50/40" : "bg-white"}`}
//                           >
//                             <div className="flex items-center gap-3 min-w-0">
//                               <Avatar name={u.name} index={i} size="sm" />
//                               <div className="min-w-0">
//                                 <p className="text-sm font-medium text-gray-800 break-words whitespace-normal leading-tight">
//                                   {u.name}
//                                 </p>
//                                 <div className="mt-0.5">
//                                   <RoleBadge role={u.role} />
//                                 </div>
//                               </div>
//                             </div>

//                             <Toggle
//                               assigned={assigned}
//                               toggling={toggling}
//                               onToggle={() =>
//                                 dispatch(
//                                   toggleAssignment({
//                                     type,
//                                     recordId: r.id,
//                                     userId: u.id,
//                                     assigned: !assigned,
//                                   }),
//                                 )
//                               }
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* ========== DESKTOP ========== */}
//         <div className="hidden md:flex h-full flex-col px-6 py-5">
//           <div className="relative flex-1 min-h-0 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
//             {/* Edge fade hints */}
//             <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none data-[left=false]:hidden" />
//             <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none data-[right=false]:hidden" />

//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//                   <span className="text-sm text-gray-400">Loading…</span>
//                 </div>
//               </div>
//             ) : filteredRecords.length === 0 ? (
//               <EmptyState type={type} />
//             ) : (
//               <div
//                 className="flex-1 min-h-0 overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//                 onScroll={(e) => {
//                   const el = e.currentTarget;
//                   el.dataset.left = el.scrollLeft > 10;
//                   el.dataset.right =
//                     el.scrollWidth - el.scrollLeft - el.clientWidth > 10;
//                 }}
//               >
//                 <table className="text-sm border-collapse w-full min-w-max">
//                   <thead className="sticky top-0 z-30 bg-gray-50">
//                     <tr className="bg-gray-50 border-b border-gray-200">
//                       <th className="sticky left-0 z-20 bg-gray-50 px-6 py-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wide min-w-[320px] border-r border-gray-200">
//                         {type} Name
//                       </th>
//                       {users.map((u, i) => (
//                         <th
//                           key={u.id}
//                           className="px-4 py-4 text-center min-w-[150px] font-normal"
//                         >
//                           <div className="flex flex-col items-center gap-1.5">
//                             <Avatar name={u.name} index={i} size="md" />
//                             <span className="text-xs font-semibold text-gray-700 leading-tight">
//                               {u.name}
//                             </span>
//                             <RoleBadge role={u.role} />
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {paginatedRecords.map((r, rowIdx) => {
//                       const assignedCount = Object.values(
//                         r.assignments || {},
//                       ).filter(Boolean).length;
//                       const allAssigned = assignedCount === users.length;
//                       const noneAssigned = assignedCount === 0;

//                       return (
//                         <tr key={r.id} className="group hover:bg-blue-50/30">
//                           <td
//                             style={{ willChange: "transform" }}
//                             className="sticky left-0 z-20 bg-white px-6 py-3.5 border-r border-b border-gray-100 shadow-[2px_0_6px_rgba(0,0,0,0.05)]"
//                           >
//                             <div className="flex items-center justify-between gap-3">
//                               {/* LEFT: Deal Name */}
//                               <div className="flex items-center gap-2 min-w-0">
//                                 <div
//                                   className={`w-1.5 h-1.5 rounded-full shrink-0 ${
//                                     allAssigned
//                                       ? "bg-emerald-400"
//                                       : assignedCount > 0
//                                         ? "bg-amber-400"
//                                         : "bg-gray-200"
//                                   }`}
//                                 />
//                                 <span className="text-gray-800 font-medium break-words whitespace-normal max-w-[320px]">
//                                   {r.name}
//                                 </span>
//                               </div>

//                               {/* RIGHT: ACTION BUTTON */}
//                               <div className="flex items-center gap-1 shrink-0">
//                                 {/* Assign */}
//                                 <button
//                                   disabled={allAssigned}
//                                   onClick={() => {
//                                     users.forEach((u) => {
//                                       const assigned = !!r.assignments?.[u.id];
//                                       if (!assigned) {
//                                         dispatch(
//                                           toggleAssignment({
//                                             type,
//                                             recordId: r.id,
//                                             userId: u.id,
//                                             assigned: true,
//                                           }),
//                                         );
//                                       }
//                                     });
//                                   }}
//                                   className={`text-[11px] px-2 py-1 rounded-md transition
//       ${
//         allAssigned
//           ? "bg-gray-100 text-gray-300 cursor-not-allowed"
//           : "bg-blue-50 text-blue-600 hover:bg-blue-100"
//       }`}
//                                 >
//                                   Assign
//                                 </button>

//                                 {/* Clear */}
//                                 <button
//                                   disabled={noneAssigned}
//                                   onClick={() => {
//                                     users.forEach((u) => {
//                                       const assigned = !!r.assignments?.[u.id];
//                                       if (assigned) {
//                                         dispatch(
//                                           toggleAssignment({
//                                             type,
//                                             recordId: r.id,
//                                             userId: u.id,
//                                             assigned: false,
//                                           }),
//                                         );
//                                       }
//                                     });
//                                   }}
//                                   className={`text-[11px] px-2 py-1 rounded-md transition
//       ${
//         noneAssigned
//           ? "bg-gray-100 text-gray-300 cursor-not-allowed"
//           : "bg-rose-50 text-rose-600 hover:bg-rose-100"
//       }`}
//                                 >
//                                   Clear
//                                 </button>
//                               </div>
//                             </div>
//                           </td>

//                           {users.map((u) => {
//                             const assigned = !!r.assignments?.[u.id];
//                             const toggling =
//                               !!toggleLoadingMap?.[`${r.id}_${u.id}`];

//                             return (
//                               <td
//                                 key={u.id}
//                                 className={`text-center px-2 py-3.5 border-b border-gray-100 bg-white transition-colors duration-100
//                                   ${assigned ? "bg-blue-50/40 group-hover:bg-blue-50/60" : ""}`}
//                               >
//                                 <Toggle
//                                   assigned={assigned}
//                                   toggling={toggling}
//                                   onToggle={() =>
//                                     dispatch(
//                                       toggleAssignment({
//                                         type,
//                                         recordId: r.id,
//                                         userId: u.id,
//                                         assigned: !assigned,
//                                       }),
//                                     )
//                                   }
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//             <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t bg-white">
//               <p className="text-xs text-gray-500">
//                 Page {page} of {totalPages}
//               </p>

//               <select
//                 value={pageSize}
//                 onChange={(e) => {
//                   setPageSize(Number(e.target.value));
//                   setPage(1);
//                 }}
//                 className="text-xs border rounded px-2 py-1 bg-white"
//               >
//                 <option value={5}>5</option>
//                 <option value={8}>8</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select>

//               <input
//                 type="number"
//                 min={1}
//                 max={totalPages || 1}
//                 value={page || 1}
//                 onChange={(e) => {
//                   const val = Number(e.target.value);
//                   if (val >= 1 && val <= totalPages) setPage(val);
//                 }}
//                 className="w-12 text-xs border rounded px-1 py-1"
//               />

//               <div className="flex items-center gap-2">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => p - 1)}
//                   className="px-3 py-1.5 text-xs rounded-lg border bg-white disabled:opacity-40"
//                 >
//                   Prev
//                 </button>

//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => p + 1)}
//                   className="px-3 py-1.5 text-xs rounded-lg border bg-white disabled:opacity-40"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// =============================================================================================================================

// src/components/assign/AssignmentGrid.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleAssignment } from "../../features/assign/assignmentSlice";
import { useState, useCallback, useMemo } from "react";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  { bg: "bg-indigo-500", ring: "ring-indigo-200" },
  { bg: "bg-emerald-500", ring: "ring-emerald-200" },
  { bg: "bg-violet-500", ring: "ring-violet-200" },
  { bg: "bg-amber-500", ring: "ring-amber-200" },
  { bg: "bg-rose-500", ring: "ring-rose-200" },
  { bg: "bg-cyan-500", ring: "ring-cyan-200" },
  { bg: "bg-fuchsia-500", ring: "ring-fuchsia-200" },
  { bg: "bg-teal-500", ring: "ring-teal-200" },
];

const ROLE_CONFIG = {
  SALES_REP: {
    cls: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    label: "Sales Rep",
    dot: "bg-sky-400",
  },
  MANAGER: {
    cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    label: "Manager",
    dot: "bg-amber-400",
  },
  ADMIN: {
    cls: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    label: "Admin",
    dot: "bg-rose-400",
  },
};

// ─── UTILITIES ───────────────────────────────────────────────────────────────

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────

const Avatar = ({ name, index, size = "sm" }) => {
  const { bg, ring } = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  const sz = size === "lg" ? "w-9 h-9 text-xs" : "w-7 h-7 text-[10px]";
  return (
    <div
      className={`${sz} ${bg} rounded-full ring-2 ${ring} flex items-center justify-center shrink-0 shadow-sm`}
    >
      <span className="font-bold text-white leading-none">
        {getInitials(name)}
      </span>
    </div>
  );
};

const RoleBadge = ({ role }) => {
  const cfg = ROLE_CONFIG[role] || {
    cls: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    label: role,
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.cls}`}
    >
      <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const Toggle = ({ assigned, toggling, onToggle }) => (
  <button
    disabled={toggling}
    onClick={onToggle}
    aria-checked={assigned}
    role="switch"
    className={`
      relative inline-flex h-6 w-10 shrink-0 items-center rounded-full
      transition-all duration-200 ease-in-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
      ${assigned ? "bg-indigo-500 shadow-inner" : "bg-gray-200"}
      ${toggling ? "opacity-50 cursor-wait" : "cursor-pointer"}
    `}
  >
    {toggling ? (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </span>
    ) : (
      <span
        className={`
          h-4 w-4 bg-white rounded-full shadow-md
          transition-transform duration-200 ease-in-out will-change-transform
          ${assigned ? "translate-x-[22px]" : "translate-x-[3px]"}
        `}
      />
    )}
  </button>
);

// Coverage bar: shows what % of users are assigned for a record
const CoverageBar = ({ assigned, total }) => {
  const pct = total > 0 ? (assigned / total) * 100 : 0;
  const color =
    pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-indigo-500" : "bg-gray-200";
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="w-14 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] tabular-nums text-gray-400 w-8 text-right">
        {assigned}/{total}
      </span>
    </div>
  );
};

const TAB_CONFIG = [
  {
    key: "deal",
    label: "Deals",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6M5 8h14M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  {
    key: "contact",
    label: "Contacts",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    key: "account",
    label: "Accounts",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0H9"
        />
      </svg>
    ),
  },
];

// Status dot for a record row
const StatusDot = ({ assigned, total }) => {
  if (total === 0)
    return <span className="w-2 h-2 rounded-full bg-gray-200 shrink-0" />;
  if (assigned === total)
    return <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />;
  if (assigned > 0)
    return <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />;
  return <span className="w-2 h-2 rounded-full bg-gray-200 shrink-0" />;
};

// Bulk action row buttons (Assign All / Clear All)
const BulkActions = ({
  allAssigned,
  noneAssigned,
  onAssignAll,
  onClearAll,
}) => (
  <div className="flex items-center gap-1">
    <button
      disabled={allAssigned}
      onClick={onAssignAll}
      title="Assign all users"
      className={`
        inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md
        transition-all duration-150
        ${
          allAssigned
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:scale-95"
        }
      `}
    >
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.78 5.78l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L6.75 9.69l3.97-3.97a.75.75 0 111.06 1.06z" />
      </svg>
      All
    </button>
    <button
      disabled={noneAssigned}
      onClick={onClearAll}
      title="Remove all users"
      className={`
        inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md
        transition-all duration-150
        ${
          noneAssigned
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-95"
        }
      `}
    >
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
      </svg>
      Clear
    </button>
  </div>
);

// ─── STATES ──────────────────────────────────────────────────────────────────

const EmptyState = ({ type, hasSearch }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-8">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 shadow-inner">
      {hasSearch ? (
        <svg
          className="w-7 h-7 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-7 h-7 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"
          />
        </svg>
      )}
    </div>
    <p className="text-sm font-semibold text-gray-600">
      {hasSearch ? "No results found" : `No ${type?.toLowerCase()}s yet`}
    </p>
    <p className="text-xs text-gray-400 mt-1">
      {hasSearch
        ? "Try a different search term"
        : `${type}s will appear here once added`}
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-3">
    <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-gray-400 font-medium">
      Loading access data…
    </span>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse">
    <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
      <div className="h-3.5 w-36 bg-gray-200 rounded-full" />
      <div className="h-2 w-16 bg-gray-100 rounded-full" />
    </div>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center justify-between px-4 py-3 border-b last:border-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gray-200" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-gray-200 rounded-full" />
            <div className="h-2 w-14 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="w-10 h-6 bg-gray-200 rounded-full" />
      </div>
    ))}
  </div>
);

// ─── TOOLBAR ─────────────────────────────────────────────────────────────────

const Toolbar = ({
  type,
  filteredCount,
  totalCount,
  userCount,
  searchTerm,
  setSearchTerm,
  setPage,
  showAssignedOnly,
  setShowAssignedOnly,
}) => {
  const assignedRecordCount = filteredCount; // could be enhanced

  return (
    <div className="px-4 sm:px-6 pt-5 pb-3 border-b border-gray-100 bg-white shrink-0 space-y-3">
      {/* Title row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">
            {type} Access
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
            {filteredCount !== totalCount
              ? `${filteredCount} of ${totalCount} ${type?.toLowerCase()}s`
              : `${totalCount} ${type?.toLowerCase()}${totalCount !== 1 ? "s" : ""}`}
            <span className="mx-1.5 text-gray-200">·</span>
            {userCount} user{userCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Assigned-only toggle */}
        <button
          onClick={() => {
            setShowAssignedOnly((p) => !p);
            setPage(1);
          }}
          className={`
            inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
            border transition-all duration-150 shrink-0
            ${
              showAssignedOnly
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
            }
          `}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.78 5.78l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L6.75 9.69l3.97-3.97a.75.75 0 111.06 1.06z" />
          </svg>
          Assigned only
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder={`Search ${type?.toLowerCase() ?? ""}s…`}
          className="
            w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg
            bg-gray-50 placeholder-gray-400 text-gray-800
            focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white
            outline-none transition-all duration-150
          "
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── PAGINATION ───────────────────────────────────────────────────────────────

const Pagination = ({ page, totalPages, pageSize, setPage, setPageSize }) => (
  <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-gray-100 bg-white">
    <p className="text-[11px] text-gray-400 tabular-nums">
      Page <span className="font-semibold text-gray-600">{page}</span> of{" "}
      {totalPages}
    </p>

    <div className="flex items-center gap-2">
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
        className="text-[11px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-300"
      >
        {[5, 8, 10, 20].map((n) => (
          <option key={n} value={n}>
            {n} / page
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
          className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          title="First page"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M3.5 3.5v9M7.5 8L12 4v8L7.5 8z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          title="Previous page"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          title="Next page"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
          className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          title="Last page"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M12.5 3.5v9M8.5 8L4 4v8l4.5-4z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// ─── MOBILE CARD VIEW ────────────────────────────────────────────────────────

const MobileCard = ({ record, users, toggleLoadingMap, type, dispatch }) => {
  const [expanded, setExpanded] = useState(true);
  const assignedCount = Object.values(record.assignments || {}).filter(
    Boolean,
  ).length;
  const allAssigned = assignedCount === users.length;
  const noneAssigned = assignedCount === 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Card Header */}
      <div
        className="px-4 py-3 flex items-center justify-between gap-3 cursor-pointer select-none"
        onClick={() => setExpanded((p) => !p)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <StatusDot assigned={assignedCount} total={users.length} />
          <span className="text-sm font-semibold text-gray-800 truncate">
            {record.name}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <CoverageBar assigned={assignedCount} total={users.length} />
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Bulk actions bar */}
      {expanded && (
        <div className="px-4 py-2 bg-gray-50 border-t border-b border-gray-100 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
            Users
          </span>
          <BulkActions
            allAssigned={allAssigned}
            noneAssigned={noneAssigned}
            onAssignAll={() =>
              users.forEach((u) => {
                if (!record.assignments?.[u.id])
                  dispatch(
                    toggleAssignment({
                      type,
                      recordId: record.id,
                      userId: u.id,
                      assigned: true,
                    }),
                  );
              })
            }
            onClearAll={() =>
              users.forEach((u) => {
                if (record.assignments?.[u.id])
                  dispatch(
                    toggleAssignment({
                      type,
                      recordId: record.id,
                      userId: u.id,
                      assigned: false,
                    }),
                  );
              })
            }
          />
        </div>
      )}

      {/* Users List */}
      {expanded && (
        <div className="divide-y divide-gray-50">
          {users.map((u, i) => {
            const assigned = !!record.assignments?.[u.id];
            const toggling = !!toggleLoadingMap?.[`${record.id}_${u.id}`];
            return (
              <div
                key={u.id}
                className={`
                  flex items-center justify-between px-4 py-2.5 gap-3
                  transition-colors duration-100
                  ${assigned ? "bg-indigo-50/30" : "bg-white"}
                `}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar name={u.name} index={i} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate leading-tight">
                      {u.name}
                    </p>
                    <div className="mt-0.5">
                      <RoleBadge role={u.role} />
                    </div>
                  </div>
                </div>
                <Toggle
                  assigned={assigned}
                  toggling={toggling}
                  onToggle={() =>
                    dispatch(
                      toggleAssignment({
                        type,
                        recordId: record.id,
                        userId: u.id,
                        assigned: !assigned,
                      }),
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── DESKTOP TABLE VIEW ───────────────────────────────────────────────────────

const DesktopTable = ({ records, users, toggleLoadingMap, type, dispatch }) => (
  <div className="flex-1 min-h-0 overflow-auto scroll-smooth">
    <table className="text-sm border-collapse w-full min-w-max">
      <thead className="sticky top-0 z-20">
        <tr>
          {/* Sticky name column header */}
          <th className="sticky left-0 z-30 bg-gray-50 border-b border-r border-gray-200 px-5 py-3 text-left">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Name
            </span>
          </th>
          {/* User column headers */}
          {users.map((u, i) => (
            <th
              key={u.id}
              className="bg-gray-50 border-b border-gray-200 px-3 py-2.5 text-center min-w-[130px]"
            >
              <div className="flex flex-col items-center gap-1.5">
                <Avatar name={u.name} index={i} size="lg" />
                <span className="text-xs font-semibold text-gray-700 leading-tight max-w-[100px] truncate">
                  {u.name}
                </span>
                <RoleBadge role={u.role} />
              </div>
            </th>
          ))}
          {/* Coverage summary column */}
          <th className="bg-gray-50 border-b border-gray-200 px-3 py-3 text-center min-w-[100px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Coverage
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => {
          const assignedCount = Object.values(r.assignments || {}).filter(
            Boolean,
          ).length;
          const allAssigned = assignedCount === users.length;
          const noneAssigned = assignedCount === 0;

          return (
            <tr
              key={r.id}
              className="group hover:bg-indigo-50/20 transition-colors duration-100"
            >
              {/* Sticky record name cell */}
              <td
                className="sticky left-0 z-10 bg-white px-5 py-3 border-b border-r border-gray-100
                  group-hover:bg-indigo-50/20 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.08)]
                  transition-colors duration-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <StatusDot assigned={assignedCount} total={users.length} />
                    <span
                      className="text-sm font-medium text-gray-800 max-w-[280px] truncate"
                      title={r.name}
                    >
                      {r.name}
                    </span>
                  </div>
                  {/* Bulk action buttons — show on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <BulkActions
                      allAssigned={allAssigned}
                      noneAssigned={noneAssigned}
                      onAssignAll={() =>
                        users.forEach((u) => {
                          if (!r.assignments?.[u.id])
                            dispatch(
                              toggleAssignment({
                                type,
                                recordId: r.id,
                                userId: u.id,
                                assigned: true,
                              }),
                            );
                        })
                      }
                      onClearAll={() =>
                        users.forEach((u) => {
                          if (r.assignments?.[u.id])
                            dispatch(
                              toggleAssignment({
                                type,
                                recordId: r.id,
                                userId: u.id,
                                assigned: false,
                              }),
                            );
                        })
                      }
                    />
                  </div>
                </div>
              </td>

              {/* Per-user toggle cells */}
              {users.map((u) => {
                const assigned = !!r.assignments?.[u.id];
                const toggling = !!toggleLoadingMap?.[`${r.id}_${u.id}`];
                return (
                  <td
                    key={u.id}
                    className={`
                      text-center px-3 py-3 border-b border-gray-100
                      transition-colors duration-100
                      ${assigned ? "bg-indigo-50/40 group-hover:bg-indigo-50/60" : ""}
                    `}
                  >
                    <Toggle
                      assigned={assigned}
                      toggling={toggling}
                      onToggle={() =>
                        dispatch(
                          toggleAssignment({
                            type,
                            recordId: r.id,
                            userId: u.id,
                            assigned: !assigned,
                          }),
                        )
                      }
                    />
                  </td>
                );
              })}

              {/* Coverage cell */}
              <td className="text-center px-3 py-3 border-b border-gray-100">
                <div className="flex justify-center">
                  <CoverageBar assigned={assignedCount} total={users.length} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function AssignmentGrid({ type }) {
  const dispatch = useDispatch();

  const {
    users = [],
    records = [],
    loading = false,
    toggleLoadingMap = {},
  } = useSelector((state) => state.assignment) || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [showAssignedOnly, setShowAssignedOnly] = useState(false);

  const filteredRecords = useMemo(() => {
    return (
      records
        // 🔍 Search filter
        .filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()))

        // 🚫 Always remove deactivated (FIXED)
        .filter((r) => r.lifecycle?.toLowerCase() !== "deactivated")

        // ✅ Assigned-only filter (FIXED — only valid visible users)
        .filter((r) => {
          if (!showAssignedOnly) return true;

          return users.some((u) => r.assignments?.[u.id]);
        })
    );
  }, [records, searchTerm, showAssignedOnly, users]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedRecords = useMemo(
    () => filteredRecords.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredRecords, safePage, pageSize],
  );

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* ─── TOOLBAR ─── */}
      <Toolbar
        type={type}
        filteredCount={filteredRecords.length}
        totalCount={records.length}
        userCount={users.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
        showAssignedOnly={showAssignedOnly}
        setShowAssignedOnly={setShowAssignedOnly}
      />

      {/* ─── BODY ─── */}
      <div className="flex-1 min-h-0">
        {/* ── MOBILE (< md) ── */}
        <div className="md:hidden flex flex-col h-full">
          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-4 space-y-3 pb-4">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : paginatedRecords.length === 0 ? (
                <EmptyState
                  type={type}
                  hasSearch={!!searchTerm || showAssignedOnly}
                />
              ) : (
                paginatedRecords.map((r) => (
                  <MobileCard
                    key={r.id}
                    record={r}
                    users={users}
                    toggleLoadingMap={toggleLoadingMap}
                    type={type}
                    dispatch={dispatch}
                  />
                ))
              )}
            </div>
          </div>

          {/* ✅ MOBILE PAGINATION (added only here) */}
          <div className="border-t bg-white">
            <Pagination
              page={safePage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </div>
        </div>

        {/* ── DESKTOP (≥ md) ── */}
        <div className="hidden md:flex h-full flex-col px-5 py-4">
          <div className="relative flex-1 min-h-0 rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            {loading ? (
              <LoadingState />
            ) : paginatedRecords.length === 0 ? (
              <EmptyState
                type={type}
                hasSearch={!!searchTerm || showAssignedOnly}
              />
            ) : (
              <DesktopTable
                records={paginatedRecords}
                users={users}
                toggleLoadingMap={toggleLoadingMap}
                type={type}
                dispatch={dispatch}
              />
            )}

            {/* Pagination (UNCHANGED) */}
            <Pagination
              page={safePage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
