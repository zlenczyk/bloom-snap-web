"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ErrorMessage from "../(auth)/ErrorMessage";
import { PasswordSchema, UserNameSchema } from "../(auth)/sign-up/schema";
import {
  changePassword,
  deleteAccount,
  updateAvatar,
  updateUsername,
} from "./actions";
import { AVATAR_PRESETS, AvatarPreset, AvatarSchema } from "./types";

interface EditProfileFormProps {
  createdAt: string;
  image: string | null;
  isSocialLogin: boolean;
  plantsCount: number;
  userName: string;
}

const initialUserState = {
  success: false,
  message: "",
  errors: {},
};

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

type AvatarFormValues = z.infer<typeof AvatarSchema>;

export default function EditProfileForm({
  createdAt,
  image,
  isSocialLogin,
  plantsCount,
  userName,
}: EditProfileFormProps) {
  const [avatar, setAvatar] = useState<string | null>(image ?? null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [usernameState, updateUsernameAction, usernamePending] = useActionState(
    updateUsername,
    initialUserState
  );
  const [passwordState, changePasswordAction, passwordPending] = useActionState(
    changePassword,
    initialUserState
  );

  const [avatarState, updateAvatarAction, avatarPending] = useActionState(
    updateAvatar,
    initialUserState
  );

  const router = useRouter();

  const usernameForm = useForm<z.infer<typeof UserNameSchema>>({
    defaultValues: { userName: userName },
  });

  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const avatarForm = useForm<z.infer<typeof AvatarSchema>>({
    defaultValues: { avatar: avatar as AvatarPreset },
  });

  const handlePassword: SubmitHandler<PasswordFormValues> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    startTransition(() => changePasswordAction(formData));
  };

  const handleAvatar: SubmitHandler<AvatarFormValues> = (data) => {
    const formData = new FormData();

    formData.append("avatar", data.avatar ?? "");

    startTransition(() => updateAvatarAction(formData));
  };

  const handleDeleteAccount = async () => {
    const { success } = await deleteAccount();

    if (success) {
      router.replace("/sign-in");

      toast.success("Account deleted successfully");

      return;
    }

    toast.error("Failed to delete account");
  };

  useEffect(() => {
    if (!avatarState.message) {
      return;
    }

    if (avatarState.success) {
      setAvatar(avatarState.avatar ?? null);

      startTransition(() => {
        router.refresh();
      });

      toast.success(avatarState.message);
    } else {
      toast.error(avatarState.message);
    }
  }, [avatarState]);

  useEffect(() => {
    if (!usernameState.message) {
      return;
    }

    if (usernameState.success) {
      toast.success(usernameState.message);

      startTransition(() => {
        router.refresh();
      });
    } else {
      toast.error(usernameState.message);
    }
  }, [usernameState]);

  useEffect(() => {
    if (!passwordState.message) {
      return;
    }

    if (passwordState.success) {
      toast.success(passwordState.message);
    } else {
      toast.error(passwordState.message);
    }
  }, [passwordState]);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl sm:text-7xl font-bold select-none">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold">{userName}</h2>
          <p className="text-sm md:text-md text-gray-500 mt-1">
            Member since: {new Date(createdAt).toLocaleDateString()}
          </p>

          <p className="text-sm font-semibold md:text-md mt-1 flex items-center justify-center gap-1 text-green-700">
            <span className="text-lg">🪴</span>
            {plantsCount} plants owned
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="rounded-2xl shadow-md border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Update Username
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...usernameForm}>
                <form
                  onSubmit={usernameForm.handleSubmit((data) =>
                    startTransition(() => updateUsernameAction(data.userName))
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={usernameForm.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <ErrorMessage
                          messages={usernameState.errors?.userName || []}
                        />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={usernamePending}
                    className="w-full"
                  >
                    {usernamePending ? "Saving..." : "Save Nickname"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {!isSocialLogin && (
            <Card className="rounded-2xl shadow-md border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePassword)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <ErrorMessage
                            messages={passwordState.errors?.password || []}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <ErrorMessage
                            messages={
                              passwordState.errors?.confirmPassword || []
                            }
                          />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={passwordPending}
                      className="w-full"
                    >
                      {passwordPending ? "Saving..." : "Change Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-2xl shadow-md border border-red-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                ⚠️ Delete Account
              </CardTitle>
              <CardDescription>
                This action will permanently remove your account and all
                associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setOpenDeleteDialog(true)}
                type="button"
                variant="destructive"
                className="w-full"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogContent className="rounded-lg">
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  You’re about to permanently delete your account including your
                  digital plant collection. We hope at least your real plants
                  survive…
                  <br />
                  <br />
                  ⚠️ This action cannot be undone!
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpenDeleteDialog(false)}
                >
                  Cancel
                </Button>

                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, delete my account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-2xl shadow-md border h-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Choose Avatar
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-6">
            <Form {...avatarForm}>
              <form
                onSubmit={avatarForm.handleSubmit(handleAvatar)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
                  {AVATAR_PRESETS.map((avatar) => (
                    <img
                      key={avatar}
                      src={avatar}
                      alt={avatar}
                      onClick={() => avatarForm.setValue("avatar", avatar)}
                      className={`w-30 h-30 rounded-full object-cover cursor-pointer transition-all hover:scale-105 shadow-md ${
                        avatarForm.watch("avatar") === avatar
                          ? "ring-3 ring-green-600 ring-offset-3 ring-offset-white"
                          : "ring-0"
                      }`}
                    />
                  ))}
                  <input type="hidden" {...avatarForm.register("avatar")} />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={avatarPending}
                    className="w-full"
                  >
                    {avatarPending ? "Saving..." : "Save Avatar"}
                  </Button>

                  <Button
                    type="submit"
                    variant="outline"
                    disabled={avatarPending || !avatarState.avatar}
                    onClick={() => avatarForm.setValue("avatar", null)}
                    className="w-full"
                  >
                    Remove Avatar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
