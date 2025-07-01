"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import axios from "axios";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // optional validation of file
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("file size must be below less than 100mb");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || ~validateFile(file)) return;
    setUploading(true);
    setError(null);
    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const uploadResponse = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const precent = (event.loaded / event.total) * 100;
            onProgress(Math.round(precent));
          }
        },
      });
      onSuccess(uploadResponse);
    } catch (error) {
      console.error("upload failed: ", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      {/* File input element using React ref */}
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        placeholder="Upload File"
        onChange={handleUpload}
        className="border w-100 px-3 py-2 rounded-xl cursor-pointer"
      />

      <br />
      {uploading && <span>Loading...</span>}
    </>
  );
};

export default FileUpload;
