// // src\features\dashboard\Dashboard.jsx
// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchDashboardAnalytics,
//   fetchDealsByStage,
//   fetchMonthlyTrend,
//   fetchTopPerformers,
//   fetchDealsBySource,
//   fetchDealMomentum,
// } from "../analytics/analyticsSlice";
// import InfoTooltip from "../deals/InfoTooltip";
// import DealMomentumInfo from "../deals/DealMomentumInfo";

// import Spinner from "../../components/Spinner";
// import StatCard from "./components/StatCard";
// import StageChart from "./components/StageChart";
// import MonthlyTrendChart from "./components/MonthlyTrendChart";
// import TopPerformers from "./components/TopPerformers";
// import DealsClosingSoon from "./components/DealsClosingSoon";
// import WinRateGauge from "./components/WinRateGauge";
// import LeadSourceChart from "./components/LeadSourceChart";

// import {
//   BuildingOffice2Icon,
//   UserGroupIcon,
//   ClipboardDocumentListIcon,
//   TrophyIcon,
//   ChartBarIcon,
//   ArrowTrendingUpIcon,
// } from "@heroicons/react/24/outline";
// import DealRiskPanel from "../analytics/DealRiskPanel";

// const LiveTime = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const sync = () => {
//       setTime(new Date());
//       setTimeout(sync, 1000 - (Date.now() % 1000));
//     };
//     const t = setTimeout(sync, 1000 - (Date.now() % 1000));
//     return () => clearTimeout(t);
//   }, []);

//   const pad = (n) => String(n).padStart(2, "0");
//   const h = time.getHours();
//   const h12 = pad(h % 12 || 12);
//   const ampm = h >= 12 ? "PM" : "AM";
//   const m = pad(time.getMinutes());

//   return { h12, ampm, m };
// };

// const DateTimeWidget = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const sync = () => {
//       setTime(new Date());
//       setTimeout(sync, 1000 - (Date.now() % 1000));
//     };
//     const t = setTimeout(sync, 1000 - (Date.now() % 1000));
//     return () => clearTimeout(t);
//   }, []);

//   const pad = (n) => String(n).padStart(2, "0");
//   const h = time.getHours();
//   const h12 = pad(h % 12 || 12);
//   const ampm = h >= 12 ? "PM" : "AM";
//   const m = pad(time.getMinutes());
//   const day = time.toLocaleDateString("en-IN", { weekday: "long" });
//   const dateFull = time.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="hidden sm:flex flex-col items-end gap-0.5 pl-5 border-l-2 border-indigo-500">
//       <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">
//         {day}
//       </span>
//       <div className="flex items-baseline gap-1">
//         <span className="text-[26px] font-semibold text-gray-900 tabular-nums tracking-tight leading-none">
//           {h12}:{m}
//         </span>
//         <span className="text-[12px] font-semibold text-indigo-500">
//           {ampm}
//         </span>
//       </div>
//       <span className="text-[12px] text-gray-400">{dateFull}</span>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const hasFetched = useRef(false);

//   const {
//     dashboard,
//     dealsByStage,
//     monthlyTrend,
//     topPerformers,
//     dealsBySource,
//     dealMomentum,
//     dashboardLoading,
//   } = useSelector((s) => s.analytics);

//   useEffect(() => {
//     if (!hasFetched.current) {
//       hasFetched.current = true;
//       dispatch(fetchDashboardAnalytics());
//       dispatch(fetchDealsByStage());
//       dispatch(fetchMonthlyTrend(6));
//       dispatch(fetchTopPerformers(5));
//       dispatch(fetchDealsBySource());
//       dispatch(fetchDealMomentum());
//     }
//   }, [dispatch]);

//   if (dashboardLoading && !dashboard) {
//     return <Spinner className="py-20" size="lg" />;
//   }

//   const summary = dashboard?.summary || {};
//   const performance = dashboard?.performance || {};

