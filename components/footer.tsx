import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-paper/10 px-5 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[12px] tracking-[0.02em] text-paper/45">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/40">
          Data analyst · Growth analytics
        </p>
      </div>
    </footer>
  );
}
