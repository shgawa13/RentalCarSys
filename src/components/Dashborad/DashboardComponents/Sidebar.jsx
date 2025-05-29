import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHashtag, FaMusic } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineUserGroup } from "react-icons/hi";
import { RiCloseLine, RiDropFill } from "react-icons/ri";
import { IoMdMusicalNote } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";
import { RxStack } from "react-icons/rx";
import { CgPlayList } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";

// here should be the logo
// import { logo } from "../assets";

const links = [
  { name: "Customers", to: "/Dashboard/Customers", icon: BsPeopleFill },
  {
    name: "Vehicles",
    to: "/Dashboard/Vehicles",
    icon: IoCarSport,
  },
  { name: "Booking", to: "/Dashboard/Booking", icon: FaClipboardList },
  {
    name: "Transactions",
    to: "/Dashboard/Transactions",
    icon: FaMoneyBillTransfer,
  },
];
// Section 2
const linksTwo = [
  { name: "Users", to: "/recently-played", icon: MdLibraryMusic },
  { name: "Logout", to: "/my-play-lists", icon: RiDropFill },
  { name: "Favourites", to: "/favourites", icon: RxStack },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-4 ">
    <p className="ml-4 font-semibold text-sm">Menu List</p>
    <ul>
      <li>
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className="flex flex-row justify-items-center p-2 items-center text-md font-bold text-white "
            onClick={() => handleClick && handleClick()}
          >
            <item.icon className="w-5 h-5 mr-4 " />
            {item.name}
          </NavLink>
        ))}
      </li>
    </ul>
    <div className="mt-[2.2rem]">
      <p className="ml-4 font-semibold text-sm">YOUR MUSIC</p>
      <ul>
        <li>
          {linksTwo.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="flex flex-row justify-items-center p-2 items-center text-md font-bold text-white "
              onClick={() => handleClick && handleClick()}
            >
              <item.icon className="w-5 h-5 mr-4 " />
              {item.name}
            </NavLink>
          ))}
        </li>
      </ul>
    </div>
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-3 px-.5 bg-[#222126] border-r-[#ffffffb0] md:border-r-black">
        <Link to="/" className="text-center text-[#6349bb] font-bold">
          {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
          Echo Music
        </Link>
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
