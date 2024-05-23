import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import Sidebar from "@/views/components/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const { user, token, setToken } = useStateContext();
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post("/logout");
            if (res.status === 200 && res.data.success === true) {
                setToken(null);
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // const getAllArtist = async () => {
    //     try {
    //         const res = await axiosInstance.get("/artist");
    //         if (res.status === 200 && res.data.success === true) {
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div>
            <Sidebar handleLogout={handleLogout} />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
