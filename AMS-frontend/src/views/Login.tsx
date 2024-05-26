import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
                toast(res.data.message);
            }
        } catch (err: any) {
            toast(err.response.data.message);
            setFullSpinner(false);
            setError(true);
        }
    };

    return (
        <div className="w-full">
            <div className="py-4">
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">
                    Login to your account
                </h3>
                <p className="text-sm text-gray-600">
                    Enter you email and password to proceed
                </p>
            </div>
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
                        className="inputClass"
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
                        className="inputClass"
                    />
                </div>
                <div className="text-end">
                    <Button
                        className="w-[140px] px-4 py-2 text-sm font-semibold "
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
                <div className="text-end">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-linkText">
                        Register Here
                    </Link>
                </div>
            </div>
        </div>
    );
}
