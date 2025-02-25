import {
  HelpCircle,
  History,
  House,
  LogInIcon,
  LogOut,
  Menu,
  ReceiptText,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import fetchProducts from "@/utils/FetchProduct";
import useAuthStore from "@/store/store";
import { useNavigate } from "react-router";
import { path } from "@/conf/main";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="ml-4 flex flex-row gap-4 bg-gradient-to-l text-white">
      <a className="text-normal self-center whitespace-nowrap text-white">|</a>
      <p className="text-base">Login as : {user.username}</p>
      <a className="text-normal self-center whitespace-nowrap text-white">|</a>
      <button
        type="button"
        className="flex flex-row items-center gap-1"
        onClick={() => navigate(path.customer.order)}
      >
        <History size={16} color="white" />
        <a
          href={path.customer.order}
          className="cursor-pointer hover:underline"
        >
          Your Order
        </a>
      </button>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  // --- SECTION: Auto Complete Search Function ---
  // INFO: for react-auto-complete component
  // INFO: onSearch will have as the first callback parameter
  // INFO: the string searched and for the second the results.
  const handleOnSearch = (string) => {
    setSearchTerm(string);
  };

  // INFO: Trigger on select item
  const handleOnSelect = (item) => {
    setSearchTerm(item.name);
    navigate(`${path.public.discovery}?search=${item.name}`);
  };

  // INFO: formatter for auto complete drop down
  const formatResult = (item) => {
    return (
      <div className="z-50">
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </div>
    );
  };
  // --- END SECTION: Auto Complete Search Function ---

  const { user, logout, cart } = useAuthStore();

  useEffect(() => {
    setSearchTerm();
    fetchProducts(setProductList);
  }, []);

  return (
    <div className="bg-primary z-20 flex w-full flex-col justify-center">
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
        <button
          onClick={() => navigate(path.customer.cart)}
          className="relative"
        >
          <ShoppingCart size={24} color="white" />
          {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.reduce((total, item) => total + item.quantity, 0)}
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
                navigate(path.public.home);
              }}
              type="button"
              className="self-center whitespace-nowrap text-white"
            >
              <p className="cursor-pointer hover:underline">HOME</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button
              onClick={() => {
                navigate(path.public.discovery);
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
                // TODO: discuss on this path
                navigate(path.public.help);
              }}
            >
              <HelpCircle size={16} />
              <a
                href={path.public.helps}
                className="cursor-pointer hover:underline"
              >
                Helps
              </a>
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
                    navigate(path.public.login);
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
          <div className="relative z-100 w-full">
            <div className="search wrapper z-50">
              <ReactSearchAutocomplete
                items={productList}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                styling={{
                  borderRadius: "none",
                  height: "32px",
                }}
              />
            </div>
            <button
              type="button"
              className="bg-primary hover:bg-primary-dark absolute end-1.5 top-1/2 w-fit -translate-y-1/2 cursor-pointer rounded-sm px-4 py-1.5 text-sm font-medium text-white focus:outline-none"
              onClick={() =>
                navigate(`${path.public.discovery}?search=${searchTerm}`)
              }
            >
              <Search size={12} color="white" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="relative hidden cursor-pointer rounded-xl lg:flex"
          onClick={() => navigate(path.customer.cart)}
        >
          <ShoppingCart size={24} color="white" />
          {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.reduce((total, item) => total + item.quantity, 0)}
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
            navigate(path.public.home);
            setShowMenuBar(false);
          }}
          className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
        >
          <House size={18} />
          Home
        </div>
        <div
          onClick={() => {
            navigate(path.public.discovery);
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
                navigate(path.customer.order);
                setShowMenuBar(false);
              }}
              className="flex flex-row items-center gap-2 px-4 py-1.5 hover:bg-blue-50 hover:text-black"
            >
              <ReceiptText size={18} />
              Your Order
            </div>
            <div
              onClick={() => {
                // TODO: disscuess on this path
                navigate(path.customer.setting);
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
