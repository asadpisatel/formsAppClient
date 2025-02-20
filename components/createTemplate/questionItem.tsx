"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Question } from "./templateForm";
import { GripVertical, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

type QuestionItemProps = {
  question: Question;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export function QuestionItem({
  question,
  onChange,
  onDelete,
}: QuestionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const styles = {
    touchAction: "none",
  };

  const t = useTranslations("create_template");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 border rounded">
      <Input
        value={question.text}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={t("hint")}
      />
      <Button variant="destructive" onClick={() => onDelete(question.id)}>
        <Trash2 />
      </Button>
      <Button variant="outline" style={styles} {...attributes} {...listeners}>
        <GripVertical />
      </Button>
    </div>
  );
}
