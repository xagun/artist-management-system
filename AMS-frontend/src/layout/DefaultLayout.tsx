import { useStateContext } from "@/context/ContextProvider";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

export default function DefaultLayout() {
    const { token } = useStateContext();
    const location = useLocation();
    const pathName = location.pathname;
    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center font-lato ">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-[800px]">
                <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                    <div className="my-3 text-4xl font-bold tracking-wider text-center">
                        <span>AMS</span>
                        <div className="text-xs">Artist Management System</div>
                    </div>
                    <p className="mt-6 font-normal text-center md:mt-0 text-sm ">
                        Login or sign up now to experience the future of artist
                        management. With our platform, you can not only view
                        artists and their music but also take control of your
                        music universe.
                    </p>
                    <p className="flex flex-col items-center justify-center mt-10 text-center">
                        <span>
                            {pathName.match("login")
                                ? "Don't have an account?"
                                : "Already have an account"}
                        </span>
                        {pathName.match("login") ? (
                            <Link to="/register" className="font-bold">
                                Register Here
                            </Link>
                        ) : (
                            <Link to="/login" className="font-bold">
                                Login Here
                            </Link>
                        )}
                    </p>
                </div>
                <div className="p-5 bg-white md:flex-1 items-center flex justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
