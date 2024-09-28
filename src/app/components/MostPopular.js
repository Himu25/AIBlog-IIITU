import React from "react";

// Function to fetch most viewed posts from API
const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/most-viewed`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// AI blog generation function
const generateAiBlog = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (response.ok) {
      const aiResponse = await response.json();
      const suggestion = aiResponse?.candidates[0]?.content?.parts[0]?.text;
      return suggestion || "AI blog content could not be generated.";
    } else {
      console.error("Failed to fetch AI suggestions");
    }
  } catch (error) {
    console.error("Error in AI generation", error);
  }
  return "AI blog content could not be generated.";
};

export default async function MostPopular() {
  // Fetch most viewed posts data
  const data = await getData();

  // List of random blog title prompts
  const blogTitles = [
    "A Typical Day in College Life",
    "The Future of Technology in Education",
    "How to Stay Productive as a Student",
    "Life Lessons from Playing Sports",
    "The Importance of Mental Health for Students",
  ];

  // Select a random title from the array
  const randomTitle = blogTitles[Math.floor(Math.random() * blogTitles.length)];

  // Generate AI blog content based on the selected random title
  const aiBlog = await generateAiBlog(randomTitle);

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const sanitizeBlogContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
      .replace(/## (.*?)\n/g, "<h2>$1</h2>") // Heading 2
      .replace(/### (.*?)\n/g, "<h3>$1</h3>") // Heading 3
      .replace(/- (.*?)\n/g, "<li>$1</li>") // Unordered list
      .replace(/(\n)/g, "<br />"); // Line breaks
  };

  const todayDate = formatDate(new Date());

  return (
    <div className="mt-8 px-10">
      <p className="text-sm font-semibold text-gray-600">Most Popular</p>
      <h4 className="text-2xl font-bold text-gray-800 mb-6">
        Top Picks: Most Viewed
      </h4>
      <div className="flex flex-col space-y-4">
        {data.posts &&
          data.posts.map((item) => (
            <div
              className={`p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border-l-4 border-gray-400 Popular${item.catSlug}`}
              key={item.id}
            >
              <div className="flex justify-between items-center mb-2">
                <div
                  className={`inline-block text-xs py-1 text-white rounded-full text-${item.catSlug}`}
                >
                  {item.catSlug}
                </div>
                <div className="text-sm text-gray-500">
                  {item.createdAt
                    ? formatDate(item.createdAt)
                    : "Date not available"}
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-800 transition-colors">
                {item.title || "Lorem ipsum dolor sit amet"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-medium">
                  {item.user?.name || "Unknown Author"}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* AI Generated Blog Section */}
      <div className="mt-10">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">
          AI-Generated Blog of the Day
        </h4>
        <div className="p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-400 h-[65vh] overflow-y-auto">
          <div className="text-lg font-semibold text-gray-800 transition-colors mb-2">
            {randomTitle}
          </div>
          <div className="text-sm text-gray-500 mb-2">{todayDate}</div>
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">AI</span>
          </div>
          <div
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(aiBlog) }}
          />
        </div>
      </div>
    </div>
  );
}
