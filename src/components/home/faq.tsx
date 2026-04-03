"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is the purpose of this portal?",
    answer:
      "This job portal connects job seekers with employers, allowing users to discover job opportunities and apply for them easily.",
  },
  {
    id: "2",
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
    id: "3",
    question: "Is there a fee to use this job portal?",
    answer: "As of now, it’s completely free to use.",
  },
  {
    id: "4",
    question: "Can I save my favorite jobs?",
    answer:
      "Yes, you can save your favorite jobs and also view your applied jobs.",
  },
  {
    id: "5",
    question: "Can I apply for multiple jobs per day?",
    answer:
      "Yes, currently you can apply for multiple jobs per day. This may change once premium plans are introduced.",
  },
];

function Header() {
  return (
    <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold tracking-tight mb-6">
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

      <p className="text-base sm:text-lg text-gray-700 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Find answers to common questions about using our platform for job
        searching and hiring.
      </p>
    </div>
  );
}

export function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="border-b">
      <button
        className="w-full font-semibold text-left py-4 flex items-center justify-between hover:underline"
        aria-expanded={isOpen}
        onClick={() => onToggle(faq.id)}
      >
        {faq.question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Minus
              size={16}
              className="text-gray-700 dark:text-muted-foreground"
            />
          ) : (
            <Plus
              size={16}
              className="text-gray-700 dark:text-muted-foreground"
            />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-700 dark:text-muted-foreground">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-custom mx-auto px-4">
      <Header />
      <div>
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

// function FAQItem({ faq }: { faq: FAQ }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b">
//       <button
//         className="w-full text-left py-4 font-medium flex items-center justify-between hover:underline"
//         aria-expanded={open}
//         onClick={() => setOpen(!open)}
//       >
//         {faq.question}
//         {open ? <Minus /> : <Plus />}
//       </button>

//       {open && (
//         <p className="pb-4 text-gray-600 dark:text-muted-foreground">
//           {faq.answer}
//         </p>
//       )}
//     </div>
//   );
// }

// {
//   faqs.map((faq) => <FAQItem key={faq.id} faq={faq} />);
// }
