"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center lg:px-10 mt-8">
      <button
        className={`flex items-center text-white bg-blue-700 hover:bg-blue-600 p-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
          !hasPrev ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={!hasPrev}
        onClick={() => hasPrev && router.push(`?page=${page - 1}`)}
      >
        <FaChevronLeft className="w-6 h-6" />
        <span className="ml-2 font-semibold">Previous</span>
      </button>

      <span className="text-gray-700 font-semibold">Page {page}</span>

      <button
        className={`flex items-center text-white bg-blue-700 hover:bg-blue-600 p-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
          !hasNext ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={!hasNext}
        onClick={() => hasNext && router.push(`?page=${page + 1}`)}
      >
        <span className="mr-2 font-semibold">Next</span>
        <FaChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