//   return (
//     <div className="space-y-6 sm:space-y-7 lg:space-y-8">
//       {/* ── Page Header ── */}
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
//             Overview
//           </p>
//           <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
//             Dashboard
//           </h1>
//           <p className="text-sm text-gray-400 mt-1">
//             Your CRM activity and performance at a glance.
//           </p>
//         </div>
//         <DateTimeWidget />
//       </div>

//       {/* ── Primary Stat Cards ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           title="Total Deals"
//           value={summary.totalDeals || 0}
//           subtitle="All deals"
//           icon={ClipboardDocumentListIcon}
//           color="blue"
//           onClick={() => navigate("/deals")}
//         />
//         <StatCard
//           title="Open Deals"
//           value={summary.openDeals || 0}
//           subtitle="Active deals"
//           icon={ChartBarIcon}
//           color="purple"
//           onClick={() => navigate("/deals")}
//         />
//         <StatCard
//           title="Closed Deals"
//           value={summary.closedDeals || 0}
//           subtitle="Completed deals"
//           icon={TrophyIcon}
//           color="green"
//           onClick={() => navigate("/deals?stage=CLOSED_WON")}
//         />
//         <StatCard
//           title="This Month"
//           value={summary.thisMonthDeals || 0}
//           subtitle="New deals created"
//           icon={ArrowTrendingUpIcon}
//           color="amber"
//         />
//       </div>

//       {/* ── Secondary Stat Cards ── */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           {
//             value: summary.totalAccounts || 0,
//             label: "Accounts",
//             icon: BuildingOffice2Icon,
//             iconBg: "bg-blue-50",
//             iconColor: "text-blue-500",
//             onClick: () => navigate("/accounts"),
//             clickable: true,
//           },
//           {
//             value: summary.totalContacts || 0,
//             label: "Contacts",
//             icon: UserGroupIcon,
//             iconBg: "bg-violet-50",
//             iconColor: "text-violet-500",
//             onClick: () => navigate("/contacts"),
//             clickable: true,
//           },
//           {
//             value: performance.wonDeals || 0,
//             label: "Won Deals",
//             icon: TrophyIcon,
//             iconBg: "bg-emerald-50",
//             iconColor: "text-emerald-500",
//             clickable: false,
//           },
//           {
//             value: `${performance.winRate || 0}%`,
//             label: "Win Rate",
//             icon: ChartBarIcon,
//             iconBg: "bg-amber-50",
//             iconColor: "text-amber-500",
//             clickable: false,
//           },
//         ].map(
//           ({
//             value,
//             label,
//             icon: Icon,
//             iconBg,
//             iconColor,
//             onClick,
//             clickable,
//           }) => (
//             <div
//               key={label}
//               onClick={clickable ? onClick : undefined}
//               className={`bg-white border border-gray-200 rounded-2xl px-4 py-4 sm:px-5 shadow-sm transition-all duration-200 ${
//                 clickable
//                   ? "cursor-pointer hover:shadow-md hover:border-gray-300"
//                   : ""
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-9 h-9 sm:w-10 sm:h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
//                 >
//                   <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
//                 </div>
//                 <div>
//                   <p className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums leading-tight">
//                     {value}
//                   </p>
//                   <p className="text-xs text-gray-400 font-medium mt-0.5">
//                     {label}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ),
//         )}
//       </div>

//       {/* ── Deal Momentum Panel ── */}
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-visible">
//         {/* Panel header */}
//         <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
//               <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//                 <path
//                   d="M9 2L3 9h5l-1 5 6-7H8l1-5z"
//                   fill="white"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest leading-none mb-0.5">
//                 Prioritized
//               </p>
//               <h2 className="text-sm font-semibold text-gray-900 leading-none">
//                 Deal Momentum
//               </h2>
//             </div>
//           </div>
//           <span className="text-xs text-gray-400 font-medium hidden sm:block">
//             Focus on these first
//           </span>
//         </div>

//         {/* Deal rows */}
//         <div className="divide-y divide-gray-50">
//           {dealMomentum?.slice(0, 5).map((deal, idx) => (
//             <div
//               key={deal.dealId}
//               onClick={() => navigate(`/deals/${deal.dealId}`)}
//               className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-gray-50/70 transition-colors duration-150 cursor-pointer group"
//             >
//               {/* Rank */}
//               <span
//                 className={`text-xs font-bold w-4 text-center flex-shrink-0 ${
//                   idx === 0 ? "text-indigo-600" : "text-gray-300"
//                 }`}
//               >
//                 {idx + 1}
//               </span>

