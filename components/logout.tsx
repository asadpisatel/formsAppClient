"use client";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "@/utils/axiosInstance";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

const Logout = () => {
  const { logout } = useAuthStore();
  const t = useTranslations("profile");

  async function handleLogout() {
    await axios.post("/user/logout");
    logout();
    window.location.href = "/";
  }
  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-2 px-2 py-1.5 w-full h-full">
      <LogOut size="20px" /> {t("logout")}
    </div>
  );
};

export default Logout;
