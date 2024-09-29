"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import collegeImg from "../assets/college_1.jpg";

export default function Content() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="grid md:grid-cols-2 gap-8 sm:my-12 px-5 md:px-[50px] items-center sm:bg-[#f8f9fa] p-6 md:p-10 sm:shadow-lg"
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src={collegeImg}
          alt="IIIT Una"
          className="rounded-lg hover:brightness-90 transition duration-300 ease-in-out"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-center text-[#343a40]">
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-center md:text-left">
          IIIT Una, Himachal Pradesh
        </h2>
        <p className="text-md md:text-lg mb-4 text-justify md:text-left">
          IIIT Una is one of the 20 IIITs set up by the Ministry of Education,
          Govt. of India, under the Public-Private Partnership model. Located in
          the serene hills of Himachal Pradesh, it aims to provide quality
          education and foster innovation.
        </p>
        <p className="text-md mb-4 text-justify md:text-left">
          Admissions to undergraduate programs are made through the Joint
          Entrance Examination (JEE).
        </p>

        {/* Read More Button */}
        <div className="flex justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-gradient-to-r from-[#ff7b42] to-[#ffa641] text-white font-semibold py-2 px-6 sm:rounded-full shadow-lg hover:from-[#ff6a30] hover:to-[#ff8a00] transition-all duration-300"
          >
            Read more...
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
