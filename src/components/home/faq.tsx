"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "What is the purpose of this portal?",
    answer:
      "This job portal connects job seekers with employers, allowing users to discover job opportunities and apply for them easily.",
  },
  {
    question: "How can I create an account?",
    answer: (
      <>
        Sign in with <span className="text-brand">Google</span> or{" "}
        <span className="text-brand">GitHub</span>, or enter your email to
        receive a confirmation link.
      </>
    ),
  },
  {
    question: "Is there a fee to use this job portal?",
    answer: "As of now, it’s completely free to use.",
  },
  {
    question: "Can I save my favorite jobs?",
    answer:
      "Yes, you can save your favorite jobs and also view your applied jobs.",
  },
  {
    question: "Can I apply for multiple jobs per day?",
    answer:
      "Yes, currently you can apply for multiple jobs per day. This may change once premium plans are introduced.",
  },
];

function Header() {
  return (
    <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
        Frequently Asked{" "}
        <span className="text-brand relative">
          Questions
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
        Find answers to common questions about using our platform for job
        searching and hiring.
      </p>
    </div>
  );
}

function AccordionSection() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="py-2">
          <AccordionTrigger className="font-semibold sm:text-lg">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-slate-600 dark:text-muted-foreground sm:text-lg">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Faq() {
  return (
    <div className="w-full max-w-custom mx-auto px-4">
      <Header />
      <AccordionSection />
    </div>
  );
}
