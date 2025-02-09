"use client";
import React, { useEffect, useState } from "react";
import { columns, User } from "./columns";
import { DataTable } from "./data-table";
import axios from "../../utils/axiosInstance";

export default function Page() {
  const [data, setData] = useState<User[]>([]);

  async function getData() {
    try {
      const response = await axios.get("/admin/get_users");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} refreshData={getData} />
    </div>
  );
}
