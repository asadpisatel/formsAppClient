"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

type AddQuestionProps = {
  onAdd: (type: "string" | "text" | "int" | "checkbox") => void;
};

export function AddQuestion({ onAdd }: AddQuestionProps) {
  const t = useTranslations("create_template");
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => onAdd("string")} variant="outline">
        <Plus /> {t("string")}
      </Button>
      <Button onClick={() => onAdd("text")} variant="outline">
        <Plus /> {t("text")}
      </Button>
      <Button onClick={() => onAdd("int")} variant="outline">
        <Plus /> {t("int")}
      </Button>
      <Button onClick={() => onAdd("checkbox")} variant="outline">
        <Plus /> {t("checkbox")}
      </Button>
    </div>
  );
}
