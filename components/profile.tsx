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
import LocaleSWitcher from "./localeSwitcher";
import { useTranslations } from "next-intl";

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const t = useTranslations("profile");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>{t("my_account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/login">
          <DropdownMenuItem>{t("login")}</DropdownMenuItem>
        </Link>

        <Link href="/registration">
          <DropdownMenuItem>{t("sign_up")}</DropdownMenuItem>
        </Link>

        {isAuthenticated && user?.role === "ADMIN" ? (
          <Link href="/admin-panel">
            <DropdownMenuItem>{t("admin_panel")}</DropdownMenuItem>
          </Link>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LocaleSWitcher />
        </DropdownMenuItem>
        {isAuthenticated ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Logout />
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
