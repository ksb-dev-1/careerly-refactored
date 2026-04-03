import { AnimatedUnderline } from "./animated-underline";
import { StartExploringButton } from "./start-exploring-button";

export function HeroSection() {
  return (
    <div className="absolute inset-0 z-10 min-h-screen w-full max-w-custom mx-auto flex flex-col items-center justify-center px-4">
      <h1 className="font-extrabold text-4xl sm:text-5xl tracking-tight text-center">
        Unlock Your <span className="text-brand">Career</span> Potential
      </h1>
      <p className="mt-6 md:mt-8 max-w-3xl text-center md:text-lg text-gray-700 dark:text-muted-foreground">
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
