"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../ErrorMessage";
import GoogleSignInButton from "../GoogleSignInButton";
import { authenticateCredentials } from "./actions";

const FormSchema = z.object({
  email: z.email("Invalid email").min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const [errorMessage, formAction, isPending] = useActionState(
    authenticateCredentials,
    undefined
  );

  return (
    <Form {...form}>
      <div
        className="bg-white p-8 sm:p-10 sm:pb-4 sm:rounded-xl overflow-y-auto shadow-xl
             bg-gradient-to-br from-green-500/40 to-white
             w-full sm:max-h-[40rem] sm:max-w-md sm:mx-auto mobile-full-h"
      >
        <div className="text-3xl sm:text-4xl font-extrabold text-green-700 italic mb-8">
          BloomSnap
        </div>

        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    autoComplete="on"
                    className="w-full bg-white"
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
                  <Input
                    {...field}
                    type="password"
                    autoComplete="on"
                    className="w-full bg-white"
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {errorMessage ? <ErrorMessage messages={[errorMessage]} /> : null}
            <Button
              type="submit"
              className="w-full py-3 text-white mt-6"
              aria-disabled={isPending}
            >
              {isPending ? "Submitting" : "Log In"}
            </Button>
          </div>
        </form>

        <div className="flex items-center my-3">
          <Separator className="flex-1 bg-gray-300" decorative />
          <span className="mx-2 text-gray-400">or</span>
          <Separator className="flex-1 bg-gray-300" decorative />
        </div>

        <GoogleSignInButton>Sign in with Google</GoogleSignInButton>

        <p className="text-sm text-gray-500 text-center mt-6 mb-2">
          Not a member?{" "}
          <Link
            href="/sign-up"
            className="underline text-emerald-600 hover:text-emerald-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
