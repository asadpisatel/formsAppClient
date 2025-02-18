"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const t = useTranslations("menu");
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="">
      {t("home")} {isAuthenticated ? "Залогинен" : "не залогинен"}{" "}
    </div>
  );
};

export default Page;
