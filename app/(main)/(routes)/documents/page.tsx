"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      // loading: "Creating a new note..",
      success: "New note created!",
      error: "Failed to create a note.",
    });
  };

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
      <Button onClick={onCreate}>
        <PlusCircle className=" mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
