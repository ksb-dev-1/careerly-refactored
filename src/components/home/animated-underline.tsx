"use client";

import { Variants, motion } from "framer-motion";

const underlineItem: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      delay: 1.0,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedUnderline() {
  return (
    <motion.div
      data-testid="animated-underline"
      className="w-24 h-1 bg-brand rounded mx-auto mt-6 origin-center"
      variants={underlineItem}
      initial="hidden"
      animate="show"
    />
  );
}
