import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Camera,
  Upload,
  ChevronRight,
  MapPin,
  Stethoscope,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Info,
  Github,
  Mail,
} from "lucide-react";

/**
 * CURESCAN — High-trust Medical AI Skin Analysis (Frontend)
 * --------------------------------------------------------
 * Tech: React + Tailwind CSS
 * Notes:
 * - This is a frontend-only demo.
 * - The API integration is a placeholder (see analyzeWithApi()).
 * - No medical claims are made; footer disclaimer included.
 */

// Brand palette
const BRAND = {
  blue: "#0056b3",
  blueSoft: "#0b74ff",
  gray: "#f3f5f7",
};

const RISK = {
  LOW: "low",
  MODERATE: "moderate",
  HIGH: "high",
};

const riskStyles = {
  [RISK.LOW]: {
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    badge: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle2,
    label: "Low risk",
    desc: "Informational screening result. Continue basic care and routine monitoring.",
  },
  [RISK.MODERATE]: {
    ring: "ring-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-900",
    badge: "bg-amber-100 text-amber-900",
    icon: AlertTriangle,
    label: "Moderate risk",
    desc: "Monitor closely and consult a clinician if it changes or persists.",
  },
  [RISK.HIGH]: {
    ring: "ring-rose-200",
    bg: "bg-rose-50",
    text: "text-rose-900",
    badge: "bg-rose-100 text-rose-900",
    icon: AlertTriangle,
    label: "High risk",
    desc: "Seek urgent medical attention. Do not delay professional evaluation.",
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useStickyShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function Container({ children, className = "" }) {
  return (
    <div className={classNames("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={classNames("scroll-mt-28 py-14 sm:py-16", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
      <Icon className="h-4 w-4" style={{ color: BRAND.blue }} />
      {children}
    </span>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm",
        "transition active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-200",
        className
      )}
      style={{ backgroundColor: BRAND.blue }}
      {...props}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm",
        "transition hover:bg-slate-50 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, tone = "neutral" }) {
  const styles =
    tone === "blue"
      ? "bg-blue-50 text-blue-800 border-blue-100"
      : "bg-slate-50 text-slate-700 border-slate-200";
  return <span className={classNames("rounded-full border px-3 py-1 text-xs font-semibold", styles)}>{children}</span>;
}

function Step({ index, title, desc, icon: Icon }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(0,86,179,0.08)" }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" style={{ color: BRAND.blue }} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {index}</span>
            <Badge tone="blue">Fast</Badge>
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function RiskCard({ risk, title, summary, bullets = [] }) {
  const styles = riskStyles[risk];
  const Icon = styles.icon;

  return (
    <div className={classNames("rounded-3xl p-6 ring-1", styles.bg, styles.ring)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={classNames("flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70")}
            aria-hidden="true"
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className={classNames("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", styles.badge)}>
              {styles.label}
            </div>
            <h4 className={classNames("mt-2 text-base font-extrabold", styles.text)}>{title}</h4>
          </div>
        </div>
      </div>

      <p className={classNames("mt-3 text-sm leading-relaxed", styles.text)}>{summary}</p>

      {bullets.length > 0 ? (
        <ul className={classNames("mt-4 space-y-2 text-sm", styles.text)}>
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MapPlaceholder({ clinics = [] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" style={{ color: BRAND.blue }} />
          <p className="text-sm font-bold text-slate-900">Nearby Clinics (Placeholder Map)</p>
        </div>
        <Badge>Government / Free care</Badge>
      </div>
      <div className="relative">
        <div className="h-64 w-full bg-gradient-to-br from-slate-50 to-slate-100" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="max-w-md rounded-3xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Map integration goes here</p>
            <p className="mt-1 text-xs text-slate-600">Connect Google Maps / Mapbox and list nearby free clinics.</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {clinics.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{c.name}</p>
                  <p className="mt-1 text-xs text-slate-600">{c.address}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                  {c.distance}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InputLabel({ children }) {
  return <label className="text-sm font-semibold text-slate-900">{children}</label>;
}

function Select({ value, onChange, options = [], placeholder = "Select…" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function RadioGroup({ value, onChange, options = [] }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={classNames(
            "rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm",
            "transition focus:outline-none focus:ring-4 focus:ring-blue-200",
            value === o.value ? "border-blue-200 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function TextInput({ value, onChange, placeholder = "", type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
    />
  );
}

function ProgressDots({ step = 1, total = 3 }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i + 1 <= step;
        return (
          <span
            key={i}
            className={classNames(
              "h-2.5 w-2.5 rounded-full",
              active ? "bg-blue-600" : "bg-slate-200"
            )}
            style={active ? { backgroundColor: BRAND.blue } : undefined}
          />
        );
      })}
    </div>
  );
}

async function analyzeWithApi({ file, intake }) {
  /**
   * Placeholder for a real API call (Skinive, Med-Gemma, custom model, etc.)
   * Flow:
   *  1) Upload image to backend or directly to vendor endpoint
   *  2) Receive model response
   *  3) Map response to UI risk levels
   */

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1200));

  // Demo logic: lightly vary based on symptoms/duration for believable UI testing
  const duration = (intake.duration || "").toLowerCase();
  const symptoms = intake.symptoms;

  let risk = RISK.LOW;
  if (symptoms === "bleeding") risk = RISK.HIGH;
  else if (symptoms === "itching") risk = RISK.MODERATE;

  if (duration.includes("month") || duration.includes("months") || duration.includes("year")) {
    risk = risk === RISK.LOW ? RISK.MODERATE : risk;
  }

  const differential = risk === RISK.HIGH
    ? ["Suspicious lesion pattern", "Recent changes / irritation"]
    : risk === RISK.MODERATE
    ? ["Inflammatory rash or dermatitis", "Benign mole with irritation"]
    : ["Benign appearance", "Dryness / mild irritation"];

  return {
    risk,
    confidence: risk === RISK.LOW ? 0.78 : risk === RISK.MODERATE ? 0.72 : 0.66,
    summary:
      risk === RISK.HIGH
        ? "Screening flags a higher concern. Please seek medical attention soon."
        : risk === RISK.MODERATE
        ? "Screening suggests moderate concern. Monitor closely and consult if worsening."
        : "Screening suggests low concern. Continue observation and basic care.",
    recommendations:
      risk === RISK.HIGH
        ? [
            "Visit the nearest clinic/dermatologist within 24–48 hours",
            "Avoid scratching or applying unknown topical products",
            "If fever, severe pain, or rapid spread occurs: emergency care",
          ]
        : risk === RISK.MODERATE
        ? [
            "Take a clear photo in good lighting weekly for monitoring",
            "Consult a clinician if changes occur or symptoms persist",
            "Use gentle skincare and avoid irritants",
          ]
        : [
            "Maintain hygiene and moisturize if dry",
            "Recheck if changes occur",
            "Use sun protection on exposed skin",
          ],
    differential,
    model: "API placeholder",
  };
}

export default function CureScanApp() {
  const scrolled = useStickyShadow();

  // Intake
  const [bodyPart, setBodyPart] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [formStep, setFormStep] = useState(1);

  // Upload
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Analysis
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const intakeComplete = useMemo(() => {
    return Boolean(bodyPart && symptoms && duration);
  }, [bodyPart, symptoms, duration]);

  const canAnalyze = useMemo(() => {
    return Boolean(file && intakeComplete && !loading);
  }, [file, intakeComplete, loading]);

  const clinics = useMemo(
    () => [
      {
        name: "Primary Health Centre",
        address: "Govt. Clinic, Sector 7",
        distance: "1.2 km",
        tags: ["Free OPD", "Dermatology referrals"],
      },
      {
        name: "Community Health Centre",
        address: "Main Road, Ward 12",
        distance: "2.8 km",
        tags: ["Low-cost care", "Walk-in"],
      },
      {
        name: "Government Hospital",
        address: "District Hospital Campus",
        distance: "5.4 km",
        tags: ["24/7", "Emergency"],
      },
      {
        name: "NGO Skin Camp (Weekly)",
        address: "Civic Hall, Sunday 10 AM",
        distance: "3.7 km",
        tags: ["Free", "Awareness"],
      },
    ],
    []
  );

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function resetAll() {
    setBodyPart("");
    setSymptoms("");
    setDuration("");
    setFormStep(1);
    setFile(null);
    setPreviewUrl("");
    setLoading(false);
    setResult(null);
    setError("");
  }

  function handlePickFile() {
    fileInputRef.current?.click();
  }

  function handleOpenCamera() {
    cameraInputRef.current?.click();
  }

  function onFileSelected(f) {
    if (!f) return;
    if (!f.type?.startsWith("image/")) {
      setError("Please upload a valid image file (JPG/PNG/HEIC).");
      return;
    }
    setError("");
    setResult(null);
    setFile(f);
  }

  async function runAnalysis() {
    if (!canAnalyze) return;
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeWithApi({
        file,
        intake: { bodyPart, symptoms, duration },
      });
      setResult(res);
    } catch (e) {
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const nav = [
    { label: "How it Works", href: "#how" },
    { label: "Our Mission", href: "#mission" },
    { label: "Get Help", href: "#help" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky Header */}
      <header
        className={classNames(
          "sticky top-0 z-50 w-full border-b",
          scrolled ? "border-slate-200 bg-white/90 backdrop-blur shadow-sm" : "border-transparent bg-white"
        )}
        aria-label="Primary navigation"
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-3" aria-label="CURESCAN Home">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(0,86,179,0.10)" }}
              >
                <ShieldCheck className="h-5 w-5" style={{ color: BRAND.blue }} />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-black tracking-tight">CURESCAN</p>
                <p className="text-[11px] font-semibold text-slate-500">Skin Screening for Social Welfare</p>
              </div>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#triage"
                className="ml-2 inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-bold text-white shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-200"
                style={{ backgroundColor: BRAND.blue }}
              >
                Start Check
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </nav>

            <a
              href="#triage"
              className="md:hidden inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-bold text-white shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200"
              style={{ backgroundColor: BRAND.blue }}
            >
              Start
            </a>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <main id="top">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(0,86,179,0.10)" }}
            />
            <div className="absolute -bottom-40 right-0 h-[380px] w-[380px] rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(0,86,179,0.06)" }}
            />
          </div>

          <Section className="pt-10 sm:pt-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Pill icon={HeartHandshake}>Social Welfare Mission</Pill>
                  <Pill icon={Sparkles}>AI-powered screening</Pill>
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  Accessible Skin Health for Everyone.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  CURESCAN is a modern, high-trust skin screening web app designed to help people quickly understand when a mark or rash may need professional attention.
                  Upload an image, answer a few quick questions, and receive a color-coded screening summary.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton onClick={() => document.querySelector("#triage")?.scrollIntoView({ behavior: "smooth" })}>
                    <Stethoscope className="h-5 w-5" />
                    Start a Skin Check
                  </PrimaryButton>
                  <SecondaryButton onClick={() => document.querySelector("#mission")?.scrollIntoView({ behavior: "smooth" })}>
                    <Info className="h-5 w-5" />
                    Our Mission
                  </SecondaryButton>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge tone="blue">Mobile friendly</Badge>
                  <Badge>High-contrast UI</Badge>
                  <Badge>Privacy-first placeholder</Badge>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Important</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        This tool provides screening guidance only. It does not diagnose disease. Always consult a medical professional for health decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="relative">
                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-slate-900">Quick Triage</p>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900 ring-1 ring-blue-100">
                      Secure UI Demo
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
                          <ClipboardList className="h-5 w-5" style={{ color: BRAND.blue }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">3-step intake</p>
                          <p className="text-xs text-slate-600">Body part, symptoms, duration</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
                          <Upload className="h-5 w-5" style={{ color: BRAND.blue }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Upload photo</p>
                          <p className="text-xs text-slate-600">Camera or file upload</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
                          <ShieldCheck className="h-5 w-5" style={{ color: BRAND.blue }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Color-coded result</p>
                          <p className="text-xs text-slate-600">Green / Yellow / Red guidance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-emerald-50 p-3 text-center ring-1 ring-emerald-100">
                      <p className="text-xs font-black text-emerald-800">Green</p>
                      <p className="mt-1 text-[11px] text-emerald-700">Low</p>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-3 text-center ring-1 ring-amber-100">
                      <p className="text-xs font-black text-amber-900">Yellow</p>
                      <p className="mt-1 text-[11px] text-amber-800">Moderate</p>
                    </div>
                    <div className="rounded-2xl bg-rose-50 p-3 text-center ring-1 ring-rose-100">
                      <p className="text-xs font-black text-rose-900">Red</p>
                      <p className="mt-1 text-[11px] text-rose-800">High</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 lg:block" />
              </div>
            </div>
          </Section>
        </div>

        {/* How it works */}
        <Section id="how" className="bg-slate-50/60">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">How it works</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                A simple, accessible flow designed for speed and clarity. Built for mobile, optimized for high trust.
              </p>
            </div>
            <Badge tone="blue">Upload → API → Result</Badge>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Step
              index={1}
              title="Answer 3 quick questions"
              desc="This intake adds context that improves screening relevance and helps you track changes over time."
              icon={ClipboardList}
            />
            <Step
              index={2}
              title="Upload a clear photo"
              desc="Use your camera or file upload. Good lighting and focus improves screening quality."
              icon={Camera}
            />
            <Step
              index={3}
              title="Get a color-coded summary"
              desc="Receive a screening overview and guidance on whether to monitor, consult, or seek urgent care."
              icon={ShieldCheck}
            />
          </div>
        </Section>

        {/* Triage + Upload + Results */}
        <Section id="triage">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: intake + upload */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Photo Upload Triage</h2>
                  <p className="mt-1 text-sm text-slate-600">Complete the intake form, then upload an image for screening.</p>
                </div>
                <ProgressDots step={formStep} total={3} />
              </div>

              {/* Stepper */}
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-slate-900">Intake Form</p>
                  <span className="text-xs font-semibold text-slate-600">3 steps</span>
                </div>

                <div className="mt-4">
                  <AnimatePresence mode="wait">
                    {formStep === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <InputLabel>1) Body part location</InputLabel>
                        <Select
                          value={bodyPart}
                          onChange={setBodyPart}
                          placeholder="Choose body part"
                          options={[
                            { value: "face", label: "Face" },
                            { value: "scalp", label: "Scalp" },
                            { value: "arms", label: "Arms" },
                            { value: "hands", label: "Hands" },
                            { value: "legs", label: "Legs" },
                            { value: "torso", label: "Torso" },
                            { value: "back", label: "Back" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                      </motion.div>
                    ) : null}

                    {formStep === 2 ? (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <InputLabel>2) Symptoms</InputLabel>
                        <RadioGroup
                          value={symptoms}
                          onChange={setSymptoms}
                          options={[
                            { value: "itching", label: "Itching" },
                            { value: "bleeding", label: "Bleeding" },
                            { value: "none", label: "None" },
                          ]}
                        />
                      </motion.div>
                    ) : null}

                    {formStep === 3 ? (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                      >
                        <InputLabel>3) Duration of the mark</InputLabel>
                        <TextInput
                          value={duration}
                          onChange={setDuration}
                          placeholder="e.g., 3 days, 2 weeks, 1 month"
                        />
                        <p className="mt-2 text-xs text-slate-600">Tip: If it changed rapidly or worsened, mention it here.</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <SecondaryButton
                    type="button"
                    onClick={() => setFormStep((s) => Math.max(1, s - 1))}
                    disabled={formStep === 1}
                    className={formStep === 1 ? "opacity-50" : ""}
                  >
                    Back
                  </SecondaryButton>

                  {formStep < 3 ? (
                    <PrimaryButton
                      type="button"
                      onClick={() => setFormStep((s) => Math.min(3, s + 1))}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      type="button"
                      onClick={() => setFormStep(3)}
                      className={!intakeComplete ? "opacity-60" : ""}
                      disabled={!intakeComplete}
                    >
                      Intake Complete
                      <CheckCircle2 className="h-4 w-4" />
                    </PrimaryButton>
                  )}
                </div>
              </div>

              {/* Upload */}
              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-extrabold text-slate-900">Upload Image</p>
                  <Badge tone="blue">Camera or File</Badge>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileSelected(e.target.files?.[0])}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => onFileSelected(e.target.files?.[0])}
                    className="hidden"
                  />

                  <SecondaryButton type="button" onClick={handleOpenCamera}>
                    <Camera className="h-5 w-5" />
                    Use Camera
                  </SecondaryButton>
                  <SecondaryButton type="button" onClick={handlePickFile}>
                    <Upload className="h-5 w-5" />
                    Upload File
                  </SecondaryButton>
                </div>

                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Uploaded preview"
                          className="h-36 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-36 w-full items-center justify-center">
                          <div className="text-center">
                            <Upload className="mx-auto h-6 w-6 text-slate-400" />
                            <p className="mt-2 text-xs font-semibold text-slate-500">No image</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-slate-900">Ready for screening</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {file ? (
                          <span className="break-all">Selected: <span className="font-semibold">{file.name}</span></span>
                        ) : (
                          "Upload a clear photo of the skin area in good lighting."
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge tone={intakeComplete ? "blue" : "neutral"}>
                          Intake: {intakeComplete ? "Complete" : "Incomplete"}
                        </Badge>
                        <Badge>{file ? "Image selected" : "No image"}</Badge>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <PrimaryButton
                          type="button"
                          onClick={runAnalysis}
                          disabled={!canAnalyze}
                          className={!canAnalyze ? "opacity-60" : ""}
                        >
                          {loading ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                              Analyzing…
                            </span>
                          ) : (
                            <>
                              Run AI Screening
                              <Sparkles className="h-5 w-5" />
                            </>
                          )}
                        </PrimaryButton>

                        <SecondaryButton type="button" onClick={resetAll}>
                          Reset
                        </SecondaryButton>
                      </div>

                      {error ? (
                        <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-900">
                          {error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-900">Privacy note:</span> This demo stores your image locally in the browser.
                  For production, upload securely to your backend and avoid storing sensitive data longer than necessary.
                </p>
              </div>
            </div>

            {/* Right: results */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Results Dashboard</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Color-coded results for quick guidance. Not a medical diagnosis.
                  </p>
                </div>
                <Badge tone="blue">Accessible UI</Badge>
              </div>

              <div className="mt-6 grid gap-4">
                {!result ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-extrabold text-slate-900">No result yet</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Complete intake, upload an image, and run screening to see the results.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                        <p className="text-xs font-black text-emerald-800">Green</p>
                        <p className="mt-1 text-[11px] text-emerald-700">Low risk / info</p>
                      </div>
                      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                        <p className="text-xs font-black text-amber-900">Yellow</p>
                        <p className="mt-1 text-[11px] text-amber-800">Moderate / monitor</p>
                      </div>
                      <div className="rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-100">
                        <p className="text-xs font-black text-rose-900">Red</p>
                        <p className="mt-1 text-[11px] text-rose-800">High / urgent</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="grid gap-4"
                  >
                    <RiskCard
                      risk={result.risk}
                      title={
                        result.risk === RISK.HIGH
                          ? "Urgent attention recommended"
                          : result.risk === RISK.MODERATE
                          ? "Monitor & consult if needed"
                          : "Low concern screening"
                      }
                      summary={result.summary}
                      bullets={result.recommendations}
                    />

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-extrabold text-slate-900">Screening Details</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge tone="blue">Model: {result.model}</Badge>
                          <Badge>Confidence: {Math.round(result.confidence * 100)}%</Badge>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-black uppercase tracking-wider text-slate-500">Intake</p>
                          <div className="mt-2 space-y-1 text-sm text-slate-700">
                            <p><span className="font-semibold">Body part:</span> {bodyPart}</p>
                            <p><span className="font-semibold">Symptoms:</span> {symptoms}</p>
                            <p><span className="font-semibold">Duration:</span> {duration}</p>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-black uppercase tracking-wider text-slate-500">Possible categories</p>
                          <ul className="mt-2 space-y-2 text-sm text-slate-700">
                            {result.differential.map((d) => (
                              <li key={d} className="flex items-start gap-2">
                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-900 ring-1 ring-blue-100">
                        <p className="font-extrabold">Next steps</p>
                        <p className="mt-1">
                          Use the <span className="font-bold">Get Help</span> section below to find free or government clinics near you.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* Mission */}
        <Section id="mission" className="bg-slate-50/60">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                CURESCAN exists to reduce barriers to skin health awareness. We believe quick screening tools can help people decide when to seek care,
                especially in communities with limited access to specialists.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-extrabold text-slate-900">Social welfare focus</p>
                  <p className="mt-2 text-sm text-slate-600">
                    The app is designed for outreach programs, camps, and public use with clear guidance and clinic discovery.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-extrabold text-slate-900">Trust & transparency</p>
                  <p className="mt-2 text-sm text-slate-600">
                    We show confidence, avoid overclaiming, and always recommend professional evaluation when needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-slate-900">What we prioritize</p>
                <Badge tone="blue">High trust</Badge>
              </div>

              <div className="mt-5 space-y-3">
                {[ 
                  {
                    title: "Accessibility",
                    desc: "Large buttons, high contrast, mobile-first layout.",
                  },
                  {
                    title: "Clinical clarity",
                    desc: "Simple steps, minimal jargon, clear action guidance.",
                  },
                  {
                    title: "Responsible AI",
                    desc: "Screening only. No diagnosis claims. Strong disclaimers.",
                  },
                  {
                    title: "Help discovery",
                    desc: "Find government/free care options near the user.",
                  },
                ].map((x) => (
                  <div key={x.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-extrabold text-slate-900">{x.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{x.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Get Help */}
        <Section id="help">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Find Help</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Locate nearby free or government clinics. This section is designed for social welfare deployment.
              </p>
            </div>
            <Badge tone="blue">Map Placeholder</Badge>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <MapPlaceholder clinics={clinics} />

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold text-slate-900">Need urgent care?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                If the screening shows <span className="font-bold text-rose-700">Red / High risk</span> or if symptoms rapidly worsen, please seek medical attention immediately.
              </p>

              <div className="mt-5 rounded-3xl bg-rose-50 p-5 ring-1 ring-rose-100">
                <p className="text-sm font-extrabold text-rose-900">Emergency signals</p>
                <ul className="mt-3 space-y-2 text-sm text-rose-900">
                  {["Rapid spread", "Severe pain", "Fever", "Uncontrolled bleeding"].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-rose-400" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm font-extrabold text-slate-900">Implementation tip</p>
                <p className="mt-2 text-sm text-slate-600">
                  Connect this section to a clinic directory API and let users filter by:
                  <span className="font-semibold"> free care, government clinics, open hours, and distance</span>.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <Container>
          <div className="grid gap-6 py-10 sm:grid-cols-2 sm:items-start">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "rgba(0,86,179,0.10)" }}
                >
                  <ShieldCheck className="h-5 w-5" style={{ color: BRAND.blue }} />
                </div>
                <div>
                  <p className="text-sm font-black">CURESCAN</p>
                  <p className="text-xs font-semibold text-slate-500">Accessible Skin Health for Everyone.</p>
                </div>
              </div>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
                <span className="font-extrabold text-slate-900">Legal Disclaimer:</span> This is an AI screening tool and NOT a medical diagnosis.
                Consult a professional for health decisions.
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-extrabold text-slate-900">Contact / Links</p>
              <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <Github className="h-4 w-4" />
                  Repo
                </a>
                <a
                  href="mailto:hello@curescan.org"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} CURESCAN. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
