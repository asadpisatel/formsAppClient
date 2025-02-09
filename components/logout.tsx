"use client";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "@/utils/axiosInstance";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { logout } = useAuthStore();

  async function handleLogout() {
    await axios.post("/user/logout");
    logout();
    window.location.href = "/";
  }
  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-2 px-2 py-1.5 w-full h-full">
      <LogOut size="20px" /> Logout
    </div>
  );
};

export default Logout;
