"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Template } from "./columns";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { useFormatter } from "next-intl";

const PersonalTemplates = () => {
  const [data, setData] = useState<Template[]>([]);
  const { isAuthenticated } = useAuthStore();
  const format = useFormatter();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/personal/templates");
        const updatedData = response.data.map((item: Template) => {
          return {
            ...item,
            createdAt: format.relativeTime(new Date(item.createdAt)),
          };
        });
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    }
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated, format]);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PersonalTemplates;
