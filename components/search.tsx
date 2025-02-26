"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const t = useTranslations("home");

  function onSearch(event: React.FormEvent) {
    event.preventDefault();

    const encodedSearchValue = encodeURI(searchValue);
    router.push(`/search?q=${encodedSearchValue}`);
  }

  return (
    <form onSubmit={onSearch}>
      <Input
        placeholder={`${t("search")}...`}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </form>
  );
};

export default Search;
