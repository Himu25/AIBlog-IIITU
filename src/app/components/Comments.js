"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Comments = ({ id }) => {
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const fetchData = async (issilent) => {
    try {
      if (!issilent) setLoading(true);
      const response = await fetch(`/api/comments?id=${id}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (status == "unauthenticated") {
        return router.push("/login");
      }
      setIsLoading(true);
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postID: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setDesc("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      fetchData(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="w-full p-8 pb-4 rounded-lg">
        <div className="flex flex-row items-center gap-3">
          <input
            className="w-full h-12 px-4 py-2 border rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a comment..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {!isloading ? (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
              onClick={handleSubmit}
            >
              Post
            </button>
          ) : (
            <div className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Posting...
            </div>
          )}
        </div>
      </form>
      <div className="p-8 pt-0 rounded-lg mt-2">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          comments.map((item) => (
            <div key={item.id} className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={item.user.image}
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-800">{item.desc}</p>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {item.user.name} ·{" "}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Comments;
