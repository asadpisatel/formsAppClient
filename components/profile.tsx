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
import Logout from "./logout";

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
        <Link href="/login">
          <DropdownMenuItem>Login</DropdownMenuItem>
        </Link>

        <Link href="/registration">
          <DropdownMenuItem>Sign up</DropdownMenuItem>
        </Link>

        {isAuthenticated && user?.role === "ADMIN" ? (
          <Link href="/admin-panel">
            <DropdownMenuItem>Admin Panel</DropdownMenuItem>
          </Link>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
