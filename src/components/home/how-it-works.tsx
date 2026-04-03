"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const jobSeekerSteps = [
  {
    id: "j1",
    number: "1",
    title: "Create Job Seeker Account",
    description:
      "Sign up quickly with your professional email address or using OAuth.",
  },
  {
    id: "j2",
    number: "2",
    title: "Upload Your Resume",
    description: "Add your resume and let employers discover your skills.",
  },
  {
    id: "j3",
    number: "3",
    title: "Apply & Track",
    description: "Submit applications and monitor your progress easily.",
  },
];

const employerSteps = [
  {
    id: "e1",
    number: "1",
    title: "Create Employer Account",
    description:
      "Sign up quickly with your professional email address or using OAuth.",
  },
  {
    id: "e2",
    number: "2",
    title: "Post Job Openings",
    description: "Create detailed listings that attract quality candidates.",
  },
  {
    id: "e3",
    number: "3",
    title: "Manage Candidates",
    description: "Review applications and connect with potential hires.",
  },
];

function Header() {
  return (
    <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold tracking-tight mb-6">
        How It{" "}
        <span className="text-brand relative">
          Works
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
        Whether you&apos;re seeking opportunities or talent, our platform makes
        the process seamless, efficient, and effective.
      </p>
    </div>
  );
}

interface ReusableCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: {
    id: string;
    number: string;
    title: string;
    description: string;
  }[];
}

function ReusableCard({ icon, title, description, steps }: ReusableCardProps) {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex items-start gap-4">
        <div className="relative bg-brand/10 text-brand h-12 w-12 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <CardTitle className="font-bold text-brand text-lg">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-gray-700 dark:text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 ml-2">
        {steps.map((step) => (
          <div key={step.id} className="flex gap-4">
            <div className="shrink-0 h-8 w-8 rounded-full bg-muted border flex items-center justify-center">
              <span className="text-sm font-bold">{step.number}</span>
            </div>
            <div>
              <p className="text-base font-bold mb-1">{step.title}</p>
              <p className="text-base text-slate-600 dark:text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function HowItWorks() {
  return (
    <section className="w-full max-w-custom mx-auto overflow-x-hidden pb-0.5 px-4">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Seekers Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ReusableCard
            icon={<User />}
            title="For Job Seekers"
            description="Find your dream role in 3 simple steps"
            steps={jobSeekerSteps}
          />
        </motion.div>

        {/* Employers Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ReusableCard
            icon={<BriefcaseBusiness />}
            title="For Employers"
            description="Find perfect candidates effortlessly"
            steps={employerSteps}
          />
        </motion.div>
      </div>
    </section>
  );
}
