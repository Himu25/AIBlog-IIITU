import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { id } = params;
    console.log(id);

    try {
        const post = await prisma.post.update({
            where: { id },
            data: { views: { increment: 1 } },
            include: { user: true },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};