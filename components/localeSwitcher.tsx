import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useTranslations } from "next-intl";

const LocaleSWitcher = () => {
  const t = useTranslations("profile");

  function handleSwitch(value: string) {
    const locale = value as Locale;
    setUserLocale(locale);
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t("language")}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem onClick={() => handleSwitch("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSwitch("ru")}>
          Русский
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default LocaleSWitcher;
