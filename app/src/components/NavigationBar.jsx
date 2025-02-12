import {
  HelpCircle,
  House,
  LogInIcon,
  LogOut,
  Menu,
  ReceiptText,
  Search,
  Settings,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="ml-4 flex flex-row gap-4 bg-gradient-to-l text-white">
      <a className="text-normal self-center whitespace-nowrap text-white">|</a>
      <p className="text-base">Login as : {user.username}</p>
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

  const { user, logout, cart } = useAuthStore();
  return (
    <div className="bg-primary flex w-full flex-col justify-center">
      {/* Upper Row Section Mobile */}
      <div className="mt-2 flex h-10 w-full flex-row items-center justify-center px-4 md:hidden">
        <button onClick={() => setShowMenuBar(!showMenuBar)}>
          <Menu size={24} color="white" />
        </button>
        <div className="block w-full cursor-pointer text-center">
          <span className="cursor-pointer self-center text-2xl font-semibold whitespace-nowrap text-white italic">
            RONGTHAO
          </span>
        </div>
        <button onClick={() => navigate("/cart")} className="relative">
          <ShoppingCart size={24} color="white" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Upper Row Section Desktop */}
      <div className="mx-auto hidden w-full max-w-screen-xl flex-row items-center justify-between px-4 pt-3 md:flex lg:px-0">
        <div className="w-fit text-sm">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => {
                handleHome();
              }}
              type="button"
              className="self-center whitespace-nowrap text-white"
            >
              <p className="cursor-pointer hover:underline">HOME</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button
              onClick={() => {
                handleAllItem();
              }}
              className="self-center whitespace-nowrap text-white"
            >
              <p className="cursor-pointer hover:underline">SEE ALL PRODUCT</p>
            </button>
          </p>
        </div>

        <div className="flex cursor-pointer flex-row text-sm text-white">
          <div className="flex flex-row justify-end gap-3">
            <button
              type="button"
              className="flex flex-row items-center gap-1"
              onClick={() => {
                navigate("/help");
              }}
            >
              <HelpCircle size={16} />
              <a className="cursor-pointer hover:underline">HELP</a>
            </button>
            {!user && (
              <>
                {" "}
                <a className="text-normal self-center whitespace-nowrap text-white">
                  |
                </a>
                <button
                  type="button"
                  className="flex flex-row items-center gap-1"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LogInIcon size={16} />
                  <a className="cursor-pointer hover:underline">SIGN IN</a>
                </button>
              </>
            )}
          </div>

          {/* User Details Section */}
          <div className="w-fit">
            <UserDetails user={user} logout={() => logout(navigate)} />
          </div>
        </div>
      </div>

      {/* Bottom Row search section */}
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between gap-12 px-4 pt-1.5 pb-3 md:pb-2 lg:px-0">
        <div className="hidden w-fit lg:flex">
          <a href="/" className="items-center rtl:space-x-reverse">
            <span className="cursor-pointer self-center text-3xl font-semibold whitespace-nowrap text-white italic">
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
          className="relative hidden cursor-pointer rounded-xl hover:bg-blue-800 lg:flex"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={24} color="white" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`bg-primary flex-col gap-3 py-4 text-white transition-all duration-300 md:hidden ${showMenuBar ? "flex translate-y-0 opacity-100" : "pointer-events-none hidden -translate-y-4 opacity-0"}`}
      >
        <div
          onClick={() => {
            navigate("/");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <House size={18} />
          Home
        </div>
        <div
          onClick={() => {
            navigate("/products");
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <Search size={18} />
          See All Product
        </div>
        {user && (
          <>
            <div
              onClick={() => {
                navigate("/order");
                setShowMenuBar(false);
              }}
              className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
            >
              <ReceiptText size={18} />
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
            <div
              onClick={() => {
                logout(navigate);
              }}
              className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
            >
              <LogOut size={18} />
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
}
