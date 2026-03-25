"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  Bookmark,
  BriefcaseBusiness,
  CircleCheckBig,
  FileText,
  ListFilter,
  Search,
  Send,
  SquarePen,
  Upload,
  Users,
} from "lucide-react";
import { IconType } from "react-icons";

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
}

const jobSeekerFeatures: Feature[] = [
  {
    icon: ListFilter,
    title: "Smart Filters",
    desc: "Easily narrow down job listings by location, role type, or work mode.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    desc: "Discover relevant opportunities using roles, skills, or company names.",
  },
  {
    icon: Bookmark,
    title: "Bookmark Jobs",
    desc: "Save interesting job openings to revisit later and stay organized.",
  },
  {
    icon: Upload,
    title: "Upload Resume",
    desc: "Upload or update your resume to improve your chances with recruiters.",
  },
  {
    icon: FileText,
    title: "View Applications",
    desc: "View the list of jobs you’ve applied for and track their status.",
  },
  {
    icon: Send,
    title: "Easy Apply",
    desc: "Apply to your chosen jobs quickly with a simple application flow.",
  },
];

const employerFeatures: Feature[] = [
  {
    icon: BriefcaseBusiness,
    title: "Post Jobs Easily",
    desc: "Create and publish job listings quickly using a simple, step-by-step guided form.",
  },
  {
    icon: SquarePen,
    title: "Manage & Edit Jobs",
    desc: "Update, edit, or close job postings at any time without disrupting applicants.",
  },
  {
    icon: Users,
    title: "Track Applications",
    desc: "View, organize, and monitor all candidate applications from one centralized dashboard.",
  },
  {
    icon: CircleCheckBig,
    title: "Hire Candidates",
    desc: "Accept, reject, or send job offers using a clear and streamlined hiring workflow.",
  },
];

function Header() {
  return (
    <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold tracking-tight mb-6">
        Powerful{" "}
        <span className="text-brand relative">
          Features
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-brand to-transparent rounded-full"
          />
        </span>
      </h2>

      <p className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Features designed to make hiring and job searching simple and effective.
      </p>
    </div>
  );
}

function Toggle({
  mode,
  setMode,
}: {
  mode: "jobseeker" | "employer";
  setMode: (mode: "jobseeker" | "employer") => void;
}) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative flex w-65 rounded-full border bg-card p-1 shadow-sm">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-1 bottom-1 w-1/2 rounded-full bg-brand"
          style={{
            left: mode === "jobseeker" ? "4px" : "calc(50% - 4px)",
          }}
        />

        <button
          onClick={() => setMode("jobseeker")}
          className={`relative z-10 w-1/2 py-2 font-bold transition-colors
          ${
            mode === "jobseeker"
              ? "text-white dark:text-background"
              : "hover:text-brand"
          }`}
        >
          Job Seeker
        </button>

        <button
          onClick={() => setMode("employer")}
          className={`relative z-10 w-1/2 py-2 font-bold transition-colors
          ${
            mode === "employer"
              ? "text-white dark:text-background"
              : "hover:text-brand"
          }`}
        >
          Employer
        </button>
      </div>
    </div>
  );
}

function FeaturesSection({
  features,
  mode,
}: {
  features: Feature[];
  mode: "jobseeker" | "employer";
}) {
  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        mode === "jobseeker" ? "lg:grid-cols-3" : ""
      } gap-6`}
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="h-full border p-4 md:p-6 rounded-xl bg-card group shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-brand/10 text-brand group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon size={18} />
              </div>

              <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
            </div>

            <div className="mt-2">
              <p className="leading-relaxed text-slate-600 dark:text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Features() {
  const [mode, setMode] = useState<"jobseeker" | "employer">("jobseeker");

  const features = mode === "employer" ? employerFeatures : jobSeekerFeatures;

  return (
    <div className="w-full max-w-custom mx-auto px-4">
      <Header />
      <Toggle mode={mode} setMode={setMode} />
      <FeaturesSection features={features} mode={mode} />
    </div>
  );
}
