
import { getAuthSession } from "../../utils/auth";
import prisma from "../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const postID = id.toString()
    try {
        const comments = await prisma.comment.findMany({
            where: { postID },
            include: { user: true },
        });

        return new NextResponse(JSON.stringify(comments, { status: 200 }));
    } catch (err) {
        console.log("sqwdef");
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};

export const POST = async (req) => {
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        console.log(body);
        const comment = await prisma.comment.create({
            data: { ...body, userEmail: session.user.email },
        });
        return new NextResponse(JSON.stringify(comment, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};