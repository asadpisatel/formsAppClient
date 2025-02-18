/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TemplateForm } from "@/components/createTemplate/templateForm";
import React from "react";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const { user } = useAuthStore();
  async function onSave(data: any) {
    data.userId = user?.id;

    try {
      await axios.post("/template/create", data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="">
      <TemplateForm onSave={onSave} />
    </div>
  );
};

export default Page;
