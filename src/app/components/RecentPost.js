import Image from "next/image";
import img1 from "../assets/coding1.jpg";
import Link from "next/link";
import Pagination from "./Pagination";
import { stripHtml } from "../utils/sanitizeHtml";

const getData = async (page, category) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?page=${page}&category=${
      category || ""
    }`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default async function RecentPost({ page, category }) {
  const { posts, count } = await getData(page, category);
  console.log("🚀 ~ RecentPost ~ posts:", posts);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <>
      {posts && (
        <div className="my-12 px-10">
          {posts.map((post) => (
            <div
              className="grid md:grid-cols-2 gap-8 mt-8 md:px-10 capitalize items-start"
              key={post.id}
            >
              <Image
                src={post.img || img1}
                width={400}
                height={400}
                alt={`Image for ${post.title}`}
                className="rounded-lg shadow-lg hover:brightness-90 transition duration-300 ease-in-out"
              />

              <div className="flex flex-col justify-center">
                <div className="text-xs uppercase font-semibold text-gray-600">
                  {post.createdAt.substring(0, 10)} -{" "}
                  <span className={`ms-1 capitalize text-${post.catSlug}`}>
                    {post.catSlug}
                  </span>
                </div>

                <h3 className="font-bold text-xl mt-4 text-[#343a40] hover:text-[#007BFF] transition duration-300 ease-in-out">
                  {post.title}
                </h3>

                <p className="text-sm mt-2 text-gray-600 break-words">
                  {stripHtml(post.desc, 30)}
                </p>

                <Link href={`/posts/${post.id}`}>
                  <span className="text-sm mt-4 font-bold text-[#007BFF] underline transition duration-300 ease-in-out hover:text-[#0056b3] hover:scale-105 inline-block">
                    Read More →
                  </span>
                </Link>
              </div>
            </div>
          ))}

          <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
      )}
    </>
  );
}
