"use client";

import { useState } from "react";
import { deleteAccount, updatePassword, updateProfile } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface EditProfileFormProps {
  userName: string;
}

export default function EditProfileForm({ userName }: EditProfileFormProps) {
  const [nickname, setNickname] = useState(userName || "");
  const [password, setPassword] = useState("");
  const [loadingNickname, setLoadingNickname] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Update nickname
  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingNickname(true);
      await updateProfile(nickname); // use the input value!
      toast.success("Nickname updated successfully!");
    } catch (error: any) {
      toast.error("Error updating nickname: " + (error.message || error));
    } finally {
      setLoadingNickname(false);
    }
  };

  // Change password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingPassword(true);
      await updatePassword(password);
      toast.success("Password changed successfully!");
      setPassword("");
    } catch (error: any) {
      toast.error("Error changing password: " + (error.message || error));
    } finally {
      setLoadingPassword(false);
    }
  };

  // Delete account
  const handleDeleteSubmit = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      setLoadingDelete(true);
      await deleteAccount();
      toast.success("Account deleted successfully!");
      // optionally redirect user
    } catch (error: any) {
      toast.error("Error deleting account: " + (error.message || error));
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Update Nickname Form */}
      <Card>
        <CardHeader>
          <CardTitle>Update Nickname</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNicknameSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter new nickname"
              />
            </div>
            <Button type="submit" disabled={loadingNickname}>
              {loadingNickname ? "Saving..." : "Save Nickname"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password Form */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              disabled={loadingPassword}
            >
              {loadingPassword ? "Saving..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account Form */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleDeleteSubmit}
            variant="destructive"
            className="w-full"
            disabled={loadingDelete}
          >
            {loadingDelete ? "Deleting..." : "Delete Account"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
