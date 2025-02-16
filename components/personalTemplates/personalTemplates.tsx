"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./personalTable";
import { columns, Template } from "./personalColumns";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";

const PersonalTemplates = () => {
  const [data, setData] = useState<Template[]>([]);
const {user, isAuthenticated} = useAuthStore()

  async function getData() {
    try {
      const response = await axios.post("/personal/templates", {
        userId: user?.id,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated]);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PersonalTemplates;
