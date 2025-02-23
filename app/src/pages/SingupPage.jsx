import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginpage_img.png"; // ใช้ relative path

import ax from "../conf/ax";
import { toast } from "react-toastify";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [agianPassword, setAgainPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

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

    if (password != agianPassword) {
      setErrMsg("Password not match");
      return;
    }

    try {
      setIsLoading(true);
      await ax.post("/users", formData);
      toast.success("Created Successfully!");
      navigate("/login");
      // console.log("User Created:", response.data);
    } catch (error) {
      setErrMsg(
        "Error: " +
          (error.response?.data?.error?.message || "Something went wrong"),
      );
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
                  Create New Account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="identifier"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="border-primary block w-full border-b-3 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="identifier"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="identifier"
                      id="identifier"
                      placeholder="email@gmail.com"
                      className="border-primary block w-full border-b-3 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                      required
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Enter Password Again
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password2"
                      placeholder="Password"
                      className="border-primary block w-full border-b-3 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                      required
                      onChange={(e) => setAgainPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 w-fit items-center">
                      <input
                        id="userform"
                        aria-describedby="userform"
                        type="checkbox"
                        required
                        className="focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500">
                        I accept and agree to the
                        <a
                          href="#"
                          className="ps-1 text-blue-400 hover:underline"
                        >
                          Term of Use.
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className="text-sm text-red-500">{errMsg}</div>
                  <div className="flex w-full flex-row justify-between">
                    <button
                      type="submit"
                      className="bg-primary me-2 mb-2 w-full rounded-lg bg-gradient-to-r px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Create New Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
