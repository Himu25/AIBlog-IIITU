import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Fetch top 5 posts ordered by views, excluding posts with empty, null, or undefined title or catSlug
    const posts = await prisma.post.findMany({
      where: {
        slug: {
          not: "", // Exclude posts with an empty title
        },
        catSlug: {
          not: "", // Exclude posts with an empty catSlug
        },
      },
      orderBy: { views: "desc" },
      take: 5, // Limit the number of posts to 5
      include: {
        user: true, // Include user information (assuming 'user' is the relation name)
      },
    });

    return new NextResponse(JSON.stringify({ posts }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
