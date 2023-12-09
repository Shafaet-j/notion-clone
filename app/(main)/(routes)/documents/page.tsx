"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const DocumentsPage = () => {
  const { user } = useUser();
  return (
    <div className=" h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/Launch.png"
        width={300}
        height={300}
        className=" dark:hidden"
        alt="launch"
      />
      <Image
        src="/Launch2.png"
        width={300}
        height={300}
        className=" hidden dark:block"
        alt="launch"
      />
      <h2 className=" text-lg font-medium">
        Welcome to Notion {user?.firstName}
      </h2>
      <Button>
        <PlusCircle className=" mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
