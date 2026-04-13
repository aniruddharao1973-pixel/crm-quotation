// src/features/accounts/AccountDetail.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchAccount, clearCurrentAccount } from "./accountSlice";
import { formatCurrency, formatLabel, formatDate } from "../../constants";
import Spinner from "../../components/Spinner";
import Avatar from "../../components/Avatar";
import {
  BuildingOffice2Icon,
  PencilSquareIcon,
  PhoneIcon,
  GlobeAltIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  BriefcaseIcon,
  ChartBarIcon,
  StarIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

// ── Helper Components ──

const SectionCard = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  noPadding = false,
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm shadow-[#3B2E7E]/5 border border-[#3B2E7E]/10 overflow-hidden ${className}`}
  >
    {(title || action) && (
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#3B2E7E]/10 bg-gradient-to-r from-[#3B2E7E]/5 to-white">
        <div>
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    )}
    <div className={noPadding ? "" : "p-6"}>{children}</div>
  </div>
);

const InfoItem = ({
  icon: Icon,
  label,
  value,
  isLink,
  href,
  external,
  iconBg = "bg-[#3B2E7E]/10",
  iconColor = "text-[#3B2E7E]",
}) => {
  if (!value || value === "—") return null;

  const content = (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[#3B2E7E]/5 transition-all duration-200">
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
          {label}
        </p>
        {isLink ? (
          <span className="text-sm font-semibold text-[#3B2E7E] hover:text-[#2A1F5C] flex items-center gap-1.5 transition-colors">
            {value}
            {external && <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />}
          </span>
        ) : (
          <p className="text-sm font-semibold text-slate-800 truncate">
            {value}
          </p>
        )}
      </div>
    </div>
  );

  if (isLink && href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    ) : (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

const StatCard = ({ icon: Icon, label, value, variant = "primary" }) => {
  const variants = {
    primary: "from-[#3B2E7E] to-[#2A1F5C] shadow-[#3B2E7E]/30",
    secondary: "from-[#4A3A8C] to-[#3B2E7E] shadow-[#3B2E7E]/30",
    tertiary: "from-[#5A4A9C] to-[#4A3A8C] shadow-[#3B2E7E]/30",
    quaternary: "from-[#6A5AAC] to-[#5A4A9C] shadow-[#3B2E7E]/30",
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-[#3B2E7E]/10 hover:shadow-lg hover:shadow-[#3B2E7E]/10 transition-all duration-300">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${variants[variant]} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-2xl font-bold text-slate-800 truncate">
        {value || "—"}
      </p>
      <p className="text-xs font-medium text-slate-500 mt-1">{label}</p>
    </div>
  );
};

const DealCard = ({ deal }) => {
  const getStageStyles = (stage) => {
    const styles = {
      qualification: {
        bg: "bg-sky-100",
        text: "text-sky-700",
        dot: "bg-sky-500",
      },
      proposal: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        dot: "bg-amber-500",
      },
      negotiation: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        dot: "bg-purple-500",
      },
      closed_won: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
      },
      closed_lost: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        dot: "bg-rose-500",
      },
    };
    return (
      styles[stage] || {
        bg: "bg-slate-100",
        text: "text-slate-700",
        dot: "bg-slate-500",
      }
    );
  };

  const stageStyles = getStageStyles(deal.stage);

  return (
    <Link
      to={`/deals/${deal.id}`}
      className="group block p-5 rounded-xl bg-gradient-to-br from-[#3B2E7E]/5 to-white border border-[#3B2E7E]/10 hover:border-[#3B2E7E]/30 hover:shadow-lg hover:shadow-[#3B2E7E]/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3B2E7E]/30">
            <CurrencyDollarIcon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 pt-1">
            <p className="text-sm font-bold text-slate-800 truncate group-hover:text-[#3B2E7E] transition-colors">
              {deal.dealName}
            </p>
            <p className="text-xs text-slate-500 mt-1">{deal.owner?.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${stageStyles.bg} ${stageStyles.text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${stageStyles.dot}`}
                ></span>
                {formatLabel(deal.stage)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-slate-800">
            {formatCurrency(deal.amount)}
          </p>
          <div className="flex items-center gap-1 mt-1 text-slate-400 group-hover:text-[#3B2E7E] transition-colors">
            <span className="text-xs font-medium">View</span>
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const ContactCard = ({ contact }) => (
  <Link
    to={`/contacts/${contact.id}`}
    className="group flex items-center gap-4 p-4 rounded-xl border border-[#3B2E7E]/10 hover:border-[#3B2E7E]/30 hover:shadow-lg hover:shadow-[#3B2E7E]/10 hover:bg-[#3B2E7E]/5 transition-all duration-300"
  >
    <div className="relative">
      <Avatar
        name={contact.firstName}
        secondName={contact.lastName}
        size="md"
        image={contact.image}
        className="!rounded-xl"
      />
      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-bold text-slate-800 truncate group-hover:text-[#3B2E7E] transition-colors">
        {contact.firstName} {contact.lastName || ""}
      </p>
      <p className="text-xs text-slate-500 truncate mt-0.5">
        {contact.email || contact.title || "—"}
      </p>
    </div>
    <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-[#3B2E7E] group-hover:translate-x-1 transition-all flex-shrink-0" />
  </Link>
);

const AddressCard = ({ title, icon: Icon, address, variant = "primary" }) => {
  const variants = {
    primary: "from-[#3B2E7E] to-[#2A1F5C] shadow-[#3B2E7E]/30",
    secondary: "from-emerald-500 to-emerald-600 shadow-emerald-200/50",
  };

  if (!address) return null;

  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-[#3B2E7E]/5 to-purple-50/50 border border-[#3B2E7E]/10">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${variants[variant]} flex items-center justify-center flex-shrink-0 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-xs font-semibold text-[#3B2E7E] uppercase tracking-wide mb-2">
          {title}
        </p>
        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          {address}
        </p>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#3B2E7E] hover:text-[#2A1F5C] mt-2 transition-colors"
        >
          View on Map
          <ArrowTopRightOnSquareIcon className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, action, onAction }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B2E7E]/10 to-purple-100 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-[#3B2E7E]" />
    </div>
    <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
    {action && (
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B2E7E] hover:text-[#2A1F5C] mt-3 transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        {action}
      </button>
    )}
  </div>
);

// ── Main Component ──

const AccountDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, detailLoading } = useSelector((s) => s.accounts);

  useEffect(() => {
    dispatch(fetchAccount(id));
    return () => dispatch(clearCurrentAccount());
  }, [dispatch, id]);

  if (detailLoading || !account) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-sm text-slate-500 mt-4">
            Loading account details...
          </p>
        </div>
      </div>
    );
  }

  const billingAddress = [
    account.billingStreet,
    account.billingCity,
    account.billingState,
    account.billingPincode,
    account.billingCountry,
  ]
    .filter(Boolean)
    .join(", ");

  // const shippingAddress = [
  //   account.shippingStreet,
  //   account.shippingCity,
  //   account.shippingState,
  //   account.shippingPincode,
  //   account.shippingCountry,
  // ]
  //   .filter(Boolean)
  //   .join(", ");

  const totalDealsValue =
    account.deals?.reduce((sum, deal) => sum + (deal.amount || 0), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            to="/accounts"
            className="flex items-center gap-2 text-slate-500 hover:text-[#3B2E7E] transition-colors font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Accounts
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-slate-300" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px]">
            {account.accountName}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-[#3B2E7E]/10 transition-colors text-slate-500 hover:text-[#3B2E7E]">
            <ShareIcon className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-[#3B2E7E]/10 transition-colors text-slate-500 hover:text-amber-500">
            <StarIcon className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-[#3B2E7E]/10 transition-colors text-slate-500 hover:text-[#3B2E7E]">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative bg-gradient-to-b from-[#3B2E7E] to-[#2A1F5C] rounded-3xl p-8 mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 w-20 h-20 border border-white/10 rounded-full"></div>
        <div className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-6 left-1/4 w-16 h-16 border border-white/5 rounded-full"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="ring-4 ring-white/20 rounded-2xl p-1 bg-white/10 backdrop-blur-sm">
                {account.image ? (
                  <img
                    src={account.image}
                    alt={account.accountName}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <BuildingOffice2Icon className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-400 rounded-lg border-3 border-[#2A1F5C] flex items-center justify-center shadow-lg">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {account.accountName}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {account.accountNumber && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-sm font-mono text-white/90 backdrop-blur-sm border border-white/10">
                    #{account.accountNumber}
                  </span>
                )}
                {account.industry && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/10">
                    <ChartBarIcon className="w-4 h-4" />
                    {account.industry}
                  </span>
                )}
              </div>
              {account.owner?.name && (
                <p className="text-purple-200 text-sm mt-3 flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4" />
                  Owned by {account.owner.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {account.phone && (
              <a
                href={`tel:${account.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10"
              >
                <PhoneIcon className="w-4 h-4" />
                Call
              </a>
            )}
            {account.website && (
              <a
                href={
                  account.website.startsWith("http")
                    ? account.website
                    : `https://${account.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10"
              >
                <GlobeAltIcon className="w-4 h-4" />
                Website
              </a>
            )}
            {account.lifecycle !== "DEACTIVATED" && (
              <button
                onClick={() => navigate(`/accounts/${id}/edit`)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#3B2E7E] text-sm font-semibold rounded-xl hover:bg-purple-50 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#2A1F5C]/30"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit Account
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={PhoneIcon}
          label="Phone"
          value={account.phone || "—"}
          variant="primary"
        />
        <StatCard
          icon={GlobeAltIcon}
          label="Website"
          value={
            account.website ? account.website.replace(/^https?:\/\//, "") : "—"
          }
          variant="secondary"
        />
        <StatCard
          icon={UserGroupIcon}
          label="Employees"
          value={account.employees?.toLocaleString("en-IN") || "—"}
          variant="tertiary"
        />
        <StatCard
          icon={CurrencyRupeeIcon}
          label="Annual Revenue"
          value={formatCurrency(account.annualRevenue) || "—"}
          variant="quaternary"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Account Information */}
          <SectionCard
            title="Account Information"
            subtitle="Basic account details and classification"
            noPadding
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#3B2E7E]/10">
              <div className="p-2">
                <InfoItem
                  icon={BriefcaseIcon}
                  label="Account Type"
                  value={formatLabel(account.accountType)}
                  iconBg="bg-rose-100"
                  iconColor="text-rose-600"
                />
                <InfoItem
                  icon={ChartBarIcon}
                  label="Industry"
                  value={account.industry}
                  iconBg="bg-emerald-100"
                  iconColor="text-emerald-600"
                />
                <InfoItem
                  icon={StarIcon}
                  label="Rating"
                  value={account.rating}
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                />
              </div>
              <div className="p-2">
                <InfoItem
                  icon={BuildingOfficeIcon}
                  label="Ownership"
                  value={account.ownership}
                  iconBg="bg-sky-100"
                  iconColor="text-sky-600"
                />
                {account.parentAccount && (
                  <InfoItem
                    icon={LinkIcon}
                    label="Parent Account"
                    value={account.parentAccount.accountName}
                    isLink
                    href={`/accounts/${account.parentAccount.id}`}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                  />
                )}
                {account.website && (
                  <InfoItem
                    icon={GlobeAltIcon}
                    label="Website"
                    value={account.website}
                    isLink
                    href={
                      account.website.startsWith("http")
                        ? account.website
                        : `https://${account.website}`
                    }
                    external
                    iconBg="bg-[#3B2E7E]/10"
                    iconColor="text-[#3B2E7E]"
                  />
                )}
              </div>
            </div>
          </SectionCard>

          {/* Addresses */}
          {billingAddress && (
            <SectionCard
              title="Addresses"
              subtitle="Account address"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AddressCard
                  title="Address"
                  icon={MapPinIcon}
                  address={billingAddress}
                  variant="primary"
                />
                {/* <AddressCard
                  title="Shipping Address"
                  icon={MapPinIcon}
                  address={shippingAddress}
                  variant="secondary"
                /> */}
              </div>
            </SectionCard>
          )}

          {/* Description */}
          {account.description && (
            <SectionCard
              title="Description"
              subtitle="Additional notes and details"
            >
              <div className="prose prose-sm prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {account.description}
                </p>
              </div>
            </SectionCard>
          )}

          {/* Deals */}
          <SectionCard
            title="Associated Deals"
            subtitle={`${account.deals?.length || 0} deals worth ${formatCurrency(totalDealsValue)}`}
            action={
              <button
                onClick={() => navigate(`/deals/new?accountId=${id}`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B2E7E] to-[#2A1F5C] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3B2E7E]/30 transition-all duration-200"
              >
                <PlusIcon className="w-4 h-4" />
                New Deal
              </button>
            }
          >
            {account.deals?.length > 0 ? (
              <div className="space-y-4">
                {account.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CurrencyDollarIcon}
                title="No deals associated yet"
                action="Create first deal"
                onAction={() => navigate(`/deals/new?accountId=${id}`)}
              />
            )}
          </SectionCard>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm shadow-[#3B2E7E]/5 border border-[#3B2E7E]/10 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {account.phone && (
                <a
                  href={`tel:${account.phone}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-emerald-50 transition-all duration-200 group border border-transparent hover:border-emerald-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                    <PhoneIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      Call Account
                    </p>
                    <p className="text-xs text-slate-500">{account.phone}</p>
                  </div>
                </a>
              )}
              {account.website && (
                <a
                  href={
                    account.website.startsWith("http")
                      ? account.website
                      : `https://${account.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-sky-50 transition-all duration-200 group border border-transparent hover:border-sky-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-200/50">
                    <GlobeAltIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                      Visit Website
                    </p>
                    <p className="text-xs text-slate-500 truncate max-w-[150px]">
                      {account.website.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </a>
              )}
              <button
                onClick={() => navigate(`/contacts/new?accountId=${id}`)}
                className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-purple-50 transition-all duration-200 group border border-transparent hover:border-purple-100 w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] flex items-center justify-center shadow-lg shadow-[#3B2E7E]/30">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#3B2E7E] transition-colors">
                    Add Contact
                  </p>
                  <p className="text-xs text-slate-500">Create new contact</p>
                </div>
              </button>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] rounded-2xl p-5 text-white shadow-xl shadow-[#3B2E7E]/30 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-200">
                Contacts ({account.contacts?.length || 0})
              </h3>
              <button
                onClick={() => navigate(`/contacts/new?accountId=${id}`)}
                className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-purple-200 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="relative space-y-2">
              {account.contacts?.length > 0 ? (
                <>
                  {account.contacts.slice(0, 4).map((contact) => (
                    <Link
                      key={contact.id}
                      to={`/contacts/${contact.id}`}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10"
                    >
                      <Avatar
                        name={contact.firstName}
                        secondName={contact.lastName}
                        size="sm"
                        image={contact.image}
                        className="!rounded-lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">
                          {contact.firstName} {contact.lastName || ""}
                        </p>
                        <p className="text-xs text-purple-200 truncate">
                          {contact.email || contact.title || "—"}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-4 h-4 text-purple-200 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                  {account.contacts.length > 4 && (
                    <Link
                      to={`/contacts?accountId=${id}`}
                      className="block text-center py-2 text-sm font-medium text-purple-200 hover:text-white transition-colors"
                    >
                      View all {account.contacts.length} contacts
                    </Link>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <UserGroupIcon className="w-10 h-10 text-purple-300/50 mx-auto mb-2" />
                  <p className="text-xs text-purple-200">No contacts yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Child Accounts */}
          {account.childAccounts?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm shadow-[#3B2E7E]/5 border border-[#3B2E7E]/10 p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Child Accounts ({account.childAccounts.length})
              </h3>
              <div className="space-y-2">
                {account.childAccounts.map((child) => (
                  <Link
                    key={child.id}
                    to={`/accounts/${child.id}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-[#3B2E7E]/10 hover:border-[#3B2E7E]/30 hover:shadow-lg hover:shadow-[#3B2E7E]/10 hover:bg-[#3B2E7E]/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B2E7E]/20 to-purple-100 flex items-center justify-center">
                      <BuildingOfficeIcon className="w-5 h-5 text-[#3B2E7E]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-[#3B2E7E] transition-colors flex-1 truncate">
                      {child.accountName}
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-[#3B2E7E] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Timeline / Audit Info */}
          <div className="bg-white rounded-2xl shadow-sm shadow-[#3B2E7E]/5 border border-[#3B2E7E]/10 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Activity Timeline
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-[#3B2E7E] via-[#3B2E7E]/30 to-transparent"></div>

              <div className="space-y-6">
                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B2E7E] to-[#2A1F5C] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3B2E7E]/30 z-10">
                    <CalendarDaysIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Created
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatDate(account.createdAt)}
                    </p>
                    {account.createdBy?.name && (
                      <p className="text-xs text-slate-400 mt-1">
                        by {account.createdBy.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200/50 z-10">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Last Modified
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatDate(account.updatedAt)}
                    </p>
                    {account.modifiedBy?.name && (
                      <p className="text-xs text-slate-400 mt-1">
                        by {account.modifiedBy.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account ID Badge */}
          <div className="bg-gradient-to-r from-[#3B2E7E]/5 to-purple-50 rounded-2xl p-4 border border-[#3B2E7E]/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3B2E7E]">
                Account ID
              </span>
              <code className="text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-[#3B2E7E]/10 shadow-sm">
                {account.id}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
