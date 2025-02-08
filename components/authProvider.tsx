"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "../utils/axiosInstance";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    axios
      .get("/user/me")
      .then((res) => {
        if (res.data.email) login(res.data);
        else logout();
      })
      .catch(() => logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
