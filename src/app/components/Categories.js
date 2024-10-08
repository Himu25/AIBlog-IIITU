import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
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
      <div className="sm:px-12 text-lg text-center font-bold pb-4">
        Popular Categories
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-4 sm:px-10 px-4">
        {data &&
          data.map((item) => (
            <Link
              key={item._id} // Corrected the key to use item._id instead of data._id
              className={`${item.slug} p-2 text-center capitalize border rounded-lg hover:bg-gray-200 transition duration-200`}
              href={`/blog?category=${item.slug}`}
            >
              {item.title}
            </Link>
          ))}
      </div>
    </>
  );
}
