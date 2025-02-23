/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { QuestionItem } from "./questionItem";
import { AddQuestion } from "./addQuestion";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import axios from "@/utils/axiosInstance";
import { useTranslations } from "next-intl";
import {
  Question,
  MAX_QUESTIONS_PER_TYPE,
  transformFromApi,
  transformToApi,
} from "@/utils/transformationData";
import { toast } from "sonner";

export function EditQuestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("template_page");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/template/${id}/questions`);
        setQuestions(transformFromApi(res.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

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

  const handleSave = async () => {
    try {
      await axios.put(`/template/${id}/questions`, transformToApi(questions));
      toast.success(t("success"));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      <h2 className="text-2xl font-semibold">{t("questions")}</h2>
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
      <Button onClick={handleSave}>{t("save")}</Button>
    </div>
  );
}
