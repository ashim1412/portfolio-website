"use client";

import { useState, useRef, FormEvent } from "react";
import { useTheme } from "next-themes";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Download, CheckCircle, X, Loader2 } from "lucide-react";

// ── Toast ──────────────────────────────────────────────────────────────────────

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-900/40"
    >
      <CheckCircle size={16} className="shrink-0" />
      {message}
      <button
        onClick={onDismiss}
        className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ── Contact card config ────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "hello@ashim-shrestha.com",
    action: "copy" as const,
    href: null,
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    action: "link" as const,
    href: "https://linkedin.com/in/ashim-shrestha",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    value: "@ashim1412",
    action: "link" as const,
    href: "https://github.com/ashim1412",
  },
  {
    id: "resume",
    icon: Download,
    label: "Resume",
    value: "Download PDF",
    action: "download" as const,
    href: "/Ashim-Shrestha.pdf",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ── Contact card ───────────────────────────────────────────────────────────────

function ContactCard({
  item,
  index,
  onCopy,
}: {
  item: (typeof CONTACT_ITEMS)[number];
  index: number;
  onCopy: (text: string) => void;
}) {
  const [clicked, setClicked] = useState(false);
  const Icon = item.icon;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    if (item.action === "copy") {
      navigator.clipboard.writeText(item.value).then(() => onCopy(item.value));
    }
  };

  const inner = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileTap={{ scale: 0.97 }}
      onClick={item.action === "copy" ? handleClick : undefined}
      className={`group flex flex-col items-center text-center rounded-xl border border-border bg-secondary p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] ${
        item.action === "copy" ? "cursor-pointer" : ""
      }`}
    >
      {/* Icon ring */}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 border transition-colors duration-300 ${
          clicked
            ? "bg-blue-500/30 border-blue-400/60"
            : "bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20"
        }`}
      >
        <Icon
          size={26}
          className={`transition-colors duration-300 ${
            clicked ? "text-blue-300" : "text-blue-400"
          }`}
        />
      </div>

      <p className="text-xs font-medium text-muted uppercase tracking-widest mb-1">
        {item.label}
      </p>
      <p className="text-base font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200">
        {item.value}
      </p>
    </motion.div>
  );

  if (item.action === "link") {
    return (
      <a href={item.href!} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }

  if (item.action === "download") {
    return (
      <a href={item.href!} download className="block">
        {inner}
      </a>
    );
  }

  return inner;
}

// ── Contact form ───────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!String(data.get("name")).trim()) errs.name = "Name is required.";
    const email = String(data.get("email")).trim();
    if (!email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email.";
    if (!String(data.get("message")).trim())
      errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/hello@ashim-shrestha.com", {
        method: "POST",
        body: JSON.stringify({
          name: String(data.get("name")),
          email: String(data.get("email")),
          message: String(data.get("message")),
          _subject: `Portfolio Contact from ${String(data.get("name"))}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldBase =
    "w-full rounded-lg bg-background border px-4 py-3 text-foreground placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition-colors duration-200";

  return (
    <motion.div
      id="send-message"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-foreground text-center mb-8">
        Send a Message
      </h3>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-10 text-center"
        >
          <CheckCircle size={40} className="text-blue-400" />
          <p className="text-foreground font-semibold text-lg">Message sent!</p>
          <p className="text-muted text-sm">
            Thanks for reaching out — I'll get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={`${fieldBase} ${
                errors.name
                  ? "border-red-500/70 focus:ring-red-500/40"
                  : "border-border hover:border-foreground/30"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className={`${fieldBase} ${
                errors.email
                  ? "border-red-500/70 focus:ring-red-500/40"
                  : "border-border hover:border-foreground/30"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              placeholder="What's on your mind?"
              className={`${fieldBase} resize-none ${
                errors.message
                  ? "border-red-500/70 focus:ring-red-500/40"
                  : "border-border hover:border-foreground/30"
              }`}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Error banner */}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong. Please try again or email directly.
            </p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors duration-200"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export function Contact() {
  const [toast, setToast] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const showToast = (email: string) => {
    setToast(`Email copied to clipboard!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #080e1e 0%, #0f0728 40%, #0a0a1a 70%, #080e1e 100%)"
          : "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 40%, #f0f9ff 70%, #dbeafe 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "5%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Looking for a data analyst to turn complex data into clear insights?
            Let&apos;s talk!
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CONTACT_ITEMS.map((item, i) => (
            <ContactCard
              key={item.id}
              item={item}
              index={i}
              onCopy={showToast}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Contact form */}
        {isInView && <ContactForm />}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast} onDismiss={() => setToast(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
