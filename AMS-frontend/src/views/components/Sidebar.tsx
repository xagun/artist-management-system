import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, LogOut, Music, PencilIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = ({ handleLogout }: { handleLogout: () => void }) => {
    const userString = localStorage.getItem("userDetails");
    const user = userString ? JSON.parse(userString) : null;

    return (
        <div className="text-white">
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-30 w-64 h-screen  transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-autos bg-gray-800 flex justify-center items-center ">
                    <ul className="space-y-4 font-medium flex flex-col text-white">
                        {/* <div className="my-3 text-4xl font-bold tracking-wider text-center">
                            <span>AMS</span>
                            <div className="text-xs">
                                Artist Management System
                            </div>
                        </div> */}
                        <div className="flex p-2 gap-3 justify-between items-center sm:hidden">
                            <div className="flex gap-3 items-center">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-xs font-light">
                                        Welcome back
                                    </p>
                                    <p className="text-lg">
                                        {user?.first_name}
                                    </p>
                                </div>
                            </div>
                            <Button className="flex p-2 rounded-md h-8 w-8">
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        <li>
                            <p className="p-2 text-white text-2xl font-thin mb-3">
                                Manage
                            </p>
                            <Link
                                to="/users"
                                className="flex items-center p-2 text-thin rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group"
                            >
                                <span className="">Users</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/artists"
                                className="flex items-center p-2 text-thin rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group"
                            >
                                <span className="">Artists</span>
                            </Link>
                        </li>

                        <li>
                            <p className="p-2 text-white text-2xl font-thin mb-3">
                                My Music
                            </p>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-thin rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group"
                            >
                                <span className="">Discover</span>
                            </Link>
                        </li>

                        <li onClick={handleLogout}>
                            <Link
                                to="#"
                                className="flex items-center p-2 text-thin rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group"
                            >
                                <span className="">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
