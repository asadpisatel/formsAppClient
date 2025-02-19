"use client";
import React from "react";
import { useFormatter, useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const t = useTranslations("menu");
  const format = useFormatter();

  const { isAuthenticated } = useAuthStore();

  return (
    <div className="">
      {t("home")} {isAuthenticated ? "Залогинен" : "не залогинен"}{" "}
      {format.relativeTime(new Date("2025-02-14T13:08:06.698Z"))}
    </div>
  );
};

export default Page;
