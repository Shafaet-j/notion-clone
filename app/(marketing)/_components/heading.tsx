import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Heading = () => {
  return (
    <div className=" max-w-3xl space-y-4">
      <h1 className=" text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Document and plans.Unified. Welcome to
        <span className=" underline"> Notion</span>
      </h1>
      <h3 className=" text-base sm:text-xl md:text-2xl font-medium">
        Notion is connected workspace where <br /> better, faster work happen
      </h3>
      <Button>
        Enter Notion
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Heading;
