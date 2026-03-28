import { cloudinary } from "../config/cloudinary.js";

export const uploadImage = (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buffer);
  });
};

export const deleteImage = async (url: string): Promise<void> => {
  const publicId = url.split("/").slice(-2).join("/").split(".")[0];
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};