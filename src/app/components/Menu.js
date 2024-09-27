"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import collegeImg from "../assets/college_1.jpg";

export default function Content() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-2 gap-8 my-12 px-[50px] items-center bg-[#f8f9fa] p-10 shadow-lg"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            IIIT Una, Himachal Pradesh
          </h2>
          <p className="text-lg mb-4">
            IIIT Una is one of the 20 IIITs being set up, funded, and managed by
            the Ministry of Education, Govt. of India, under the Public Private
            Partnership (PPP) model. It is established in collaboration with the
            Ministry of Education, Govt. of India, the Govt. of Himachal
            Pradesh, HP Power Corporation Limited, and HP Transmission
            Corporation Limited.
          </p>
          <p className="text-md mb-4">
            Admissions to the undergraduate programs are made through the
            prestigious Joint Entrance Examination (JEE). Located in the serene
            hills of Himachal Pradesh, IIIT Una is committed to providing
            quality education and fostering innovation.
          </p>

          {/* Read More Button */}
          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-gradient-to-r from-[#ff7b42] to-[#ffa641] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-[#ff6a30] hover:to-[#ff8a00] transition-all duration-300"
            >
              Read more...
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
