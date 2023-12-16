import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./trashbox";
import { useSearch } from "@/hooks/use-seatch";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";

const Navigation = () => {
  const params = useParams();
  const search = useSearch();
  const settings = useSettings();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");

  const isResizing = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      success: "New note created",
      error: "Failed to create a note",
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

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

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(false);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
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
          onClick={collapse}
          className={`h-6 w-6 text-muted-foreground rounded hover:bg-neutral-400 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/slide:opacity-100 transition ${
            isMobile && "opacity-100"
          }`}
        >
          <ChevronsLeft />
        </div>
        <div>
          <UserItem />
          <Item label="Search" isSearch icon={Search} onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className=" mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={PlusCircle} label="New page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={hangleMouseDown}
          onClick={resetWidth}
          className=" opacity-0 group-hover/slide:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/5 right-0 top-0 "
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={` absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]  ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "left-0 w-full"} `}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className=" bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className=" h-6 w-6"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
