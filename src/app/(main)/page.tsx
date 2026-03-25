import { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

export const metadata: Metadata = {
  title: "Home - Careerly",
  description: "A go to platform for job seekers and employers",
};

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b">
        <HeroSection />
        <div className="absolute w-175 h-175 bg-primary/20 dark:bg-primary/10 blur-[140px] rounded-full"></div>
        <div className="absolute flex items-center justify-center">
          <div className="relative h-360 w-360 rounded-full border flex items-center justify-center">
            <div className="relative h-280 w-280 rounded-full border flex items-center justify-center">
              <div className="relative h-200 w-200 rounded-full border flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-linear-to-br from-primary/20 to-primary/10 dark:from-primary/15 dark:to-primary/10 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 border-b">
        <Features />
      </section>
      <section className="py-16 border-b">
        <HowItWorks />
      </section>
      <section className="py-16">
        <Faq />
      </section>
    </>
  );
}
