"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

const minPassLen = 2;

const schema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(minPassLen),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

type FormFields = z.infer<typeof schema>;

const Page = () => {
  const t = useTranslations("signup");
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",

      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await axios.post("/user/registration", values);
      window.location.href = "/"
    } catch (error) {
      if ((error as AxiosError).status === 409) {
        form.setError("email", {
          message: "This email is already taken",
        });
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-full">
      <h2 className="text-3xl">{t("title")}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password_confirm")}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full">
            {form.formState.isSubmitting ? t("loading") + "..." : t("submit")}
          </Button>
        </form>
      </Form>
      <p>
        {t("text")}{" "}
        <Link href="/login" className="text-blue-700 underline">
          {t("link")}
        </Link>
      </p>
    </div>
  );
};

export default Page;
