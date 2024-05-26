import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { checkActivePath } from "@/utils/check-active-path";
import { cn } from "@/lib/utils";
import ProfilePopover from "./ProfilePopover";

const Sidebar = ({ handleLogout }: { handleLogout: () => void }) => {
    return (
        <div className="text-white ">
            <div className="sm:hidden flex justify-between">
                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                <div className="px-2 py-2">
                    <ProfilePopover />
                </div>
            </div>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 overflow-y-auto bg-gradient-to-tr from-neutral-900 to-neutral-800 sm:from-transparent sm:to-transparent sm:bg-transparent flex py-20 sm:mx-5 flex-col justify-between ">
                    <ul className="space-y-4 font-medium flex flex-col gap-10">
                        {/* <div className="flex p-2 gap-3 justify-between items-center sm:hidden">
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
                        </div> */}
                        <div>
                            <p className="p-2 text-white text-2xl font-thin mb-3">
                                All Music
                            </p>
                            <li>
                                <Link
                                    to="/"
                                    className={cn(
                                        " flex items-center p-3 rounded-[14px] dark:text-white hover:bg-black dark:hover:bg-gray-700 group cursor-pointer",
                                        checkActivePath("dashboard") &&
                                            "bg-black"
                                    )}
                                >
                                    <span className="font-light">Discover</span>
                                </Link>
                            </li>
                        </div>

                        <div className="flex flex-col">
                            <p className="p-2 text-white text-2xl font-thin mb-3">
                                Manage
                            </p>
                            <li>
                                <Link
                                    to="/users"
                                    className={cn(
                                        " flex items-center p-3 rounded-[14px] hover:bg-black dark:text-white mb-2 group cursor-pointer",
                                        checkActivePath("users") && "bg-black"
                                    )}
                                >
                                    <span className="font-light">Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/artists"
                                    className={cn(
                                        " flex items-center p-3 rounded-[14px] dark:text-white hover:bg-black dark:hover:bg-gray-700 group cursor-pointer",
                                        checkActivePath("artists") && "bg-black"
                                    )}
                                >
                                    <span className="font-light">Artists</span>
                                </Link>
                            </li>
                        </div>
                    </ul>
                    <div className="" onClick={handleLogout}>
                        <Link
                            to="#"
                            className="flex items-center gap-4 p-2  rounded-[14px] cursor-pointer"
                        >
                            <LogOut />
                            <span className="font-light">Logout</span>{" "}
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
