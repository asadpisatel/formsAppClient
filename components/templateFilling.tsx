/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Question } from "./createTemplate/templateForm";
import { transformFromApi } from "./createTemplate/editTemplate";
import axios from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useAuthStore } from "@/store/authStore";

function transformResponses(data: any) {
  const transformed: any = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith("customString")) {
      transformed[`${key}Answer`] = value || null;
    } else if (key.startsWith("customText")) {
      transformed[`${key}Answer`] = value || null;
    } else if (key.startsWith("customInt")) {
      transformed[`${key}Answer`] = value !== "" ? Number(value) : null;
    } else if (key.startsWith("customCheckbox")) {
      transformed[`${key}Answer`] = value === "yes";
    }
  });

  return transformed;
}

const TemplateFIlling = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const form = useForm<Record<string, any>>({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(true);
  const t = useTranslations("template_page");

  useEffect(() => {
    if (questions.length > 0) {
      form.reset(
        questions.reduce((acc: any, q) => {
          acc[q.id] = "";
          return acc;
        }, {})
      );
    }
  }, [questions, form]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/template/${id}/questions`);

        setTitle(res.data.title);
        setDescription(res.data.description);
        setQuestions(transformFromApi(res.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  async function onSubmit(data: any) {
    const responses = {
      templateId: id,
      userId: user?.id,
      ...transformResponses(data),
    };

    console.log(data);

    try {
      await axios.post(`/response/${id}/fill`, responses);
      alert("Success");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      <div className="border rounded p-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {questions.map((q) => (
            <FormField
              key={q.id}
              control={form.control}
              name={String(q.id)}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{q.text}</FormLabel>
                  <FormControl>
                    {q.type === "string" ? (
                      <Input {...field} type="text" value={field.value ?? ""} />
                    ) : q.type === "text" ? (
                      <Textarea {...field} value={field.value ?? ""} />
                    ) : q.type === "int" ? (
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                      />
                    ) : (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || "yes"}
                        className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </div>
  );
};

export default TemplateFIlling;
