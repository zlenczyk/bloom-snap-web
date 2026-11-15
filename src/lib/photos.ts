// Shared by the browser (direct uploads) and the server (validation).

export const ALLOWED_PHOTO_EXTENSIONS = /\.(jpe?g|png|webp|avif|heic|heif)$/i;

export const ALLOWED_PHOTO_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
];

export const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

const sanitizeFileName = (fileName: string): string =>
  fileName
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9._-]+/g, "_")
    .slice(-100);

// Every user uploads into their own folder, which is what the server checks.
export const buildPhotoPath = (userId: string, fileName: string): string =>
  `${userId}/${crypto.randomUUID()}-${sanitizeFileName(fileName)}`;

export const isOwnPhotoPath = (path: string, userId: string): boolean =>
  path.startsWith(`${userId}/`) &&
  !path.includes("..") &&
  ALLOWED_PHOTO_EXTENSIONS.test(path);
