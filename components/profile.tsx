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
import { User } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { ModeToggle } from "./mode-toggle";

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/login">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/registration">Sign up</Link>
        </DropdownMenuItem>
        {isAuthenticated && user?.role === "ADMIN" ? (
          <DropdownMenuItem>
            <Link href="/admin-panel">Admin Panel</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
