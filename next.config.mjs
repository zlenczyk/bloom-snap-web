/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Signed URLs of plant photos in the private Vercel Blob store
      { protocol: "https", hostname: "*.private.blob.vercel-storage.com" },
      // Google account avatars
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
