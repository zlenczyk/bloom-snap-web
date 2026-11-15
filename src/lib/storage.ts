import {
  del,
  issueSignedToken,
  presignUrl,
  type IssuedSignedToken,
} from "@vercel/blob";

// Plant photos live in a private Vercel Blob store. The database keeps only
// the blob pathname; the browser gets time-limited signed URLs.

const SIGNED_URL_WINDOW_MS = 6 * 60 * 60 * 1000; // 6 hours

let cachedReadToken: IssuedSignedToken | null = null;

const getReadToken = async (validUntil: number): Promise<IssuedSignedToken> => {
  if (cachedReadToken && cachedReadToken.validUntil >= validUntil) {
    return cachedReadToken;
  }

  cachedReadToken = await issueSignedToken({
    pathname: "*",
    operations: ["get"],
    validUntil: validUntil + 2 * SIGNED_URL_WINDOW_MS,
  });

  return cachedReadToken;
};

export const createSignedPhotoUrls = async (
  pathnames: string[]
): Promise<string[]> => {
  if (pathnames.length === 0) {
    return [];
  }

  // Expiry is rounded to a 6-hour boundary (links stay valid for 6-12 hours),
  // so the same photo keeps the same URL between renders and can be cached.
  const validUntil =
    (Math.floor(Date.now() / SIGNED_URL_WINDOW_MS) + 2) * SIGNED_URL_WINDOW_MS;

  const token = await getReadToken(validUntil);

  return Promise.all(
    pathnames.map(async (pathname) => {
      const { presignedUrl } = await presignUrl(token, {
        operation: "get",
        pathname,
        access: "private",
        validUntil,
      });

      return presignedUrl;
    })
  );
};

export const deletePhotos = async (pathnames: string[]): Promise<void> => {
  if (pathnames.length === 0) {
    return;
  }

  await del(pathnames);
};
