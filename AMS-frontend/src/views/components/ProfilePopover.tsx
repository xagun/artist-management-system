import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, LogOut, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { IUser } from "@/types/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Register from "../Register";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/AxiosInstance";
import { useStateContext } from "@/context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const ProfilePopover = () => {
    const { setFullSpinner, setToken } = useStateContext();
    const navigate = useNavigate();

    const [updateAction, setUpdateAction] = useState<boolean>(false);
    const [updatePasswordModal, setUpdatePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const [updateReqData, setUpdateReqData] = useState<IUser>({} as IUser);

    const userString = localStorage.getItem("userDetails");
    const user = userString ? JSON.parse(userString) : null;

    const handlePasswordDialog = () => {
        setUpdatePassword(!updatePasswordModal);
        setPassword("");
        setCPassword("");
        setCurrentPassword("");
        setError(false);
    };

    const handleUpdateProfileClick = () => {
        setUpdateAction(true);
        const userData = user;
        userData["dob"] = moment(user.dob).format("YYYY-MM-DD");
        setUpdateReqData(userData);
    };
    const handleUpdateDialog = () => {
        setUpdateAction(!updateAction);
    };

    const updatePassword = async () => {
        setFullSpinner(true);

        const params = {
            old_password: currentPassword,
            password: password,
            password_confirmation: cPassword,
        };
        try {
            const res = await axiosInstance.post(
                "/user/update-password",
                params
            );
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                setFullSpinner(false);
                handlePasswordDialog();
            }
        } catch (err: any) {
            toast(err.response.data.message);
            setError(true);
            setFullSpinner(false);
            console.log(err);
        }
    };
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

    const errorClass = "border-red-300";
    return (
        <div className="flex items-center gap-6">
            <div className="border-r-1 border border-red-900 h-8 sm:h-10"></div>
            <div>
                <p className="text-xs font-light">Welcome back</p>
                <p className="text-sm sm:text-lg">
                    {user?.first_name} {user?.last_name}
                </p>
            </div>
            <Popover>
                <PopoverTrigger>
                    <Avatar className="h-10 w-10  sm:h-12 sm:w-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mr-4 ">
                    <div className="flex flex-col">
                        <Button
                            className="w-full justify-between gap-2"
                            variant="ghost"
                            onClick={() => {
                                handleUpdateProfileClick();
                            }}
                        >
                            Edit profile <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                            className="w-full justify-between gap-2"
                            variant="ghost"
                            onClick={() => {
                                setUpdatePassword(true);
                                handlePasswordDialog();
                            }}
                        >
                            Change password <Lock className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-between gap-2"
                            onClick={handleLogout}
                        >
                            Logout <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* //Update User  */}
            <Dialog open={updateAction} onOpenChange={handleUpdateDialog}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Update profile</DialogTitle>
                        <DialogDescription>
                            <Register
                                addUser={false}
                                handleCloseUserDialog={handleUpdateDialog}
                                updateAction={updateAction}
                                updateReqData={updateReqData}
                                profileUpdate={true}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* //Update Password  */}
            <Dialog
                open={updatePasswordModal}
                onOpenChange={handlePasswordDialog}
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Update Password</DialogTitle>
                        <DialogDescription>
                            <div>
                                <div className="flex flex-col space-y-1 mt-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-gray-500"
                                        >
                                            Current Password
                                        </label>
                                    </div>
                                    <input
                                        placeholder="Current Password"
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        className={cn(
                                            "inputClass",
                                            error &&
                                                currentPassword === "" &&
                                                errorClass
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mt-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-gray-500"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className={cn(
                                            "inputClass",
                                            (error ||
                                                (error && password === "")) &&
                                                errorClass
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mt-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-gray-500"
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                    <input
                                        placeholder="Confirm password"
                                        type="password"
                                        id="cPassword"
                                        value={cPassword}
                                        onChange={(e) =>
                                            setCPassword(e.target.value)
                                        }
                                        className={cn(
                                            "inputClass",
                                            (error ||
                                                (error && cPassword === "")) &&
                                                errorClass
                                        )}
                                    />
                                </div>

                                <div className="text-end mt-4">
                                    <Button onClick={updatePassword}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProfilePopover;