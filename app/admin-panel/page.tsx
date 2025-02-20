"use client";
import React, { useEffect, useState } from "react";
import { columns, User } from "./columns";
import { DataTable } from "./data-table";
import axios from "../../utils/axiosInstance";
import { useTranslations } from "next-intl";

export default function Page() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("admin_panel");

  async function getData() {
    try {
      const response = await axios.get("/admin/get_users");
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} refreshData={getData} />
    </div>
  );
}
