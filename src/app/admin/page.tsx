"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  form_type: "general-inquiry" | "partnership-request" | null;
  subject?: string | null;
  business_name?: string | null;
  service?: string | null;
  location?: string | null;
  website?: string | null;
  monthly_budget?: string | null;
  current_marketing?: string | null;
  timeline?: string | null;
  additional_services?: string[] | null;
};

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<"applications" | "leads">("applications");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("admin_pin") : null;
    if (saved) {
      setPin(saved);
      unlock(saved);
    }
  }, []);

  async function unlock(tryPin: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { "x-admin-pin": tryPin },
      });
      if (!res.ok) {
        setError("Wrong PIN");
        localStorage.removeItem("admin_pin");
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setLeads(json.leads || []);
      setAuthed(true);
      localStorage.setItem("admin_pin", tryPin);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("admin_pin");
    setAuthed(false);
    setPin("");
    setLeads([]);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            unlock(pin);
          }}
          className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-xl font-semibold text-zinc-900">Admin</h1>
          <p className="mt-1 text-sm text-zinc-500">Enter PIN to continue.</p>
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
            className="mt-4 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-center text-lg tracking-widest shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="••••"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || pin.length === 0}
            className="mt-4 w-full rounded-lg bg-[#0080FE] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0070E0] disabled:opacity-50"
          >
            {loading ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  const applications = leads.filter((l) => l.form_type === "partnership-request");
  const generalLeads = leads.filter((l) => l.form_type !== "partnership-request");
  const rows = tab === "applications" ? applications : generalLeads;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-zinc-900">Admin</h1>
          <button
            onClick={logout}
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            Logout
          </button>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-4 px-6">
          <button
            onClick={() => setTab("applications")}
            className={`border-b-2 px-2 py-3 text-sm font-medium ${
              tab === "applications"
                ? "border-[#0080FE] text-[#0080FE]"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            }`}
          >
            Applications <span className="ml-1 text-xs text-zinc-400">({applications.length})</span>
          </button>
          <button
            onClick={() => setTab("leads")}
            className={`border-b-2 px-2 py-3 text-sm font-medium ${
              tab === "leads"
                ? "border-[#0080FE] text-[#0080FE]"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            }`}
          >
            Leads <span className="ml-1 text-xs text-zinc-400">({generalLeads.length})</span>
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {rows.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
            Nothing here yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-zinc-900">
                      {r.name}
                      {r.business_name && (
                        <span className="ml-2 text-sm font-normal text-zinc-500">
                          — {r.business_name}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-sm text-zinc-600">
                      <a className="text-[#0080FE] hover:underline" href={`mailto:${r.email}`}>{r.email}</a>
                      {r.phone && (
                        <>
                          <span className="mx-2 text-zinc-300">·</span>
                          <a className="hover:underline" href={`tel:${r.phone}`}>{r.phone}</a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {new Date(r.created_at).toLocaleString()}
                  </div>
                </div>

                {tab === "applications" && (
                  <div className="mt-3 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                    {r.service && <Field label="Business type" value={r.service} />}
                    {r.location && <Field label="Service area" value={r.location} />}
                    {r.monthly_budget && <Field label="Monthly budget" value={formatBudget(r.monthly_budget)} />}
                    {r.timeline && <Field label="Timeline" value={r.timeline} />}
                    {r.current_marketing && <Field label="Current marketing" value={r.current_marketing} />}
                    {r.website && <Field label="Website" value={r.website} />}
                    {r.additional_services && r.additional_services.length > 0 && (
                      <Field label="Services needed" value={r.additional_services.join(", ")} />
                    )}
                  </div>
                )}

                {tab === "leads" && r.subject && (
                  <div className="mt-3 text-sm text-zinc-700">
                    <span className="font-medium text-zinc-500">Subject:</span> {r.subject}
                  </div>
                )}

                {r.message && (
                  <div className="mt-3 whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 text-sm text-zinc-800">
                    {r.message}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-wide text-zinc-500">{label}</span>
      <div className="text-sm text-zinc-900">{value}</div>
    </div>
  );
}

function formatBudget(val: string): string {
  const map: Record<string, string> = {
    "under-1000": "Under $1,000",
    "1000-2500": "$1,000 - $2,500",
    "2500-5000": "$2,500 - $5,000",
    "5000-10000": "$5,000 - $10,000",
    "10000+": "$10,000+",
  };
  return map[val] || val;
}
