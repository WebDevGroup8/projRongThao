import {
  HelpCircle,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import React from "react";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="flex flex-row bg-gradient-to-l text-white gap-4">
      <p className="text-sm">Login as : {user.username}</p>
      <a className="self-center text-normal  whitespace-nowrap text-white">|</a>
      <button
        href="/#"
        onClick={logout}
        type="button"
        className="flex flex-row items-center gap-1"
      >
        <LogOut size={16} />
        <a className="hover:underline">LOGOUT</a>
      </button>
    </div>
  );
});

export default function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-primary flex flex-col justify-center w-full">
      {/* Upper Row Section Mobile */}
      <div className="md:hidden flex flex-row w-full justify-center items-center px-4 h-10 mt-2 ">
        <button>
          <Menu size={24} color="white" />
        </button>
        <div className="w-full text-center block">
          <a className="items-center rtl:space-x-reverse">
            <span className="italic self-center text-2xl font-semibold whitespace-nowrap text-white">
              RONGTHAO
            </span>
          </a>
        </div>
        <button>
          <ShoppingCart size={24} color="white" />
        </button>
      </div>
      {/* Upper Row Section Desktop */}
      <div className="w-full hidden md:flex flex-row items-center justify-between mx-auto pt-3 max-w-screen-xl px-4 lg:px-0">
        <div className="w-fit text-xs">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="self-center whitespace-nowrap text-white"
            >
              <p className="hover:underline">HOME</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center  whitespace-nowrap text-white">
              <p className="hover:underline">SEE ALL</p>
            </button>
          </p>
        </div>

        <div className="w-fit text-white flex flex-row gap-3 text-xs">
          <button type="button" className="flex flex-row items-center gap-1">
            <HelpCircle size={16} />
            <a className="hover:underline">HELP</a>
          </button>
          <a className="self-center text-normal  whitespace-nowrap text-white">
            |
          </a>
          <button type="button" className="flex flex-row items-center gap-1">
            <UserPlus size={16} />
            <a className="hover:underline">SIGN UP</a>
          </button>
          <a className="self-center text-normal  whitespace-nowrap text-white">
            |
          </a>
          {/* User Details Section */}
          <div className="w-fit ">
            <UserDetails user={user} logout={logout} />
          </div>
        </div>
      </div>

      {/* Bottom Row search section */}
      <div className="flex flex-row items-center justify-between px-4 lg:px-0 pb-3 gap-12 mx-auto pt-1.5 md:pb-2 max-w-screen-xl w-full">
        <div className="hidden lg:flex w-fit">
          <a className="items-center rtl:space-x-reverse">
            <span className="italic self-center text-3xl font-semibold whitespace-nowrap text-white">
              RONGTHAO
            </span>
          </a>
        </div>
        <div className="w-full">
          <div className="relative w-full">
            <input
              type="search"
              id="default-search"
              className="block p-1 ps-3 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="SEARCH"
              required
            />
            <button
              type="button"
              className="text-white absolute end-1 top-1/2 -translate-y-1/2 w-fit bg-primary hover:bg-blue-800  focus:outline-none  font-medium  text-sm px-4 py-1.5 "
            >
              <Search size={12} color="white" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className=" hidden lg:flex hover:bg-blue-800 rounded-xl"
        >
          <ShoppingCart size={24} color="white" />
        </button>
      </div>
    </div>
  );
}
