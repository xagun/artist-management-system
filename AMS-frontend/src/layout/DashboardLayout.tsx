import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import Sidebar from "@/views/components/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, Pencil } from "lucide-react";
import FullWindowSpinner from "@/views/components/FullWindowSpinner";

export default function DashboardLayout() {
    const { token, setToken, setFullSpinner, fullSpinner } = useStateContext();
    const navigate = useNavigate();
    const userString = localStorage.getItem("userDetails");
    const user = userString ? JSON.parse(userString) : null;

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {
        setFullSpinner(true);
        try {
            const res = await axiosInstance.post("/logout");
            if (res.status === 200 && res.data.success === true) {
                setFullSpinner(false);
                setToken(null);
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            setFullSpinner(false);
            console.log(err);
        }
    };

    return (
        <div className="h-[100vh] bg-gray-800 ">
            {fullSpinner && <FullWindowSpinner />}

            <Sidebar handleLogout={handleLogout} />

            <div className="sm:ml-64 bg-white overflow-scroll sm:rounded-tl-[40px] sm:rounded-bl-[40px] p-2 h-full">
                <div className="justify-end items-center mx-8 my-2 hidden sm:flex gap-6">
                    <div className="border-r-2 border border-red-700 h-10"></div>
                    <div className="flex gap-4 items-center">
                        <div>
                            <p className="text-xs font-light">Welcome back</p>
                            <p className="text-lg">
                                {user?.first_name} {user?.last_name}
                            </p>
                        </div>
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="mr-4 ">
                                <div className="flex flex-col">
                                    <Button
                                        className="w-full justify-start gap-2"
                                        variant="ghost"
                                    >
                                        <Pencil /> Edit Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2"
                                        onClick={handleLogout}
                                    >
                                        <LogOut /> Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="rounded-lg m-14">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
