import MostPopular from "../components/MostPopular";
import RecentPost from "../components/RecentPost";

export default function page({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { category } = searchParams;
  return (
    <>
      <div className="flex flex-col md:flex-row mb-[100px]">
        <div className="basis-4/6">
          <div className={`text-white mt-5 text-center text-lg font-mono font-semibold mx-10 rounded-lg ${category}`}>{category} Blog</div>
          <RecentPost page={page} category={category} />
        </div>
        <div className="basis-2/6">
          <MostPopular />
        </div>
      </div>
    </>
  )
}
