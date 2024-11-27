"use client";
import Image from "next/image";
import React from "react";
import icon from "../assets/logo.png";
import { signIn, useSession } from "next-auth/react";
import facebook from "../assets/facebook.svg";
import github from "../assets/github.svg";
import google from "../assets/google.svg";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export default function page() {
  const navigate = useRouter();
  const { data, status } = useSession();
  if (status === "loading") {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (status === "authenticated") {
    navigate.push("/");
  }

  return (
    <div className="relative my-3 mt-7 px-6 h-[100vh]  md:px-12 xl:px-40 mb-16">
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
        <div className="rounded-xl shadow-xl">
          <div className="p-6 bg-[rgba(255, 255, 255, 0.1)] backdrop-filter: blur(12px) sm:p-16">
            <div className="space-y-4 text-center">
              <Image alt="iiit una" src={icon} width={40} height={40} />
              <h1 className="font-bold text-4xl text-sky-500">Login</h1>
            </div>
            <div className="mt-16 grid space-y-4">
              <button
                onClick={() => signIn("google")}
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <Image
                    alt="google"
                    className="absolute left-0 w-5 "
                    src={google}
                    width={40}
                    height={40}
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
              <button
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <Image
                    alt="github"
                    className="absolute left-0 w-5"
                    src={github}
                    width={40}
                    height={40}
                  />
                  <span className="block w-max font-semibold tracking-wide  text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Github
                  </span>
                </div>
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <Image
                    alt="facebook"
                    className="absolute left-0 w-5"
                    src={facebook}
                    width={40}
                    height={40}
                  />
                  <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Facebook
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-14 space-y-4 text-gray-600 text-center sm:-mb-8">
              <p className="text-xs">
                By proceeding, you agree to our{" "}
                <Link href="#">Terms of Use</Link> and confirm you have read our{" "}
                <Link href="#">Privacy and Cookie Statement</Link>.
              </p>
              <p className="text-xs">
                This site is protected by reCAPTCHA and the{" "}
                <Link href="#">Google Privacy Policy</Link> and{" "}
                <Link href="#">Terms of Service</Link> apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
