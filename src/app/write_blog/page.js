"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import gallery from "../assets/gallery.png";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { app } from "../utils/firebase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FaImage, FaRegEdit, FaRegPaperPlane, FaTag } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // For showing loading spinner

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const router = useRouter();
  const [selectedcat, setSelectedcat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let downloadURL = "";

      if (file) {
        downloadURL = await upload();
        // Upload image if selected
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title || "",
          desc: story,
          img: downloadURL,
          slug: title,
          catSlug: selectedcat || "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const storage = getStorage(app);
  const upload = async () => {
    if (!file) return "";

    try {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const snapshot = await uploadBytes(storageRef, file); // Simplified file upload
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/categories`);
      if (response.status === 200) {
        const json = await response.json();
        setCats(json);
      }
    };
    fetchCategory();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setFile(null);
  };

  const generateAns = async (story) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: story }] }],
          }),
        }
      );

      if (response.ok) {
        const aiResponse = await response.json();
        const suggestion = aiResponse?.candidates[0]?.content?.parts[0]?.text;
        return suggestion;
      } else {
        console.error("Failed to fetch AI suggestions");
      }
    } catch (error) {
      console.error("Error in AI generation", error);
    }
  };

  const handleRegenerateStory = async () => {
    setGeneratingStory(true);
    const response = await generateAns(
      `Please correct the grammar and regenerate: ${story}`
    );
    setStory(response);
    setGeneratingStory(false);
  };

  const handleGenerateTitle = async () => {
    setGeneratingTitle(true);
    const response = await generateAns(
      `Generate a 3-7 word title based on the following story. Only return the title as plain text: ${story}`
    );
    setTitle(response);
    setGeneratingTitle(false);
  };

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    const response = await generateAns(
      `Extract keywords for generating an appropriate image based on the following story: ${story}`
    );

    const blob = await query({
      inputs: response,
    });

    if (blob) {
      const fileName = `generated_image_${new Date().getTime()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(blob);
    }

    setGeneratingImage(false);
  };

  return (
    <form
      className="p-8 flex flex-col gap-6 min-h-screen bg-white shadow-lg rounded-lg transition duration-300 ease-in-out"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Generate Blog
      </h1>

      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
        className="bg-gray-50 text-2xl border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-200 ease-in-out hover:border-indigo-500 shadow-sm"
      />

      {!selectedImage && (
        <div className="flex items-center gap-4">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition duration-200"
          >
            <Image
              alt="Upload"
              src={gallery}
              height={45}
              width={45}
              className="grayscale hover:grayscale-0 transition duration-300"
            />
            <span className="text-lg">Upload Image</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {selectedImage && (
        <div className="relative">
          <Image
            alt="Selected Image"
            src={selectedImage}
            height={160}
            width={160}
            className="rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 duration-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            aria-label="Remove Image"
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
          onClick={handleGenerateImage}
        >
          {generatingImage ? (
            <ClipLoader size={20} color="white" />
          ) : (
            <FaImage />
          )}
          Generate Image
        </button>

        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white shadow-md flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
          onClick={handleGenerateTitle}
        >
          {generatingTitle ? (
            <ClipLoader size={20} color="white" />
          ) : (
            <FaRegEdit />
          )}
          Generate Title
        </button>
      </div>

      <ReactQuill
        theme="snow"
        value={story}
        onChange={setStory}
        placeholder="Write your blog content here..."
        className="rounded-lg border-gray-300 shadow-md"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        }}
      />

      <div className="flex justify-between items-center gap-6">
        <select
          value={selectedcat}
          onChange={(e) => setSelectedcat(e.target.value)}
          className="bg-gray-50 text-lg border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out hover:border-indigo-500"
        >
          <option value="">Select a Category</option>
          {cats.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.slug}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
          onClick={handleRegenerateStory}
        >
          {generatingStory ? (
            <ClipLoader size={20} color="white" />
          ) : (
            <FaRegPaperPlane />
          )}
          Regenerate Story
        </button>
      </div>

      <button
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white py-3 px-8 rounded-lg shadow-md font-semibold transition duration-300`}
      >
        {loading ? <ClipLoader size={20} color="white" /> : "Submit Story"}
      </button>
    </form>
  );
}
