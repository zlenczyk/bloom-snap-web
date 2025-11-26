"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const uploadImageToStorage = async (
  file: File,
  userId: string
): Promise<string | null> => {
  const path = `${userId}/${crypto.randomUUID()}-${file.name}`;
  
  const { error } = await supabaseAdmin.storage
    .from("bloomsnap-plant-photos")
    .upload(path, file, { upsert: false });

  if (error) {
    console.error("Supabase upload error:", error);
    return null;
  }

  return path;
};

export default uploadImageToStorage;
