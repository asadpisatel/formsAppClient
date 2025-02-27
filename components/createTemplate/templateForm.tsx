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
import {
  Question,
  MAX_QUESTIONS_PER_TYPE,
  transformToApi,
} from "@/utils/transformationData";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  topic: z.string().default("Another"),
});

export function TemplateForm() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const t = useTranslations("create_template");
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "Another",
    },
  });

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

  async function onSubmit(data: any) {
    try {
      await axios.post("/template/create", {
        ...data,
        userId: user?.id,
        ...transformToApi(questions),
      });
      toast.success(t("success"));
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        toast.error(t("401"));
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      <h2 className="text-2xl font-semibold">{t("create_template")}</h2>
      <Input placeholder={t("title")} {...register("title")} />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
      <Textarea placeholder={t("description")} {...register("description")} />
      <Select
        onValueChange={(val) => setValue("topic", val)}
        defaultValue="Another">
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
      <Button onClick={handleSubmit(onSubmit)}>{t("save")}</Button>
    </div>
  );
}
