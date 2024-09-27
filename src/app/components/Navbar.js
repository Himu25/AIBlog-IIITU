import Link from "next/link";
import icon from "../assets/logo.png";
import Image from "next/image";
import NavAuthLinks from "./NavAuthLinks";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <div>
      <div className="navbar h-2 bg-[#F8F9FA] text-[#495057] ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-16 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#FFFFFF] text-[#343A40] rounded-box w-52"
            >
              <li>
                <Link className="hover:text-[#007BFF]" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#007BFF]" href="/contact">
                  Contact
                </Link>
              </li>
              <NavAuthLinks />
            </ul>
          </div>
          <Image src={icon} alt="Image description" width={35} height={35} />
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl text-[#343A40] hover:text-[#007BFF]"
          >
            IIITU-BLOG
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-4 px-1 font-bold text-[#343A40]">
            <li>
              <Link className="hover:text-[#007BFF]" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#007BFF]" href="/contact">
                Contact
              </Link>
            </li>
            <NavAuthLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <Profile />
        </div>
      </div>
    </div>
  );
}
