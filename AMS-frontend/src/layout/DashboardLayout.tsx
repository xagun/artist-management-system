import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import Sidebar from "@/views/components/Sidebar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import FullWindowSpinner from "@/views/components/FullWindowSpinner";

import ProfilePopover from "@/views/components/ProfilePopover";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout() {
    const { token, setToken, setFullSpinner, fullSpinner } = useStateContext();
    const navigate = useNavigate();

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

    const location = useLocation();

    const pathName = location.pathname;

    return (
        <div className="h-[100vh] overflow-hidden bg-gradient-to-tr from-neutral-900 to-neutral-800 font-lato">
            {fullSpinner && <FullWindowSpinner />}

            <Sidebar handleLogout={handleLogout} />

            <div className="sm:ml-64 bg-white shadow-2xl sm:rounded-tl-[40px] sm:rounded-bl-[40px] p-2 h-full overflow-y-scroll overflow-x-hidden">
                <div className="justify-between items-center mx-8 my-2 hidden sm:flex ">
                    <div className="mx-8 my-2 flex items-center gap-3">
                        <span className="tracking-wider font-light">AMS</span>
                        <ChevronRight />
                        <span className="capitalize text-[15px]">
                            {pathName.replace("/", "")}
                        </span>
                    </div>
                    <ProfilePopover />
                </div>
                <div className="rounded-lg m-5 sm:m-14">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
