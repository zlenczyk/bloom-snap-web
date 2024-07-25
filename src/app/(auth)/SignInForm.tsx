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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      console.error(signInData.error);
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <div className="bg-slate-200 p-10 rounded-lg max-w-80 w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
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
          </div>
          <Button className="w-full mb-2 mt-4" type="submit">
            Submit
          </Button>
        </form>
        <div className="flex items-center">
          <Separator className="my-4 mr-4 bg-slate-400" decorative={true} />
          or
          <Separator className="my-4 ml-4 bg-slate-400" decorative={true} />
        </div>
        <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Not a member?{" "}
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            href="/sign-up"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
