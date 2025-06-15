"use client";

import Link from "next/link";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import { RiHomeLine, RiNotification3Line } from "react-icons/ri";
import Button from "./Button";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  class?: string;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    icon: <RiHomeLine />,
    href: "/",
  },
  {
    name: "Explore",
    icon: <IoSearch />,
    href: "/explore",
  },
  {
    name: "Notifications",
    icon: <RiNotification3Line />,
    href: "/notifications",
  },
  {
    name: "Messages",
    icon: <MdOutlineMail />,
    href: "/messages",
  },
  {
    name: "Profile",
    icon: <FaRegUser />,
    href: "/profile",
    class: "hidden md:flex",
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    href: "/settings",
  },
];

function Sidebar() {
  return (
    <div className="flex md:flex-col gap-2 md:py-2 justify-center md:justify-normal">
      <div className="hidden md:flex items-center gap-2 p-2 ">
        <Logo size="xs" />
        <span className="hidden lg:block font-semibold text-xl">
          OdinConnect
        </span>
      </div>

      <div className="hidden lg:block">
        <Searchbar />
      </div>

      <div className="flex md:flex-col p-2 gap-2 flex-wra h-full">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center text-[var(--color-grey-600)] rounded-md ${item.class}`}
          >
            <Button icon={item.icon} className="!text-2xl" />
            <span className="font-semibold hidden lg:block">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
