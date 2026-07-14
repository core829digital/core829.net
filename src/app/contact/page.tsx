"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAction, useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SERVICES } from "@/lib/brand";
import { getSessionToken } from "@/lib/cookie";

const STEPS = ["What", "Details", "Contact"];

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
  { value: "not-sure", label: "Not sure yet" },
];

const COUNTRY_CODES = [
  { code: "+1", label: "US / CA" },
  { code: "+44", label: "UK" },
  { code: "+49", label: "Germany" },
  { code: "+33", label: "France" },
  { code: "+39", label: "Italy" },
  { code: "+34", label: "Spain" },
  { code: "+31", label: "Netherlands" },
  { code: "+48", label: "Poland" },
  { code: "+353", label: "Ireland" },
  { code: "+41", label: "Switzerland" },
  { code: "+43", label: "Austria" },
  { code: "+45", label: "Denmark" },
  { code: "+46", label: "Sweden" },
  { code: "+47", label: "Norway" },
  { code: "+358", label: "Finland" },
  { code: "+351", label: "Portugal" },
  { code: "+30", label: "Greece" },
  { code: "+61", label: "Australia" },
  { code: "+64", label: "New Zealand" },
  { code: "+81", label: "Japan" },
  { code: "+86", label: "China" },
  { code: "+91", label: "India" },
  { code: "+971", label: "UAE" },
  { code: "+27", label: "South Africa" },
];

type Errors = Partial<Record<string, string>>;

