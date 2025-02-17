"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Template } from "./columns";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";

const PersonalTemplates = () => {
  const [data, setData] = useState<Template[]>([]);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/personal/templates");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
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
