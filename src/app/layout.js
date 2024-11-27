import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AIBlog-IIITU",
  description:
    "A Next.js-based blog platform for IIIT Una students, featuring AI-generated content via the Gemini API and secure authentication through Google OAuth2. It uses MongoDB and Prisma for efficient data handling and seamless database management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
