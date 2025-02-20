import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginpage_img.png"; // ใช้ relative path
import useAuthStore from "../store";
import ax from "../conf/ax";

export const CreateNewAccount = ({ handleClose }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
      role: {
        connect: [{ id: 3 }],
        type: "customer",
      },
      confirmed: true,
      blocked: false,
    };

    try {
      await ax.post("/users", formData);
      alert("Created Successfully!");
      // console.log("User Created:", response.data);
      handleClose();
    } catch (error) {
      alert(
        "Error: " +
          (error.response?.data?.error?.message || "Something went wrong"),
      );
    }
  };

  return (
    <div>
      <div className="fixed inset-0 mx-auto flex h-full w-full items-center justify-center rounded-lg px-5 text-center shadow-xl lg:px-0">
        <div className="relative max-h-full w-full max-w-md">
          <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign up to our platform
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 flex items-start text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="Username"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-start text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="email@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-start text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="*****"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
                >
                  Sing up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { user, login, errMsg } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "customer") {
        navigate("/", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login({ identifier, password, rememberMe }, navigate);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    !isLoading && (
      <div>
        <div className="flex h-screen w-screen flex-col lg:flex-row">
          <div
            className="flex h-full w-full flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
          <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-5 bg-white px-10 py-8 lg:w-2/3 lg:gap-10 lg:px-20">
            <div className="flex flex-col">
              <button
                onClick={() => navigate("/")}
                className="text-primary self-center text-4xl font-bold whitespace-nowrap italic"
              >
                RONGTHAO
              </button>
            </div>
            <div className="w-full rounded-lg border-gray-200 bg-white">
              <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h1 className="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="identifier"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Username or email
                    </label>
                    <input
                      type="text"
                      name="identifier"
                      id="identifier"
                      placeholder="Enter your username or email"
                      className="border-primary block w-full border-b-3 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                      required
                      value={identifier}
                      onChange={(e) => setidentifier(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="border-primary block w-full border-b-3 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="rememberMe"
                          aria-describedby="rememberMe"
                          type="checkbox"
                          className="focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(!rememberMe)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="rememberMe" className="text-gray-500">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  {errMsg && (
                    <div className="text-sm text-red-500">{errMsg}</div>
                  )}
                  <div className="flex w-full flex-row justify-between">
                    <button
                      type="submit"
                      className="bg-primary me-2 mb-2 w-full rounded-lg bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="text-sm">
                  <label className="flex justify-center text-gray-500">
                    Create new account?
                    <a
                      href="/register"
                      className="ml-1 ps-1 font-semibold text-blue-400 hover:underline"
                    >
                      Sign up now.
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden"></div>
        </div>
      </div>
    )
  );
}
