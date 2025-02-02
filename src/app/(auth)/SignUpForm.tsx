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
import SignUpFormSchema from "./sign-up/schema";

const initialState: SignUpFormState = {
  isError: false,
};

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState<
    SignUpFormState,
    FormData
  >(signUp, initialState);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  type ErrorMessageTypeProps = {
    inputName: "username" | "email" | "password" | "confirmPassword";
  };

  const FormInputErrorMessage = ({ inputName }: ErrorMessageTypeProps) => {
    const messages =
      state.isError && state.inputErrors && state.inputErrors[inputName];

    if (!messages) {
      return null;
    }

    return <ErrorMessage messages={messages} />;
  };

  const FormSubmitErrorMessage = () => {
    const message = state.isError && !state.inputErrors && state.message;

    if (!message) {
      return null;
    }

    return <ErrorMessage messages={[message]} />;
  };

  return (
    <Form {...form}>
      <div className="bg-slate-200 p-10 rounded-lg max-w-80 w-full">
        <form action={formAction}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SucculentSage99"
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormInputErrorMessage inputName="username" />
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
                      {...field}
                    />
                  </FormControl>
                  <FormInputErrorMessage inputName="email" />
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
                    <Input type="password" {...field} autoComplete="off" />
                  </FormControl>
                  <FormInputErrorMessage inputName="password" />
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
                    <Input type="password" {...field} autoComplete="off" />
                  </FormControl>
                  <FormInputErrorMessage inputName="confirmPassword" />
                </FormItem>
              )}
            />
          </div>
          <FormSubmitErrorMessage />
          <Button className="w-full mb-2 mt-4" type="submit">
            {isPending ? "Submitting" : "Sign up"}
          </Button>
        </form>
        <div className="flex items-center">
          <Separator className="my-4 mr-4 bg-slate-400" decorative={true} />
          or
          <Separator className="my-4 ml-4 bg-slate-400" decorative={true} />
        </div>
        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Already a member?{" "}
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
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
