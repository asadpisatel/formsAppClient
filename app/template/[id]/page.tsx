"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const t = useTranslations("template_page");
  const { id } = useParams();
  const { user } = useAuthStore();
  const [isAuthor, setIsAuthor] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);

  useEffect(() => {
    async function checkTemplate() {
      try {
        const res = await axios.post("/template/check", { id });
        setIsAuthor(res.data.isAuthor);
        setHasResponse(res.data.hasResponse);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) checkTemplate();
  }, [id, user]);

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
            general_settings {id}
          </TabsContent>
          <TabsContent value="questions">questions</TabsContent>
          <TabsContent value="responses">responses</TabsContent>
        </Tabs>
      )}

      {!isAuthor && !hasResponse && <div>empty forms</div>}

      {!isAuthor && hasResponse && <div>full forms</div>}
    </>
  );
};

export default Page;
