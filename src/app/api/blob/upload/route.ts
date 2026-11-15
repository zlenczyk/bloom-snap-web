import { auth } from "@/auth";
import {
  ALLOWED_PHOTO_CONTENT_TYPES,
  isOwnPhotoPath,
  MAX_PHOTO_SIZE_BYTES,
} from "@/lib/photos";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Issues short-lived upload tokens so the browser can send photos straight to
// the Blob store instead of through a Server Action (4.5 MB request limit).
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = await auth();

        if (!session?.user?.id) {
          throw new Error("Not authenticated");
        }

        if (!isOwnPhotoPath(pathname, session.user.id)) {
          throw new Error("Invalid upload path");
        }

        return {
          allowedContentTypes: ALLOWED_PHOTO_CONTENT_TYPES,
          maximumSizeInBytes: MAX_PHOTO_SIZE_BYTES,
          addRandomSuffix: false,
        };
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
