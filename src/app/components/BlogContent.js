import Image from "next/image";
import React from "react";
import collegeImg from "../assets/coding1.jpg";

export default function BlogContent({ post }) {
  if (!post) return <p>Loading...</p>; // Handle case where post data is not yet available

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-start sm:p-8 px-4 mt-4 max-w-7xl mx-auto">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <div className="relative w-full h-[300px] lg:h-[400px]">
          <Image
            src={post.img || collegeImg} // Default to a fallback image if post.image is not provided
            alt="Post image"
            className="rounded-lg shadow-lg object-cover"
            layout="fill"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start">
        <h1 className="text-4xl font-bold capitalize text-[#343a40] mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-6">
          {post.user?.image && (
            <div className="avatar">
              <div className="w-14 rounded-full overflow-hidden">
                <Image
                  src={post.user.image}
                  alt="User avatar"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <div>
            <div className="font-semibold text-lg">
              {post.user?.name || "Unknown Author"}
            </div>
            <div className="text-gray-500 text-sm">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : "Date not available"}
            </div>
          </div>
        </div>

        <div className="prose lg:prose-xl break-words text-base text-[#6c757d] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.desc }} />
        </div>
      </div>
    </div>
  );
}
