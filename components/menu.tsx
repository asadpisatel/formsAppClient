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
import { useTranslations } from "next-intl";

const Menu = () => {
  const t = useTranslations("menu");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4">
        <DropdownMenuLabel>{t("menu")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>{t("home")}</DropdownMenuItem>
        </Link>

        <DropdownMenuItem>{t("my_forms")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
