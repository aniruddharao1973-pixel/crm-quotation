// // src/features/quotations/QuotationDetailsSection.jsx

// export default function QuotationDetailsSection({
//   form,
//   updateField,
//   accounts,
//   deals,
//   contacts,
// }) {
//   return (
//     <div className="rounded-2xl border bg-white p-5 space-y-4">
//       <h2 className="text-base font-semibold text-slate-800">
//         Quotation Details
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

//         {/* ACCOUNT */}
//         <select
//           value={form.accountId}
//           onChange={(e) => updateField("accountId", e.target.value)}
//           className="w-full rounded-xl border px-3 py-2 text-sm"
//         >
//           <option value="">Select Account</option>
//           {accounts.map((a) => (
//             <option key={a.id} value={a.id}>
//               {a.accountName}
//             </option>
//           ))}
//         </select>

//         {/* DEAL */}
//         <select
//           value={form.dealId}
//           onChange={(e) => updateField("dealId", e.target.value)}
//           className="w-full rounded-xl border px-3 py-2 text-sm"
//         >
//           <option value="">Select Deal</option>
//           {deals.map((d) => (
//             <option key={d.id} value={d.id}>
//               {d.dealName}
//             </option>
//           ))}
//         </select>

//         {/* CONTACT MULTI */}
//         <div className="border rounded-xl p-2 max-h-32 overflow-auto">
//           {contacts.map((c) => (
//             <label key={c.id} className="flex gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={form.contactIds.includes(c.id)}
//                 onChange={() => {
//                   const exists = form.contactIds.includes(c.id);
//                   updateField(
//                     "contactIds",
//                     exists
//                       ? form.contactIds.filter((x) => x !== c.id)
//                       : [...form.contactIds, c.id]
//                   );
//                 }}
//               />
//               {`${c.firstName || ""} ${c.lastName || ""}`.trim() || c.email}
//             </label>
//           ))}
//         </div>

//         {/* ISSUE DATE */}
//         <input
//           type="date"
//           value={form.date}
//           onChange={(e) => updateField("date", e.target.value)}
//           className="w-full rounded-xl border px-3 py-2 text-sm"
//         />

//         {/* VALID UNTIL */}
//         <input
//           type="date"
//           value={form.validUntil}
//           onChange={(e) => updateField("validUntil", e.target.value)}
//           className="w-full rounded-xl border px-3 py-2 text-sm"
//         />
//       </div>
//     </div>
//   );
// }

// src/features/quotations/QuotationDetailsSection.jsx

import { useMemo, useState } from "react";
import {
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  BadgeCheck,
  Search,
  X,
  ChevronsUpDown,
  Sparkles,
} from "lucide-react";

