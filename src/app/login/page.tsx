"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
function login() {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (form.email.length > 0 || form.password.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [form]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });
  };
  return (
    <div className="mt-20">
      {!!session?.user.email ? (
        <>
          <h1 className="text-center text-3xl">Already logged in</h1>
          <p className="text-xl text-center mt-10">
            Please proceed to{" "}
            <Link href="/dashboard" className="hover:underline">
              dashboard
            </Link>
          </p>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl">Login</h1>
          <form
            className="flex flex-col justify-center items-center gap-10 mt-20"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border px-3 py-2 rounded-lg w-100"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border px-3 py-2 rounded-lg w-100"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="submit"
              className={`text-xl bg-white text-black px-3 py-2 rounded-lg mt-5 ${
                isActive ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!isActive}
            >
              Log In
            </button>
          </form>
          <p className="text-center pt-10">
            Dont have an account?{" "}
            <Link href="/signup" className="hover:underline">
              Sign up
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default login;