//               {/* Deal info */}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-gray-800 truncate leading-tight group-hover:text-gray-900 transition-colors">
//                   {deal.dealName}
//                 </p>
//                 <div className="flex items-center gap-1.5 mt-1 flex-wrap">
//                   <span className="text-[11px] text-gray-400">
//                     {deal.account}
//                   </span>
//                   <span className="text-gray-200">·</span>
//                   <span
//                     className={`text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none ${
//                       idx === 0
//                         ? "bg-indigo-50 text-indigo-600"
//                         : idx === 1
//                           ? "bg-violet-50 text-violet-500"
//                           : "bg-gray-100 text-gray-500"
//                     }`}
//                   >
//                     {deal.stage.replace(/_/g, " ")}
//                   </span>
//                 </div>
//               </div>

//               {/* Score + tooltip */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <div className="flex flex-col items-end">
//                   <span
//                     className={`text-base font-bold leading-none ${
//                       idx === 0 ? "text-indigo-600" : "text-gray-400"
//                     }`}
//                   >
//                     {deal.momentumScore}
//                   </span>
//                   <span className="text-[10px] text-gray-400 leading-none text-right mt-0.5">
//                     {deal.reason}
//                   </span>
//                 </div>
//                 <InfoTooltip
//                   position="right"
//                   content={<DealMomentumInfo deal={deal} />}
//                 />
//               </div>
//             </div>
//           ))}

//           {!dealMomentum?.length && (
//             <div className="py-12 text-center">
//               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
//                 <ChartBarIcon className="w-5 h-5 text-gray-400" />
//               </div>
//               <p className="text-sm text-gray-400 font-medium">
//                 No priority deals found
//               </p>
//               <p className="text-xs text-gray-300 mt-1">
//                 Check back once deals are active
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Charts Row 1: Trend + Win Rate ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div className="lg:col-span-2">
//           <MonthlyTrendChart data={monthlyTrend} />
//         </div>
//         <div>
//           <WinRateGauge
//             winRate={performance.winRate || 0}
//             wonDeals={performance.wonDeals || 0}
//             lostDeals={performance.lostDeals || 0}
//             openDeals={summary.openDeals || 0}
//           />
//         </div>
//       </div>

//       {/* ── Charts Row 2: Stage + Lead Source ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         <StageChart data={dealsByStage} />
//         <LeadSourceChart data={dealsBySource} />
//       </div>

//       {/* ── Bottom Row ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         <DealsClosingSoon deals={dashboard?.dealsClosingThisMonth || []} />
//         <TopPerformers data={topPerformers} />
//         <DealRiskPanel level="HIGH" />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src\features\dashboard\Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchDashboardAnalytics,
  fetchDealsByStage,
  fetchMonthlyTrend,
  fetchTopPerformers,
  fetchDealsBySource,
  fetchDealMomentum,
} from "../analytics/analyticsSlice";
import InfoTooltip from "../deals/InfoTooltip";
import DealMomentumInfo from "../deals/DealMomentumInfo";

import Spinner from "../../components/Spinner";
import StatCard from "./components/StatCard";
import StageChart from "./components/StageChart";
import MonthlyTrendChart from "./components/MonthlyTrendChart";
import TopPerformers from "./components/TopPerformers";
import DealsClosingSoon from "./components/DealsClosingSoon";
import WinRateGauge from "./components/WinRateGauge";
import LeadSourceChart from "./components/LeadSourceChart";

import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import DealRiskPanel from "../analytics/DealRiskPanel";

