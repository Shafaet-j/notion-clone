import { ChevronsLeft } from "lucide-react";
import React from "react";

const Navigation = () => {
  return (
    <>
      <aside className=" h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999] group/slide">
        <div>
          <ChevronsLeft />
        </div>
        <div>
          <p>Action Items</p>
        </div>
        <div className=" mt-4">
          <p>Documents</p>
        </div>
        <div className=" opacity-0 group-hover/slide:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/5 right-0 top-0 "></div>
      </aside>
    </>
  );
};

export default Navigation;
