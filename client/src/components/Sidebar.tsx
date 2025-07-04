"use client";

import Link from "next/link";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import { RiHomeLine, RiNotification3Line } from "react-icons/ri";
import Button from "./Button";
import { IoSearch, IoSettingsOutline, IoSunny } from "react-icons/io5";
import { MdDarkMode, MdOutlineMail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import ProfileImage from "./ProfileImage";
import { BsThreeDots } from "react-icons/bs";
import Menus from "./Menus";
import { useRef } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDarkMode } from "@/contexts/DarkMode/ThemeContextProvider";
import { useLogout } from "@/hooks/useLogout";

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
  const profileRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout, isPending } = useLogout();
  return (
    <div className="flex h-full md:flex-col gap-4 md:py-2 px-4 justify-center md:justify-normal">
      <div className="hidden md:flex items-center gap-2 p-2 ">
        <Logo size="xs" />
        <span className="hidden lg:block font-semibold text-xl">
          OdinConnect
        </span>
      </div>

      <div className="hidden lg:block">
        <Searchbar />
      </div>

      <div className="flex md:flex-col p-2 gap-4 md:flex-1 shadow-sm">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center text-[var(--color-grey-600)] rounded-md hover:bg-[var(--color-grey-100)]/30  ${item.class}`}
          >
            <Button icon={item.icon} className="!text-2xl" />
            <span className="hidden lg:block">{item.name}</span>
          </Link>
        ))}
      </div>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle
            id={"user"}
            position="above"
            toggleElement="profile"
            elementRef={profileRef}
          >
            <div
              ref={profileRef}
              className="hidden items-center gap-4 px-4 py-2 md:flex shadow-lg rounded-full hover:bg-[var(--color-grey-100)]/30 cursor-pointer transition-all duration-200 ease-in-out"
              id="sidebarProfile"
            >
              <div className="flex w-full lg:w-auto justify-center lg:justify-start">
                <ProfileImage size="xs" />
              </div>
              <div className="hidden flex-col lg:flex text-start">
                <span className="font-semibold">User</span>
                <span className="">User Role</span>
              </div>
              <span className="hidden lg:flex ml-auto">
                <BsThreeDots />
              </span>
            </div>
          </Menus.Toggle>
          <Menus.List id={"user"}>
            <Menus.Button
              icon={isDarkMode ? <MdDarkMode /> : <IoSunny />}
              onClick={toggleDarkMode}
              shouldClose={false}
            >
              {isDarkMode ? "Dark Theme" : "Light Theme"}
            </Menus.Button>
            <Menus.Button
              icon={<IoIosLogOut />}
              onClick={logout}
              disabled={isPending}
            >
              <span>Log out</span>
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </div>
  );
}

export default Sidebar;
