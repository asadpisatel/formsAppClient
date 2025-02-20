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

const MAX_QUESTIONS_PER_TYPE = 4;

export type Question = {
  id: string;
  type: "string" | "text" | "int" | "checkbox";
  text: string;
};

const transformFromApi = (data: any): Question[] => {
  const questions: Question[] = [];
  for (let i = 1; i <= MAX_QUESTIONS_PER_TYPE; i++) {
    if (data[`customString${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "string",
        text: data[`customString${i}Question`] || "",
      });
    }
    if (data[`customText${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "text",
        text: data[`customText${i}Question`] || "",
      });
    }
    if (data[`customInt${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "int",
        text: data[`customInt${i}Question`] || "",
      });
    }
    if (data[`customCheckbox${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "checkbox",
        text: data[`customCheckbox${i}Question`] || "",
      });
    }
  }
  return questions;
};

const transformToApi = (questions: Question[]) => {
  const data: any = {};
  for (let i = 1; i <= MAX_QUESTIONS_PER_TYPE; i++) {
    data[`customString${i}State`] = false;
    data[`customString${i}Question`] = null;
    data[`customText${i}State`] = false;
    data[`customText${i}Question`] = null;
    data[`customInt${i}State`] = false;
    data[`customInt${i}Question`] = null;
    data[`customCheckbox${i}State`] = false;
    data[`customCheckbox${i}Question`] = null;
  }

  let stringIndex = 1,
    textIndex = 1,
    intIndex = 1,
    checkboxIndex = 1;

  questions.forEach(({ type, text }) => {
    if (type === "string" && stringIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customString${stringIndex}State`] = true;
      data[`customString${stringIndex}Question`] = text;
      stringIndex++;
    } else if (type === "text" && textIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customText${textIndex}State`] = true;
      data[`customText${textIndex}Question`] = text;
      textIndex++;
    } else if (type === "int" && intIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customInt${intIndex}State`] = true;
      data[`customInt${intIndex}Question`] = text;
      intIndex++;
    } else if (type === "checkbox" && checkboxIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customCheckbox${checkboxIndex}State`] = true;
      data[`customCheckbox${checkboxIndex}Question`] = text;
      checkboxIndex++;
    }
  });
  return data;
};

export function EditQuestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

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
      alert("Success");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
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
      <Button onClick={handleSave}>Сохранить</Button>
    </div>
  );
}
