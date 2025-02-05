
import { useAuth } from "../context/useAuth";
import React from "react";

const UserDetails = React.memo(({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="flex bg-gradient-to-l  flex-row text-white gap-4">
      <p>Login as : {user.username}</p>
      <a className="self-center text-normal  whitespace-nowrap text-white">
        |
      </a>
      <button
        href="/#"
        onClick={logout}
        type="button"
        className="flex flex-row items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-5"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
        <a className="hover:underline">LOGOUT</a>
      </button>

    </div>
  );
});



export default function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-blue-900" l>
      <div className="max-w-screen-lg flex flex-row items-center justify-between mx-auto py-2">
        {/* Logo Section */}
        <div className="w-fit text-xs">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="self-center whitespace-nowrap text-white"
            >
              <p className="hover:underline">HOME</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center text-normal  whitespace-nowrap text-white">
              <p className="hover:underline">NEW ARRIVALS</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center whitespace-nowrap text-white">
              <p className="hover:underline">MALE</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center whitespace-nowrap text-white">
              <p className="hover:underline">FEMALE</p>
            </button>
            <a className="self-center  whitespace-nowrap text-white">|</a>
            <button className="self-center whitespace-nowrap text-white">
              <p className="hover:underline">UNISEX</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center whitespace-nowrap text-white">
              <p className="hover:underline">CATEGORY</p>
            </button>
            <a className="self-center whitespace-nowrap text-white">|</a>
            <button className="self-center  whitespace-nowrap text-white">
              <p className="hover:underline">SEE ALL</p>
            </button>
          </p>
        </div>

        <div className="w-fit text-white flex flex-row gap-3 text-xs">
          <button type="button" className="flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <a className="hover:underline">HELP</a>
          </button>
          <a className="self-center text-normal  whitespace-nowrap text-white">
            |
          </a>
          <button type="button" className="flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
            </svg>
            <a className="hover:underline">SIGN UP</a>
          </button>
          <a className="self-center text-normal  whitespace-nowrap text-white">
            |
          </a>
          {/* User Details Section */}
          <div className="w-fit">
            <UserDetails user={user} logout={logout} />
          </div>
        </div>

      </div>
      <div className=" max-w-screen-lg flex flex-row items-center justify-between gap-11 mx-auto py-1">
        <div className="w-fit">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="italic self-center text-3xl font-semibold whitespace-nowrap text-white">
              RONGTHAO
            </span>
          </a>
        </div>
        <div className="w-full">
          <div class="relative w-full">
            <input
              type="search"
              id="default-search"
              class="block p-1 ps-3 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="SEARCH"
              required
            />
            <button
              type="button"
              class="text-white absolute end-0.5 top-1/2 -translate-y-1/2 w-fit bg-blue-950 hover:bg-blue-800  focus:outline-none  font-medium rounded-full text-sm px-4 py-1.5 "
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button type="button" className="  hover:bg-blue-800 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="40"
            height="40"
          >
            <path
              fill="white"
              d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z"
              data-name="Shopping Cart"
            />
          </svg>
        </button>

      </div>
    </div>
  );
}
