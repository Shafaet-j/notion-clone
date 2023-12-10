"use client";
import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, SignedOut, useUser } from "@clerk/clerk-react";

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" flex items-center text-sm p-3 w-full hover:bg-primary/5">
          <div className=" gap-x-1 flex items-center max-w-[160px]">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className=" line-clamp-1 font-medium">
              {user?.firstName}&apos;s Notion
            </span>
          </div>
          <ChevronsLeftRight className=" rotate-90 ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className=" flex flex-col space-y-4 p-2">
          <p className=" text-xs font-medium leading-none ">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className=" flex items-center gap-2">
            <div className=" rounded-md bg-secondary p-1">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className=" space-y-1">
              <p className=" text-sm line-clamp-1">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className=" w-full cursor-pointer">
          <SignOutButton>Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
