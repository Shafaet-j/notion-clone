import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");

  const isResizing = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const hangleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={` h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999] group/slide ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "w-0"} `}
      >
        <div
          role="button"
          className={`h-6 w-6 text-muted-foreground rounded hover:bg-neutral-400 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/slide:opacity-100 transition ${
            isMobile && "opacity-100"
          }`}
        >
          <ChevronsLeft />
        </div>
        <div>
          <p>Action Items</p>
        </div>
        <div className=" mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={hangleMouseDown}
          onClick={() => {}}
          className=" opacity-0 group-hover/slide:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/5 right-0 top-0 "
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={` absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]  ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "left-0 w-full"} `}
      >
        <nav className=" bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon role="button" className=" h-6 w-6" />}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
