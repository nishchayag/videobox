"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mt-20">
        <h1 className="text-center font-bold text-5xl">VideoBox</h1>
      </div>
    </>
  );
}
