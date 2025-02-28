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
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ToolbarProps = {
  refreshData: () => Promise<void>;
  selectedRows: object;
};

const Toolbar = ({ refreshData, selectedRows }: ToolbarProps) => {
  const selectedEmails = Object.keys(selectedRows);
  const t = useTranslations("admin_panel");

  async function handleAction(action: string) {
    if (selectedEmails.length === 0) return;

    try {
      await axios.post(`/admin/${action}`, { emails: selectedEmails });
      toast.success(t(`success.${action}`));
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      if (axiosError.response?.status === 401) {
        toast.error(axiosError.response?.data.error);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }
  }
  return (
    <div className="flex gap-3 flex-wrap rounded-md border p-3 mb-5">
      <Button onClick={() => handleAction("block")}>
        <LockKeyhole /> {t("block")}
      </Button>
      <Button onClick={() => handleAction("unblock")}>
        <LockKeyholeOpen />
      </Button>
      <Button variant="destructive" onClick={() => handleAction("delete")}>
        <Trash2 />
      </Button>
      <Button onClick={() => handleAction("make_admin")}>
        <UserPlus /> {t("make_admin")}
      </Button>
      <Button onClick={() => handleAction("remove_admin")}>
        <UserMinus />
      </Button>
    </div>
  );
};

export default Toolbar;
