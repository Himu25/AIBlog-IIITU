import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default async function Categories() {
  const data = await getData();
  return (
    <>
      <div className="px-12 text-lg text-center font-bold pb-4">
        Popular Categories
      </div>
      <div className="grid sm:grid-cols-4 lg:grid-cols-8  gap-x-8 gap-y-4 px-10">
        {data &&
          data.map((item) => (
            <Link
              key={data._id}
              className={`${item.slug} p-2 text-center btn capitalize`}
              href={`/blog?category=${item.slug}`}
            >
              {item.title}
            </Link>
          ))}
      </div>
    </>
  );
}
