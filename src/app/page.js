import Categories from "./components/Categories";
import Content from "./components/Menu";
import MostPopular from "./components/MostPopular";
import RecentPost from "./components/RecentPost";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <>
      <Content />
      <Categories />
      <div className="flex flex-col md:flex-row mb-[100px]">
        <div className="basis-4/6">
          <RecentPost page={page} />
        </div>
        <div className="basis-2/6">
          <MostPopular />
        </div>
      </div>
    </>
  );
}
