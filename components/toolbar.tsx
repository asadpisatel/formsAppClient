import React from "react";
import { Button } from "./ui/button";
import {
  LockKeyhole,
  LockKeyholeOpen,
  Trash2,
  UserMinus,
  UserPlus,
} from "lucide-react";
import axios from "../utils/axiosInstance";

type ToolbarProps = {
  refreshData: () => Promise<void>;
  selectedRows: object;
};

const Toolbar = ({ refreshData, selectedRows }: ToolbarProps) => {
  const selectedEmails = Object.keys(selectedRows);

  async function handleAction(action: string) {
    if (selectedEmails.length === 0) return;

    try {
      await axios.post(`/user/${action}`, { emails: selectedEmails });

      refreshData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex gap-3 flex-wrap rounded-md border p-3 mb-5">
      <Button onClick={() => handleAction("block")}>
        <LockKeyhole /> Block
      </Button>
      <Button onClick={() => handleAction("unblock")}>
        <LockKeyholeOpen />
      </Button>
      <Button variant="destructive" onClick={() => handleAction("delete")}>
        <Trash2 />
      </Button>
      <Button onClick={() => handleAction("make_admin")}>
        <UserPlus /> Make Admin
      </Button>
      <Button onClick={() => handleAction("remove_admin")}>
        <UserMinus /> Remove Admin
      </Button>
    </div>
  );
};

export default Toolbar;
