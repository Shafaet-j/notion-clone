"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  expanded,
  id,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        " group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 items-center font-medium flex",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
    >
      {!!id && (
        <div
          onClick={() => {}}
          role=" button"
          className=" h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
        >
          <ChevronIcon />
        </div>
      )}
      {documentIcon ? (
        <div className=" shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className=" shrink-0 h-[18px] mr-2" />
      )}

      <span className=" truncate">{label}</span>
      {isSearch && (
        <kbd className=" ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 opacity-100">
          <span className=" text-xm">Ctrl</span>{" "}
        </kbd>
      )}
    </div>
  );
};

export default Item;
