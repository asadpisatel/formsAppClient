"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("menu");

  return <div className="">{t("home")}</div>;
};

export default Page;
