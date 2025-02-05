import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);

    const [identifier, setidentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    const { login, user, errMsg } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "CUSTOMER") {
                navigate("/customer/homepage", { replace: true });
            } else if (user.role === "ADMIN") {
                navigate("/admin/dashboard", { replace: true });
            }
        }
    }, [user, navigate]);
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login({ identifier, password, rememberMe });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        !isLoading && (
            <>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-1/2">
                    <div className="w-full bg-white rounded-lg border-gray-200 border-2 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="identifier"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Username or email
                                    </label>
                                    <input
                                        type="text"
                                        name="identifier"
                                        id="identifier"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                        required
                                        value={identifier}
                                        onChange={(e) => setidentifier(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="rememberMe"
                                                aria-describedby="rememberMe"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(!rememberMe)}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="rememberMe" className="text-gray-500 ">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {errMsg && <div className="text-red-500 text-sm">{errMsg}</div>}
                                <button
                                    type="submit"
                                    className=" w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

