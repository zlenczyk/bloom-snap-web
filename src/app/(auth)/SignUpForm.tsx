"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import GoogleSignInButton from "./GoogleSignInButton";
import signUp, { type SignUpFormState } from "./sign-up/actions";
import { SignUpFormSchema } from "./sign-up/schema";

const initialState: SignUpFormState = {
  errors: {},
  message: "",
  success: false,
};

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState<
    SignUpFormState,
    FormData
  >(signUp, initialState);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SucculentSage99"
                    autoComplete="on"
                    className="w-full bg-white"
                    {...field}
                  />
                </FormControl>
                <ErrorMessage messages={state?.errors?.userName || []} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="cactus.caretaker@example.com"
                    type="email"
                    autoComplete="on"
                    className="w-full bg-white"
                    {...field}
                  />
                </FormControl>
                <ErrorMessage messages={state?.errors?.email || []} />
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
                    type="password"
                    placeholder="********"
                    {...field}
                    autoComplete="off"
                    className="w-full bg-white"
                  />
                </FormControl>
                <ErrorMessage messages={state?.errors?.password || []} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    autoComplete="off"
                    className="w-full bg-white"
                    placeholder="********"
                  />
                </FormControl>
                <ErrorMessage messages={state?.errors?.confirmPassword || []} />
              </FormItem>
            )}
          />
          {!state?.errors && state.message && (
            <ErrorMessage messages={[state.message]} />
          )}

          <Button
            type="submit"
            className="w-full py-3 text-white mt-6"
            aria-disabled={isPending}
          >
            {isPending ? "Submitting" : "Sign up"}
          </Button>
        </form>

        <div className="flex items-center my-3">
          <Separator className="flex-1 bg-gray-300" decorative />
          <span className="mx-2 text-gray-400">or</span>
          <Separator className="flex-1 bg-gray-300" decorative />
        </div>

        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>

        <p className="text-sm text-gray-500 mt-6 mb-2 text-center">
          Already a member?{" "}
          <Link
            className="underline text-emerald-600 hover:text-emerald-500"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
