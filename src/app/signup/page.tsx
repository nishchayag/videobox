"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
function signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.confirmPassword.length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [form]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActive(false);
    try {
      if (form.password !== form.confirmPassword) {
        alert("password and confirm password are not same");
        return;
      }
      const response = await axios.post("/api/auth/signup", {
        email: form.email,
        password: form.password,
      });
      router.push("/login");
    } catch (error) {
      throw new Error("Error while registering user: " + error);
    }
  };
  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-20 gap-4"
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
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border px-3 py-2 rounded-lg w-100"
        />
        <label htmlFor="confirmPassword" className="text-xl">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="border px-3 py-2 rounded-lg w-100"
        />
        <button
          type="submit"
          className={`text-xl bg-white text-black px-3 py-2 rounded-lg mt-5 ${
            isActive ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={!isActive}
        >
          Sign up
        </button>
      </form>
      <p className="text-center pt-10">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default signup;
