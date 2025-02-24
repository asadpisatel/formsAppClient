import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import axios from "@/utils/axiosInstance";

type DeleteRow = {
  refreshData: () => Promise<void>;
  selectedRows: object;
};

const DeleteTemplate = ({ refreshData, selectedRows }: DeleteRow) => {
  const selectedIds = Object.keys(selectedRows);

  async function handleAction(action: string) {
    if (selectedIds.length === 0) return;

    try {
      await axios.post(`/personal/templates/${action}`, { ids: selectedIds });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button variant="destructive" onClick={() => handleAction("delete")}>
      <Trash2 />
    </Button>
  );
};

export default DeleteTemplate;
