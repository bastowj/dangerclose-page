import { cache } from "react";
import path from "node:path";
import sharp from "sharp";

/** Read the intrinsic size of an image served from public/. */
export const getImageDimensions = cache(async (src: string) => {
  if (!src.startsWith("/") || src.startsWith("//")) {
    throw new Error(`Image source must be a local public path: ${src}`);
  }

  const publicDir = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicDir, `.${src}`);
  if (!filePath.startsWith(`${publicDir}${path.sep}`)) {
    throw new Error(`Image source must be inside public/: ${src}`);
  }

  const { width, height } = await sharp(filePath).metadata();
  if (!width || !height) {
    throw new Error(`Could not read image dimensions: ${src}`);
  }

  return { width, height };
});
