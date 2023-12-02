"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useScrollTop } from "@/hooks/use-scroll-top";
import React from "react";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={`${
        scrolled && " shadow-sm border-b"
      } top-0 left-0 fixed  w-full z-50 p-6 flex items-center`}
    >
      <h2 className=" font-bold text-xl hidden md:block">Notion</h2>
      <div className=" flex justify-between w-full items-center gap-x-2 md:ml-auto md:justify-end">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
