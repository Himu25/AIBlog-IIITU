import Link from "next/link";
import React from "react";
import icon from "../assets/logo.png";
import Image from "next/image";
import Social from "./Social";

export default function Footer() {
  return (
    <>
      <footer class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <Link href="/">
            <Image width={50} height={50} src={icon} alt="logo"></Image>
          </Link>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            © Copyright 2021. All Rights Reserved.
          </p>
          <div class="flex -mx-2">
            <Social />
          </div>
        </div>
      </footer>
    </>
  );
}
