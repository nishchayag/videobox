"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex justify-between p-5 items-center">
      <div className="flex flex-col justify-center items-center  ">
        <Link href="/">
          <img src="logo-removebg-preview.png" alt="" className="h-20 " />
        </Link>
        <p className="tracking-wider font-bold mt-2 font-serif">VideoBox</p>
      </div>
      <div className=" px-4 ">
        {!!session?.user ? (
          <>
            <button
              className="bg-white text-black px-3 py-2 rounded-lg cursor-pointer flex flex-row justify-center items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => {
                setTimeout(() => {
                  setIsDropdownOpen(false);
                }, 100);
              }}
            >
              logged in as {session?.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdown"
              className={`z-10 absolute mt-2 right-9 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 text-black ${
                isDropdownOpen ? "" : "hidden"
              }`}
            >
              <ul
                className="py-2  flex flex-col gap-2 "
                aria-labelledby="dropdownDefaultButton"
              >
                <li className="hover:bg-neutral-300 px-2 py-2">
                  <button onClick={() => router.push("/")}>Home</button>
                </li>
                <li className="hover:bg-neutral-300 px-2 py-2">
                  <button onClick={() => router.push("/uploadPage")}>
                    Upload Video
                  </button>
                </li>
                <li className="hover:bg-neutral-300 px-2 py-2">
                  <button onClick={() => signOut()}>Sign out</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <button
              className="bg-white text-black px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/login")}
            >
              login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
