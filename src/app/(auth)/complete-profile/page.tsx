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
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../ErrorMessage";
import { UserNameSchema } from "../sign-up/schema";
import { completeProfile, CompleteProfileActionFormState } from "./actions";

const initialState: CompleteProfileActionFormState = {
  errors: {},
  message: "",
  success: false,
};

const CompleteProfileForm = () => {
  const [state, formAction, isPending] = useActionState<
    CompleteProfileActionFormState,
    FormData
  >(completeProfile, initialState);

  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      userName: "",
    },
  });

  return (
    <Form {...form}>
      <div
        className="bg-white p-8 sm:p-10 sm:pb-4 sm:rounded-xl overflow-y-auto shadow-xl
             bg-gradient-to-br from-green-500/40 to-white
             w-full sm:max-h-[40rem] sm:max-w-md sm:mx-auto mobile-full-h"
      >
        <div className="text-3xl sm:text-4xl font-extrabold text-green-700 italic mb-4">
          BloomSnap
        </div>
        <p className="text-gray-700 text-lg sm:text-base mb-8">
          Almost done! Pick a cool username that’s all yours{" "}
          <span className="inline-block">😎</span>
        </p>

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

          {!state?.errors && state.message && (
            <ErrorMessage messages={[state.message]} />
          )}

          <Button
            type="submit"
            className="w-full py-3 text-white my-4"
            aria-disabled={isPending}
          >
            {isPending ? "Submitting" : "Sign up"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default CompleteProfileForm;
