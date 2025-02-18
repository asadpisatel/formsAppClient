"use client";
import PersonalTemplates from "@/components/templates/personalTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("my_forms");
  return (
    <Tabs defaultValue="templates" className="">
      <TabsList>
        <TabsTrigger value="templates">{t("templates")}</TabsTrigger>
        <TabsTrigger value="forms">{t("responses")}</TabsTrigger>
      </TabsList>
      <TabsContent value="templates">
        <PersonalTemplates />
      </TabsContent>
      <TabsContent value="forms">Forms</TabsContent>
    </Tabs>
  );
};

export default Page;
