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

const minPassLen = 2;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(minPassLen),
});

type FormFields = z.infer<typeof schema>;

const Page = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(values);
    } catch (error) {
      form.setError("password", {
        message: "The password is wrong",
      });
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen p-4">
      <h2 className="text-3xl">Login</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <p>
        Don&apos;t have an account?
        <Link href="/registration" className="text-blue-700 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Page;
