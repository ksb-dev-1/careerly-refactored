import { AnimatedUnderline } from "./animated-underline";
import { StartExploringButton } from "./start-exploring-button";

export function HeroSection() {
  return (
    <div className="absolute inset-0 z-10 min-h-screen w-full max-w-custom mx-auto flex flex-col items-center justify-center px-4">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-center">
        Unlock Your <span className="text-primary">Career</span> Potential
      </h1>
      <p className="mt-6 md:mt-8 max-w-3xl text-center text-base md:text-lg text-slate-600 dark:text-slate-300">
        Find the perfect job or the right talent effortlessly, with intelligent
        filtering, instant search results, and a modern, intuitive interface
        designed for your success.
      </p>
      <AnimatedUnderline />
      <div className="mt-8">
        <StartExploringButton />
      </div>
    </div>
  );
}
