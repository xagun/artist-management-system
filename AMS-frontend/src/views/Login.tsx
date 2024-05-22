import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [passowrd, setPassowrd] = useState<string>("");

    const handleLogin = () => {};

    return (
        <div className="w-full">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
                Account Login
            </h3>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-500"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        id="password"
                        value={passowrd}
                        onChange={(e) => setPassowrd(e.target.value)}
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                </div>

                <Button
                    className="w-[140px] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}
