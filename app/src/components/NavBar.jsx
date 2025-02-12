import {
  HelpCircle,
  House,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="flex flex-row gap-4 bg-gradient-to-l text-white">
      <p className="text-sm">Login as : {user.username}</p>
      <a className="text-normal self-center whitespace-nowrap text-white">|</a>
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
  const [showMenuBar, setShowMenuBar] = useState(false);
  const navigate = useNavigate();

  const handleAllItem = () => {
    navigate(`/products`);
  };

  const handleHome = () => {
    navigate(`/`);
  };

  const { user, logout } = useAuth();
  return (
    <div className="bg-primary flex w-full flex-col justify-center">
      {/* Upper Row Section Mobile */}
      <div className="mt-2 flex h-10 w-full flex-row items-center justify-center px-4 md:hidden">
        <button onClick={() => setShowMenuBar(!showMenuBar)}>
          <Menu size={24} color="white" />
        </button>
        <div className="block w-full text-center">
          <a
            href="/customer/homepage"
            className="items-center rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white italic">
              RONGTHAO
            </span>
          </a>
        </div>
        <button>
          <ShoppingCart size={24} color="white" />
        </button>
      </div>

      {/* Upper Row Section Desktop */}
      <div className="mx-auto hidden w-full max-w-screen-xl flex-row items-center justify-between px-4 pt-3 md:flex lg:px-0">
        <div className="w-fit text-xs">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => {
                handleHome();
              }}
              type="button"
              className="self-center whitespace-nowrap text-white"
            >
              <p className="hover:underline">HOME</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button
              onClick={() => {
                handleAllItem();
              }}
              className="self-center whitespace-nowrap text-white"
            >
              <p className="hover:underline">SEE ALL</p>
            </button>
          </p>
        </div>

        <div className="flex w-fit flex-row gap-3 text-xs text-white">
          <button type="button" className="flex flex-row items-center gap-1">
            <HelpCircle size={16} />
            <a className="hover:underline">HELP</a>
          </button>
          <a className="text-normal self-center whitespace-nowrap text-white">
            |
          </a>
          <button type="button" className="flex flex-row items-center gap-1">
            <UserPlus size={16} />
            <a className="hover:underline">SIGN UP</a>
          </button>
          <a className="text-normal self-center whitespace-nowrap text-white">
            |
          </a>
          {/* User Details Section */}
          <div className="w-fit">
            <UserDetails user={user} logout={logout} />
          </div>
        </div>
      </div>

      {/* Bottom Row search section */}
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between gap-12 px-4 pt-1.5 pb-3 md:pb-2 lg:px-0">
        <div className="hidden w-fit lg:flex">
          <a className="items-center rtl:space-x-reverse">
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white italic">
              RONGTHAO
            </span>
          </a>
        </div>
        <div className="w-full">
          <div className="relative w-full">
            <input
              type="search"
              id="default-search"
              className="block w-full border border-gray-300 bg-gray-50 p-1 ps-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="SEARCH"
              required
            />
            <button
              type="button"
              className="bg-primary absolute end-1 top-1/2 w-fit -translate-y-1/2 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none"
            >
              <Search size={12} color="white" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="hidden rounded-xl hover:bg-blue-800 lg:flex"
        >
          <ShoppingCart size={24} color="white" />
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`bg-primary flex-col gap-3 py-4 text-white transition-all duration-300 md:hidden ${showMenuBar ? "flex translate-y-0 opacity-100" : "pointer-events-none hidden -translate-y-4 opacity-0"}`}
      >
        <div
          onClick={() => {
            navigate("/customer/homepage");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <House size={18} />
          Home
        </div>
        <div
          onClick={() => {
            navigate("/customer/seeallitem");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <Search size={18} />
          See All
        </div>
        <div
          onClick={() => {
            navigate("/customer/vieworder");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <ShoppingCart size={18} />
          Your Order
        </div>
        <div
          onClick={() => {
            navigate("/settings");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <Settings size={18} />
          Settings
        </div>
      </div>
    </div>
  );
}
