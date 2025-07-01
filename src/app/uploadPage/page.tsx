"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import axios from "axios";

function page() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: File,
    thumbnailUrl: File,
  });
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const response = await axios.post("/api/video", form);
  };
  return (
    <div>
      <h1 className="text-center text-5xl">Upload video</h1>
      <form
        className="flex flex-col gap-4 justify-center items-center mt-20 text-xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className="border px-3 py-2 w-100 rounded-xl"
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          className="border px-3 py-2 w-100 rounded-xl"
        />
        <label htmlFor="videoUrl">Select Media</label>
        <FileUpload
          onSuccess={() => setLoading(false)}
          onProgress={() => setLoading(true)}
        />
        <label htmlFor="thumbnail">Select Thumbnail</label>
        <FileUpload
          onSuccess={() => setLoading(false)}
          onProgress={() => setLoading(true)}
        />
        <button
          type="submit"
          className="bg-white text-black px-5 py-2 rounded-xl cursor-pointer"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default page;
