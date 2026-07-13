import type { Metadata } from "next";
import { ResumeContent } from "@/components/ResumeContent";

export const metadata: Metadata = {
  title: "Resume | Ashim Shrestha",
  description:
    "8+ years in growth, retention, and customer analytics across fintech and e-commerce.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