/* ─────────────────────────────────────────
   DateTimeWidget — Design D (no seconds)
───────────────────────────────────────── */
const DateTimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const sync = () => {
      setTime(new Date());
      setTimeout(sync, 1000 - (Date.now() % 1000));
    };
    const t = setTimeout(sync, 1000 - (Date.now() % 1000));
    return () => clearTimeout(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const h = time.getHours();
  const h12 = pad(h % 12 || 12);
  const ampm = h >= 12 ? "PM" : "AM";
  const m = pad(time.getMinutes());
  const day = time.toLocaleDateString("en-IN", { weekday: "long" });
  const dateFull = time.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="hidden sm:flex flex-col items-end gap-0.5 pl-4 border-l-2 border-indigo-500 shrink-0">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
        {day}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-[26px] font-bold text-gray-900 tabular-nums tracking-tight leading-none">
          {h12}:{m}
        </span>
        <span className="text-[12px] font-bold text-indigo-500">{ampm}</span>
      </div>
      <span className="text-[11px] text-gray-400 font-medium">{dateFull}</span>
    </div>
  );
};

/* ─────────────────────────────────────────
   Mini secondary stat card
───────────────────────────────────────── */
const MiniStatCard = ({
  value,
  label,
  icon: Icon,
  iconBg,
  iconColor,
  onClick,
  clickable,
}) => (
  <div
    onClick={clickable ? onClick : undefined}
    className={`
      group relative bg-white border border-gray-100 rounded-2xl px-4 py-4 sm:px-5 sm:py-4
      transition-all duration-200 overflow-hidden
      ${clickable ? "cursor-pointer hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50/60" : ""}
    `}
  >
    {/* subtle hover tint */}
    {clickable && (
      <div className="absolute inset-0 bg-indigo-50/0 group-hover:bg-indigo-50/30 transition-colors duration-200 rounded-2xl pointer-events-none" />
    )}
    <div className="relative flex items-center gap-3">
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums leading-tight">
          {value}
        </p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Section header helper
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-0.5">
    {children}
  </p>
);

