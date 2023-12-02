import { Button } from "@/components/ui/button";
import Heading from "./_components/heading";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

export default function Marketing() {
  return (
    <div className=" min-h-full flex flex-col">
      <div className=" flex flex-col items-center justify-center md:justify-start text-center gap-y-7 flex-1 pb-8">
        <Heading />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
