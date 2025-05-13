import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "druvwjxzv",
  api_key: "574134763212944",
  api_secret: "SH2N1lxtqXtkJFtL8JiGz3QTeLc",
});

const uploadFile = async (localPath) => {
  try {
    if (!localPath) return null;

    const res = await cloudinary.uploader.upload(localPath);

    fs.unlinkSync(localPath);
    return res.url;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.error("Cloudinary Single File Error :", error);
  }
};

const uploadMultipleFiles = async (imagePaths) => {
  try {
    if (imagePaths.length === 0) return [];

    const uploadPromises = imagePaths.map((imagePath) => {
      return cloudinary.uploader.upload(imagePath);
    });

    const results = await Promise.all(uploadPromises);

    imagePaths.forEach((image) => {
      fs.unlinkSync(image);
    });

    return results.map((res) => res.url);
  } catch (error) {
    console.error("Cloudinary Multiple File Error :", error);
    imagePaths.forEach((image) => {
      fs.unlinkSync(image);
    });
    return null;
  }
};

export { uploadFile, uploadMultipleFiles };
