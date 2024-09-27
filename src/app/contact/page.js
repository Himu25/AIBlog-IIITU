"use client";
import React, { useEffect, useState } from "react";
import Social from "../components/Social";

export default function Page() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Himu25");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="min-h-screen  lg:flex lg:items-start lg:justify-between">
      <div className="flex flex-col justify-start w-full p-8 lg:w-1/2 lg:pt-16 lg:pr-16 lg:pl-12 xl:pl-32 ">
        <h1 className="text-4xl font-bold text-gray-800 capitalize mb-4">
          Hi 👋, I'm {profile ? profile.name : "Loading..."}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          🌱 I'm currently studying at IIIT UNA.
        </p>
        {profile && (
          <div className="flex items-center  p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {profile.name}
              </h2>
              <p className="text-gray-500">
                {profile.bio || "No bio available"}
              </p>
              {profile.location && (
                <p className="text-gray-500 mt-2">
                  <strong>Location:</strong> {profile.location}
                </p>
              )}
              {profile.company && (
                <p className="text-gray-500 mt-1">
                  <strong>Company:</strong> {profile.company}
                </p>
              )}
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
        <div className="flex mt-4">
          <Social />
        </div>
      </div>

      <div className="flex flex-col justify-start w-full p-8 lg:w-1/2 lg:px-12 xl:px-24 lg:pt-16 ">
        <form>
          <div className="-mx-2 md:items-center md:flex">
            <div className="flex-1 px-2">
              <label className="block mb-2 text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex-1 px-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm text-gray-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-gray-600">Message</label>
            <textarea
              className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Message"
            ></textarea>
          </div>
          <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Get in touch
          </button>
        </form>
      </div>
    </section>
  );
}
