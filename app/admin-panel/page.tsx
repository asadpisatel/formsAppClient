import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "../../utils/axiosInstance";
async function getData() {
  try {
    const response = await axios.get("/user/get_users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <div className="flex-1 text-sm text-muted-foreground"></div>
    </div>
  );
}
