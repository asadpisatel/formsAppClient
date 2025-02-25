"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "@/utils/axiosInstance";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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
  const t = useTranslations("menu");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/get-latest");
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

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
