"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import GeneralSettings from "@/components/generalSettings";
import { EditQuestions } from "@/components/createTemplate/editTemplate";
import TemplateFIlling from "@/components/templateFilling";
import { toast } from "sonner";
import { AxiosError } from "axios";

const Page = () => {
  const t = useTranslations("template_page");
  const { id } = useParams();
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTemplate() {
      try {
        const res = await axios.post("/template/check", { id });
        setIsAuthor(res.data.isAuthor);
      } catch (error) {
        if ((error as AxiosError).status === 401) {
          toast.error(t("401"));
        }
      } finally {
        setLoading(false);
      }
    }

    checkTemplate();
  }, [id]);

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <>
      {isAuthor && (
        <Tabs defaultValue="general settings" className="">
          <TabsList>
            <TabsTrigger value="general settings">
              {t("general_settings")}
            </TabsTrigger>
            <TabsTrigger value="questions">{t("questions")}</TabsTrigger>
            <TabsTrigger value="responses">{t("responses")}</TabsTrigger>
          </TabsList>
          <TabsContent value="general settings">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="questions">
            <EditQuestions />
          </TabsContent>
          <TabsContent value="responses">responses</TabsContent>
        </Tabs>
      )}

      {!isAuthor && (
        <div>
          <TemplateFIlling />
        </div>
      )}
    </>
  );
};

export default Page;
