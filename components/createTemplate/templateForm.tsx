/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { QuestionItem } from "./questionItem";
import { AddQuestion } from "./addQuestion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

const MAX_QUESTIONS_PER_TYPE = 4;

export type Question = {
  id: string;
  type: "string" | "text" | "int" | "checkbox";
  text: string;
};

type TemplateFormProps = {
  onSave: (data: any) => void;
};

export function TemplateForm({ onSave }: TemplateFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Another");
  const [questions, setQuestions] = useState<Question[]>([]);
  const t = useTranslations("create_template");

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setQuestions((prev) => {
      const oldIndex = prev.findIndex((q) => q.id === active.id);
      const newIndex = prev.findIndex((q) => q.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleAddQuestion = (type: Question["type"]) => {
    const typeCount = questions.filter((q) => q.type === type).length;
    if (typeCount >= MAX_QUESTIONS_PER_TYPE) return;
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type, text: "" },
    ]);
  };

  const handleQuestionChange = (id: string, text: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    const formattedData: any = {
      title,
      description,
      topic,
      customString1State: false,
      customString1Question: null,
      customString2State: false,
      customString2Question: null,
      customString3State: false,
      customString3Question: null,
      customString4State: false,
      customString4Question: null,

      customText1State: false,
      customText1Question: null,
      customText2State: false,
      customText2Question: null,
      customText3State: false,
      customText3Question: null,
      customText4State: false,
      customText4Question: null,

      customInt1State: false,
      customInt1Question: null,
      customInt2State: false,
      customInt2Question: null,
      customInt3State: false,
      customInt3Question: null,
      customInt4State: false,
      customInt4Question: null,

      customCheckbox1State: false,
      customCheckbox1Question: null,
      customCheckbox2State: false,
      customCheckbox2Question: null,
      customCheckbox3State: false,
      customCheckbox3Question: null,
      customCheckbox4State: false,
      customCheckbox4Question: null,
    };

    let stringIndex = 1;
    let textIndex = 1;
    let intIndex = 1;
    let checkboxIndex = 1;

    questions.forEach(({ type, text }) => {
      if (type === "string" && stringIndex <= MAX_QUESTIONS_PER_TYPE) {
        formattedData[`customString${stringIndex}State`] = true;
        formattedData[`customString${stringIndex}Question`] = text;
        stringIndex++;
      } else if (type === "text" && textIndex <= MAX_QUESTIONS_PER_TYPE) {
        formattedData[`customText${textIndex}State`] = true;
        formattedData[`customText${textIndex}Question`] = text;
        textIndex++;
      } else if (type === "int" && intIndex <= MAX_QUESTIONS_PER_TYPE) {
        formattedData[`customInt${intIndex}State`] = true;
        formattedData[`customInt${intIndex}Question`] = text;
        intIndex++;
      } else if (
        type === "checkbox" &&
        checkboxIndex <= MAX_QUESTIONS_PER_TYPE
      ) {
        formattedData[`customCheckbox${checkboxIndex}State`] = true;
        formattedData[`customCheckbox${checkboxIndex}Question`] = text;
        checkboxIndex++;
      }
    });

    onSave(formattedData);
  };

  return (
    <div className="space-y-4 p-4 shadow rounded-lg">
      <Input
        placeholder={t("title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder={t("description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select value={topic} onValueChange={setTopic}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="General">{t("general")}</SelectItem>
          <SelectItem value="Business">{t("business")}</SelectItem>
          <SelectItem value="Education">{t("education")}</SelectItem>
          <SelectItem value="Quiz">{t("quiz")}</SelectItem>
          <SelectItem value="Test">{t("test")}</SelectItem>
          <SelectItem value="Another">{t("another")}</SelectItem>
        </SelectContent>
      </Select>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}>
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              onChange={handleQuestionChange}
              onDelete={() => handleDeleteQuestion(q.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <AddQuestion onAdd={handleAddQuestion} />
      <Button onClick={handleSubmit}>{t("save")}</Button>
    </div>
  );
}
