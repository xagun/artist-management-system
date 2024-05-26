import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "sonner";
import { useStateContext } from "@/context/ContextProvider";

type IProps = {
    addUser?: boolean;
    handleCloseUserDialog?: () => void;
    updateAction?: boolean;
    updateReqData?: IUser;
    getAllUsers?: () => void;
    profileUpdate?: boolean;
};

const Register = ({
    addUser,
    handleCloseUserDialog,
    updateAction,
    updateReqData,
    getAllUsers,
    profileUpdate,
}: IProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [cPassword, setCPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const { setUser } = useStateContext();
    const navigate = useNavigate();

    const handleRegister = async () => {
        const params = {
            first_name: firstName,
            last_name: lastName,
            dob: dob,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            password: password,
            password_confirmation: cPassword,
        };
        try {
            const res = await axiosInstance.post("/register", params);
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                addUser && getAllUsers?.();
                addUser ? handleCloseUserDialog?.() : navigate("/login");
            }
        } catch (err: any) {
            toast(err.response.data.message);
            setError(true);
            console.log(err);
        }
    };

    const updateUser = async () => {
        const params = {
            first_name: firstName,
            last_name: lastName,
            dob: dob,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
        };
        try {
            const res = await axiosInstance.post(
                `/user/update/${updateReqData?.id}`,
                params
            );
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                profileUpdate
                    ? setUser({
                          ...params,
                          dob: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
                          id: updateReqData?.id,
                      })
                    : getAllUsers?.();
                handleCloseUserDialog?.();
            }
        } catch (err: any) {
            setError(true);
            toast(err.response.data.message);
        }
    };

    useEffect(() => {
        if (updateReqData) {
            setFirstName(updateReqData.first_name);
            setLastName(updateReqData.last_name);
            setAddress(updateReqData.address);
            setPhone(updateReqData.phone);
            setEmail(updateReqData.email);
            setGender(updateReqData.gender);
            const newD = moment(updateReqData.dob).format("YYYY-MM-DD");
            setDob(newD);
        }
    }, [updateReqData]);

    const errorClass = "border-red-300";

    return (
        <div className="w-full">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
                {!addUser && !updateAction && (
                    <div>
                        <h1 className="mb-3">Create new Account</h1>
                        <span className="text-sm">
                            Already have an account
                        </span>{" "}
                        <Link
                            to="/login"
                            className="font-bold text-lg text-linkText"
                        >
                            Login Here
                        </Link>
                    </div>
                )}
            </h3>
            <div className="flex flex-col space-y-3">
                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="firstName"
                            className="text-sm font-semibold text-gray-500"
                        >
                            First Name
                        </label>
                        <input
                            placeholder="Enter first name"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoFocus
                            className={cn(
                                "inputClass",
                                error && firstName === "" && errorClass
                            )}
                        />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="firstName"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Last Name
                        </label>
                        <input
                            placeholder="Enter last name"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && lastName === "" && errorClass
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="dob"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Date of birth
                            </label>
                        </div>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && dob === "" && errorClass
                            )}
                        />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="gender"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Gender
                            </label>
                        </div>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && gender === "" && errorClass
                            )}
                        >
                            <option value="" selected>
                                Select your gender
                            </option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Others</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="address"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Address
                            </label>
                        </div>
                        <input
                            placeholder="Address"
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={cn("inputClass")}
                        />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="phone"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Phone no.
                            </label>
                        </div>
                        <input
                            placeholder="XXXXXXXXXX"
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && phone === "" && errorClass
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-500"
                    >
                        Email address
                    </label>
                    <input
                        placeholder="Enter your email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(
                            "inputClass",
                            error && email === "" && errorClass
                        )}
                    />
                </div>
                {!updateAction && (
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
                            placeholder="Enter password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && password === "" && errorClass
                            )}
                        />
                    </div>
                )}
                {!updateAction && (
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-gray-500"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <input
                            placeholder="Enter password"
                            type="password"
                            id="cPassword"
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && cPassword === "" && errorClass
                            )}
                        />
                    </div>
                )}

                <div className="text-end">
                    <Button
                        className="w-[140px] px-4 py-2 text-sm"
                        onClick={updateAction ? updateUser : handleRegister}
                    >
                        {addUser
                            ? "Add User"
                            : updateAction
                            ? "Update"
                            : "Register"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;
