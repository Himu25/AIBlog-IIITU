"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

export default function NavAuthLinks() {
  const { data, status } = useSession();
  if (status === "loading") {
    return (
      <li>
        <span className="">loading...</span>
      </li>
    );
  }
  return (
    <>
      {status === "unauthenticated" ? (
        <li>
          <Link className="hover:text-[#007BFF]" href="/login">
            Login
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link className="hover:text-[#007BFF]" href="/write_blog">
              Write
            </Link>
          </li>
          <li>
            <div
              className="hover:text-[#DC3545] cursor-pointer flex items-center gap-1"
              onClick={signOut}
            >
              Logout
              <FiLogOut />
            </div>
          </li>
        </>
      )}
    </>
  );
}