export default function ContactPage() {
  const convex = useConvex();
  const [step, setStep] = useState(0);
  const [sessionUser, setSessionUser] = useState<{ userId: string; role: string; name: string; email: string } | null>(null);
  const [form, setForm] = useState({
    serviceInterest: "",
    projectType: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    phone: "",
    phoneCountryCode: "+49",
    clientType: "company" as "company" | "private" | "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const submitContact = useAction(api.contact.submit);

  useEffect(() => {
    const token = getSessionToken();
    if (token) {
      convex.query(api.auth.validateSession, { token }).then((session) => {
        if (session) {
          setSessionUser(session);
          setForm((f) => ({
            ...f,
            name: session.name,
            email: session.email,
          }));
        }
      }).catch(() => {
        // Session validation failed silently — user not logged in
      });
    }
  }, [convex]);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const setClientType = (val: "company" | "private") => {
    setForm((f) => ({ ...f, clientType: val }));
  };

  const validateStep = (s: number): boolean => {
    const errs: Errors = {};
    if (s === 0 && !form.serviceInterest) errs.serviceInterest = "Select a service";
    if (s === 1) {
      const phone = form.phone;
      if (phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(phone)) errs.phone = "Invalid phone number";
    }
    if (s === 2) {
      if (!form.name.trim()) errs.name = "Name is required";
      if (!form.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canProceed = () => {
    if (step === 0) return !!form.serviceInterest;
    if (step === 1) return true;
    if (step === 2) return form.name.length > 0 && form.email.length > 0;
    return false;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const phoneVal = form.phone || undefined;
      const phoneCodeVal = phoneVal ? form.phoneCountryCode : undefined;
      await submitContact({
        userId: sessionUser?.userId as import("../../../convex/_generated/dataModel").Id<"users"> | undefined,
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        phone: phoneVal,
        phoneCountryCode: phoneCodeVal,
        clientType: (form.clientType || undefined) as "company" | "private" | undefined,
        serviceInterest: form.serviceInterest,
        budget: form.budget || undefined,
        timeline: form.timeline || undefined,
        message: form.message || undefined,
        projectType: form.projectType || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="pt-40 min-h-dvh flex items-center">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-6 md:col-start-4 text-center">
            <span className="font-mono text-signal text-xs uppercase tracking-[0.2em]">Sent</span>
            <h1 className="text-display text-4xl md:text-6xl tracking-tight mt-4">
              Thanks for reaching out.
            </h1>
            <p className="mt-6 text-ink/60 leading-relaxed">
              We&apos;ll review your project and get back to you within 1–2 business days.
            </p>
            {sessionUser && (
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center mt-8 px-6 py-3 bg-signal text-ink text-sm font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
              >
                View dashboard
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 min-h-dvh">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <span className="font-mono text-signal text-xs uppercase tracking-[0.2em]">
            Step {step + 1} of {STEPS.length}
          </span>
          <h1 className="text-display text-4xl md:text-6xl tracking-tight mt-4">
            {step === 0 && "What do you need built?"}
            {step === 1 && "Tell us more."}
            {step === 2 && "Who are you?"}
          </h1>

          <div className="flex gap-2 mt-8 mb-12">
            {STEPS.map((label, i) => (
              <button
                key={label}
                onClick={() => i < step && setStep(i)}
                className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                  i === step
                    ? "bg-signal text-ink"
                    : i < step
                      ? "bg-white/10 text-ink/60"
                      : "bg-white/5 text-ink/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-wrap gap-3">
                {SERVICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { update("serviceInterest", opt.value); setErrors((e) => ({ ...e, serviceInterest: "" })); }}
                    className={`px-5 py-3 text-sm rounded-full border transition-all ${
                      form.serviceInterest === opt.value
                        ? "bg-signal text-ink border-signal"
                        : "border-mist text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                {errors.serviceInterest && (
                  <p className="w-full text-xs text-red-400 font-mono mt-1">{errors.serviceInterest}</p>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-3">I am a...</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClientType("company")}
                      className={`flex-1 px-4 py-3 text-sm rounded-full border transition-all ${
                        form.clientType === "company"
                          ? "bg-signal text-ink border-signal"
                          : "border-mist text-ink/70 hover:border-ink/30"
                      }`}
                    >
                      Company
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType("private")}
                      className={`flex-1 px-4 py-3 text-sm rounded-full border transition-all ${
                        form.clientType === "private"
                          ? "bg-signal text-ink border-signal"
                          : "border-mist text-ink/70 hover:border-ink/30"
                      }`}
                    >
                      Private individual
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-project-type" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Project type</label>
                  <input
                    id="contact-project-type"
                    type="text"
                    value={form.projectType}
                    onChange={(e) => update("projectType", e.target.value)}
                    placeholder="e.g. MVP, redesign, full platform"
                    className="w-full bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Phone</label>
                  <div className="flex gap-2 items-end">
                    <select
                      value={form.phoneCountryCode}
                      onChange={(e) => update("phoneCountryCode", e.target.value)}
                      className="bg-transparent border-b border-mist py-3 text-sm text-ink outline-none focus:border-signal transition-colors shrink-0 max-w-[7rem]"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                      ))}
                    </select>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      placeholder="Your number"
                      className="flex-1 bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 font-mono mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-budget" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Budget range</label>
                  <input
                    id="contact-budget"
                    type="text"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    placeholder="e.g. $5k–$10k"
                    className="w-full bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-timeline" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Timeline</label>
                  <input
                    id="contact-timeline"
                    type="text"
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    placeholder="e.g. 4 weeks, 2 months"
                    className="w-full bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className={`w-full bg-transparent border-b py-3 text-ink placeholder:text-ink/20 outline-none transition-colors ${
                      touched.name && errors.name ? "border-red-400" : "border-mist focus:border-signal"
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 font-mono mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={`w-full bg-transparent border-b py-3 text-ink placeholder:text-ink/20 outline-none transition-colors ${
                      touched.email && errors.email ? "border-red-400" : "border-mist focus:border-signal"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 font-mono mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="w-full bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={4}
                    className="w-full bg-transparent border-b border-mist py-3 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors resize-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="mt-8 text-sm text-red-400 font-mono leading-relaxed">{error}</p>
          )}

          <div className="flex justify-between mt-12">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-sm font-mono uppercase tracking-wider text-ink/50 hover:text-ink transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 2 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-3 bg-signal text-ink text-sm font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="px-6 py-3 bg-signal text-ink text-sm font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