/* ─────────────────────────────────────────
   Dashboard
───────────────────────────────────────── */
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const {
    dashboard,
    dealsByStage,
    monthlyTrend,
    topPerformers,
    dealsBySource,
    dealMomentum,
    dashboardLoading,
  } = useSelector((s) => s.analytics);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchDashboardAnalytics());
      dispatch(fetchDealsByStage());
      dispatch(fetchMonthlyTrend(6));
      dispatch(fetchTopPerformers(5));
      dispatch(fetchDealsBySource());
      dispatch(fetchDealMomentum());
    }
  }, [dispatch]);

  if (dashboardLoading && !dashboard) {
    return <Spinner className="py-20" size="lg" />;
  }

  const summary = dashboard?.summary || {};
  const performance = dashboard?.performance || {};

  return (
    <div className="space-y-7 sm:space-y-8">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
            Overview
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Your CRM activity and performance at a glance.
          </p>
        </div>
        <DateTimeWidget />
      </div>

      {/* ── Primary Stat Cards ── */}
      <div>
        <SectionLabel>Key Metrics</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total Deals"
            value={summary.totalDeals || 0}
            subtitle="All deals"
            icon={ClipboardDocumentListIcon}
            color="blue"
            onClick={() => navigate("/deals")}
          />
          <StatCard
            title="Open Deals"
            value={summary.openDeals || 0}
            subtitle="Active deals"
            icon={ChartBarIcon}
            color="purple"
            onClick={() => navigate("/deals")}
          />
          <StatCard
            title="Closed Deals"
            value={summary.closedDeals || 0}
            subtitle="Completed deals"
            icon={TrophyIcon}
            color="green"
            onClick={() => navigate("/deals?stage=CLOSED_WON")}
          />
          <StatCard
            title="This Month"
            value={summary.thisMonthDeals || 0}
            subtitle="New deals created"
            icon={ArrowTrendingUpIcon}
            color="amber"
          />
        </div>
      </div>

      {/* ── Secondary Stat Cards ── */}
      <div>
        <SectionLabel>At a Glance</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              value: summary.totalAccounts || 0,
              label: "Accounts",
              icon: BuildingOffice2Icon,
              iconBg: "bg-blue-50",
              iconColor: "text-blue-500",
              onClick: () => navigate("/accounts"),
              clickable: true,
            },
            {
              value: summary.totalContacts || 0,
              label: "Contacts",
              icon: UserGroupIcon,
              iconBg: "bg-violet-50",
              iconColor: "text-violet-500",
              onClick: () => navigate("/contacts"),
              clickable: true,
            },
            {
              value: performance.wonDeals || 0,
              label: "Won Deals",
              icon: TrophyIcon,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-500",
              clickable: false,
            },
            {
              value: `${performance.winRate || 0}%`,
              label: "Win Rate",
              icon: ChartBarIcon,
              iconBg: "bg-amber-50",
              iconColor: "text-amber-500",
              clickable: false,
            },
          ].map((props) => (
            <MiniStatCard key={props.label} {...props} />
          ))}
        </div>
      </div>

      {/* ── Deal Momentum Panel ── */}
      <div>
        <SectionLabel>Priority Queue</SectionLabel>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/80 overflow-visible">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-200">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M9 2L3 9h5l-1 5 6-7H8l1-5z"
                    fill="white"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-0.5">
                  Prioritized
                </p>
                <h2 className="text-sm font-bold text-gray-900 leading-none">
                  Deal Momentum
                </h2>
              </div>
            </div>
            <span className="text-xs text-gray-300 font-medium hidden sm:block">
              Focus on these first
            </span>
          </div>

          {/* Deal rows */}
          <div className="divide-y divide-gray-50/80">
            {dealMomentum?.slice(0, 5).map((deal, idx) => (
              <div
                key={deal.dealId}
                onClick={() => navigate(`/deals/${deal.dealId}`)}
                className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-gray-50/60 transition-colors duration-150 cursor-pointer group"
              >
                {/* Rank bubble */}
                <div
                  className={`
                  w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold
                  ${
                    idx === 0
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
                >
                  {idx + 1}
                </div>

                {/* Deal info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate leading-tight group-hover:text-gray-900 transition-colors">
                    {deal.dealName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-[11px] text-gray-400">
                      {deal.account}
                    </span>
                    <span className="text-gray-200">·</span>
                    <span
                      className={`
                      text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none
                      ${
                        idx === 0
                          ? "bg-indigo-50 text-indigo-600"
                          : idx === 1
                            ? "bg-violet-50 text-violet-500"
                            : "bg-gray-100 text-gray-500"
                      }
                    `}
                    >
                      {deal.stage.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Score + tooltip */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <span
                      className={`
                      text-base font-bold leading-none tabular-nums
                      ${idx === 0 ? "text-indigo-600" : "text-gray-400"}
                    `}
                    >
                      {deal.momentumScore}
                    </span>
                    <span className="text-[10px] text-gray-400 leading-none text-right mt-0.5">
                      {deal.reason}
                    </span>
                  </div>
                  <InfoTooltip
                    position="right"
                    content={<DealMomentumInfo deal={deal} />}
                  />
                </div>
              </div>
            ))}

            {!dealMomentum?.length && (
              <div className="py-14 text-center">
                <div className="w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-sm text-gray-400 font-semibold">
                  No priority deals found
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Check back once deals are active
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Charts Row 1: Trend + Win Rate ── */}
      <div>
        <SectionLabel>Performance</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2">
            <MonthlyTrendChart data={monthlyTrend} />
          </div>
          <div>
            <WinRateGauge
              winRate={performance.winRate || 0}
              wonDeals={performance.wonDeals || 0}
              lostDeals={performance.lostDeals || 0}
              openDeals={summary.openDeals || 0}
            />
          </div>
        </div>
      </div>

      {/* ── Charts Row 2: Stage + Lead Source ── */}
      <div>
        <SectionLabel>Pipeline Breakdown</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <StageChart data={dealsByStage} />
          <LeadSourceChart data={dealsBySource} />
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div>
        <SectionLabel>Activity &amp; Risk</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <DealsClosingSoon deals={dashboard?.dealsClosingThisMonth || []} />
          <TopPerformers data={topPerformers} />
          <DealRiskPanel level="HIGH" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
