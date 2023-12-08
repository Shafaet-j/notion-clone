"use client";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className=" max-w-3xl space-y-4">
      <h1 className=" text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Document and plans.Unified. Welcome to
        <span className=" underline"> Notion</span>
      </h1>
      <h3 className=" text-base sm:text-xl md:text-2xl font-medium">
        Notion is connected workspace where <br /> better, faster work happen
      </h3>
      {isLoading && <p className=" text-center">Loading...</p>}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion free <ArrowRight />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
