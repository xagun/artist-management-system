import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullWindowSpinner from "./components/FullWindowSpinner";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const { setToken, setUser, setFullSpinner } = useStateContext();

    const handleLogin = async () => {
        setFullSpinner(true);
        const params = {
            email: email,
            password: password,
        };
        try {
            const res = await axiosInstance.post("/login", params);
            if (res.status === 200 && res.data.success === true) {
                setToken(res.data.data.access_token);
                setUser(res.data.data.user_details);
                navigate("/dashboard");
                setFullSpinner(false);
            }
        } catch (err) {
            setFullSpinner(false);
            setError(true);
            console.log(err);
        }
    };

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
