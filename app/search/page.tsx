"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

type User = {
  name: string;
};

type Template = {
  id: string;
  title: string;
  description: string;
  user: User;
};

const Page = () => {
  const [loading, setLoading] = useState(true);
  const t = useTranslations("home");
  const search = useSearchParams();
  const searchValue = search ? search.get("q") : "";

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      if (!searchValue) return;
      try {
        const encodedSearchValue = encodeURIComponent(searchValue.trim());
        const res = await axios.get(`/search?q=${encodedSearchValue}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchValue]);

  if (loading) return <p>{t("loading")}...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {data.map((item: Template, index) => (
        <Card key={index} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>
              <Link
                className="hover:underline underline-offset-4"
                href={`/template/${item.id}`}>
                {item.title}
              </Link>
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <i>
              {t("author")}: {item.user.name}
            </i>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Page;
