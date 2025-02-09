"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>Home</DropdownMenuItem>
        </Link>

        <DropdownMenuItem>My Forms</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
