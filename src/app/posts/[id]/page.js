import BlogContent from "@/app/components/BlogContent";
import Comments from "@/app/components/Comments";
import MostPopular from "@/app/components/MostPopular";

const getData = async (id) => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`,
        {
            cache: 'no-cache'
        })
    if (!res.ok) {
        throw new Error("Failed")
    }
    return res.json()
}

export default async function page({ params }) {
    const { id } = params;
    const post = await getData(id);
    return (
        <>
            <div className="flex flex-col md:flex-row mb-[100px]">
                <div className="basis-4/6">
                    <BlogContent post={post} />
                    <Comments id={id} />
                </div>
                <div className="basis-2/6">
                    <MostPopular />
                </div>
            </div>
        </>
    )
}