function Field({ label, hint, children, icon: Icon, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {Icon ? <Icon className="h-3.5 w-3.5 text-slate-400" /> : null}
          {label}
        </label>
        {hint ? (
          <span className="text-[11px] text-slate-400">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    indigo: "border-indigo-100 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tones[tone] || tones.slate}`}
    >
      {children}
    </span>
  );
}

function InputShell({ children, active = false }) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white shadow-sm transition",
        active
          ? "border-indigo-300 ring-4 ring-indigo-500/10"
          : "border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function QuotationDetailsSection({
  form,
  updateField,
  accounts,
  deals,
  contacts,
}) {
  const [contactSearch, setContactSearch] = useState("");

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === form.accountId),
    [accounts, form.accountId],
  );

  const filteredContacts = useMemo(() => {
    const q = contactSearch.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter((c) => {
      const fullName = `${c.firstName || ""} ${c.lastName || ""}`
        .trim()
        .toLowerCase();
      const email = (c.email || "").toLowerCase();
      return fullName.includes(q) || email.includes(q);
    });
  }, [contacts, contactSearch]);

  const selectedContactsCount = form.contactIds?.length || 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/40 px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              Quotation Details
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              Header information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select account, project, contacts, and validity dates for this
              quotation.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-2">
            <Pill tone={form.accountId ? "emerald" : "amber"}>
              {form.accountId ? "Account selected" : "Account pending"}
            </Pill>
            <Pill tone={form.dealId ? "indigo" : "slate"}>
              {form.dealId ? "Deal selected" : "Deal pending"}
            </Pill>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* ACCOUNT */}
          <Field
            label="Account"
            hint={
              selectedAccount?.accountName ? "Selected company" : "Required"
            }
            icon={Building2}
          >
            <InputShell active={Boolean(form.accountId)}>
              <div className="relative">
                <select
                  value={form.accountId}
                  onChange={(e) => updateField("accountId", e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-transparent px-4 py-3.5 pr-11 text-sm text-slate-900 outline-none"
                >
                  <option value="">Select Account</option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.accountName}
                    </option>
                  ))}
                </select>
                <ChevronsUpDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </InputShell>
          </Field>

          {/* DEAL */}
          <Field
            label="Deal / Project"
            hint={
              form.accountId
                ? `${deals.length} available`
                : "Select account first"
            }
            icon={BriefcaseBusiness}
          >
            <InputShell active={Boolean(form.dealId)}>
              <div className="relative">
                <select
                  value={form.dealId}
                  onChange={(e) => updateField("dealId", e.target.value)}
                  disabled={!form.accountId}
                  className="w-full appearance-none rounded-2xl bg-transparent px-4 py-3.5 pr-11 text-sm text-slate-900 outline-none disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  <option value="">
                    {form.accountId ? "Select Deal" : "Select account first"}
                  </option>
                  {deals.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.dealName}
                    </option>
                  ))}
                </select>
                <ChevronsUpDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </InputShell>
          </Field>

          {/* ISSUE DATE */}
          <Field
            label="Issue Date"
            hint="Quotation start date"
            icon={CalendarDays}
          >
            <InputShell active>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full rounded-2xl bg-transparent px-4 py-3.5 text-sm text-slate-900 outline-none"
              />
            </InputShell>
          </Field>

          {/* VALID UNTIL */}
          <Field
            label="Valid Until"
            hint="Optional expiry date"
            icon={BadgeCheck}
          >
            <InputShell active={Boolean(form.validUntil)}>
              <input
                type="date"
                value={form.validUntil}
                onChange={(e) => updateField("validUntil", e.target.value)}
                className="w-full rounded-2xl bg-transparent px-4 py-3.5 text-sm text-slate-900 outline-none"
              />
            </InputShell>
          </Field>
        </div>

        {/* CONTACTS */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Contacts
                </h3>
                <Pill tone={selectedContactsCount ? "indigo" : "slate"}>
                  {selectedContactsCount} selected
                </Pill>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Pick one or more recipients linked to the selected account.
              </p>
            </div>

            <div className="w-full lg:max-w-sm">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                />
                {contactSearch ? (
                  <button
                    type="button"
                    onClick={() => setContactSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Clear contact search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-4 max-h-60 overflow-auto rounded-2xl border border-slate-200 bg-white">
            {!form.accountId ? (
              <div className="p-4 text-sm text-slate-500">
                Select an account to load related contacts.
              </div>
            ) : filteredContacts.length ? (
              <div className="divide-y divide-slate-100">
                {filteredContacts.map((c) => {
                  const id = c.id;
                  const checked = form.contactIds.includes(id);
                  const displayName =
                    `${c.firstName || ""} ${c.lastName || ""}`.trim() ||
                    c.email ||
                    "Unnamed contact";

                  return (
                    <label
                      key={id}
                      className="flex cursor-pointer items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const exists = form.contactIds.includes(id);
                          updateField(
                            "contactIds",
                            exists
                              ? form.contactIds.filter((x) => x !== id)
                              : [...form.contactIds, id],
                          );
                        }}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-semibold text-slate-800">
                            {displayName}
                          </span>
                          {checked ? (
                            <Pill tone="emerald">Selected</Pill>
                          ) : null}
                        </div>
                        {c.email ? (
                          <div className="mt-0.5 truncate text-sm text-slate-500">
                            {c.email}
                          </div>
                        ) : null}
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-sm text-slate-500">
                No contacts match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
