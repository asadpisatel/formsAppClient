"use client";
import { Button } from "@/components/ui/button";

type AddQuestionProps = {
  onAdd: (type: "string" | "text" | "int" | "checkbox") => void;
};

export function AddQuestion({ onAdd }: AddQuestionProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => onAdd("string")} variant="outline">
        Добавить короткий ответ
      </Button>
      <Button onClick={() => onAdd("text")} variant="outline">
        Добавить развернутый ответ
      </Button>
      <Button onClick={() => onAdd("int")} variant="outline">
        Добавить число
      </Button>
      <Button onClick={() => onAdd("checkbox")} variant="outline">
        Добавить флажок
      </Button>
    </div>
  );
}
