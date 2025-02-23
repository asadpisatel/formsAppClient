"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import axios from "@/utils/axiosInstance";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const topics = [
  "General",
  "Business",
  "Education",
  "Quiz",
  "Test",
  "Another",
] as const;

const GeneralSettingsSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  topic: z.enum(topics),
});

type GeneralSettingsForm = z.infer<typeof GeneralSettingsSchema>;

const GeneralSettings = () => {
  const { id } = useParams();
  const t = useTranslations("template_page");
  const [loading, setLoading] = useState(true);

  const form = useForm<GeneralSettingsForm>({
    resolver: zodResolver(GeneralSettingsSchema),
    defaultValues: { title: "", description: "", topic: "Another" },
  });

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const res = await axios.get(`/template/${id}/general-settings`);
        form.reset(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTemplate();
  }, [id, form]);

  const onSubmit = async (data: GeneralSettingsForm) => {
    try {
      await axios.put(`/template/${id}/general-settings`, data);
      toast.success(t("success"));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      <h2 className="text-2xl font-semibold">{t("general_settings")}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title">{t("title")}</Label>
                <FormControl>
                  <Input id="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="description">{t("description")}</Label>
                <FormControl>
                  <Textarea id="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="topic">{t("topic")}</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="topic">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General">{t("general")}</SelectItem>
                    <SelectItem value="Business">{t("business")}</SelectItem>
                    <SelectItem value="Education">{t("education")}</SelectItem>
                    <SelectItem value="Quiz">{t("quiz")}</SelectItem>
                    <SelectItem value="Test">{t("test")}</SelectItem>
                    <SelectItem value="Another">{t("another")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full">
            {form.formState.isSubmitting ? t("save") + "..." : t("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettings;
