import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import { cn } from "@/lib/utils";
import { IArtist } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import moment from "moment";

type IProps = {
    updateAction: boolean;
    handleDialog: () => void;
    artistUpdateReq: IArtist;
};

const ArtistForm = ({
    updateAction,
    handleDialog,
    artistUpdateReq,
}: IProps) => {
    const [name, setName] = useState<string>("");
    const [firstRelease, setFirstRelease] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [albumsReleased, setAlbumsReleased] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const { setFullSpinner } = useStateContext();

    const inputClass =
        "px-4 py-2 transition duration-300 border border-gray-300 rounded-md focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200";

    const errorClass = "border-red-300";

    const handleAddArtist = async () => {
        setFullSpinner(true);
        const params = {
            name: name,
            dob: dob,
            gender: gender,
            address: address,
            first_release_year: firstRelease,
            no_of_albums_released: albumsReleased,
        };
        try {
            const res = await axiosInstance.post("/artist", params);
            if (res.status === 200 && res.data.success === true) {
                handleDialog();
                setFullSpinner(false);
            }
        } catch (err) {
            setError(true);
            setFullSpinner(false);
            console.log(err);
        }
    };

    const handleUpdateArtist = async () => {
        setFullSpinner(true);
        const params = {
            name: name,
            dob: dob,
            gender: gender,
            address: address,
            first_release_year: firstRelease,
            no_of_albums_released: albumsReleased,
        };
        try {
            const res = await axiosInstance.post(
                `/artist/update/${artistUpdateReq.id}`,
                params
            );
            if (res.status === 200 && res.data.success === true) {
                handleDialog();
                setFullSpinner(false);
            }
        } catch (err) {
            setError(true);
            setFullSpinner(false);
            console.log(err);
        }
    };

    useEffect(() => {
        if (artistUpdateReq && updateAction) {
            debugger;
            setName(artistUpdateReq.name);
            setGender(artistUpdateReq.gender);
            setAddress(artistUpdateReq.address);
            setFirstRelease(artistUpdateReq.first_release_year);
            setAlbumsReleased(artistUpdateReq.no_of_albums_released.toString());

            let newD = moment(artistUpdateReq.dob, "MMMM D, YYYY").format(
                "YYYY-MM-DD"
            );
            setDob(newD);
        }
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-3">
                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Name
                        </label>
                        <input
                            placeholder="Enter first name"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            className={cn(
                                inputClass,
                                error && name === "" && errorClass
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
                                inputClass,
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
                                inputClass,
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
                                htmlFor="firstReleaseYear"
                                className="text-sm font-semibold text-gray-500"
                            >
                                First release year
                            </label>
                        </div>
                        <input
                            pattern="[0-9]{4}"
                            title="Enter a valid year (four digits)"
                            placeholder="First release year"
                            type="text"
                            id="firsrReleaseYear"
                            value={firstRelease}
                            onChange={(e) => setFirstRelease(e.target.value)}
                            className={cn(
                                inputClass,
                                error && firstRelease === "" && errorClass
                            )}
                        />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="albumsReleased"
                                className="text-sm font-semibold text-gray-500"
                            >
                                No. of albums released
                            </label>
                        </div>

                        <input
                            placeholder="Enter no. of albums released"
                            type="text"
                            pattern="[0-9]{4}"
                            id="albumsReleased"
                            value={albumsReleased}
                            onChange={(e) => setAlbumsReleased(e.target.value)}
                            className={cn(inputClass)}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-1">
                    <label
                        htmlFor="address"
                        className="text-sm font-semibold text-gray-500"
                    >
                        Address
                    </label>
                    <input
                        placeholder="Address"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div className="text-end">
                    <Button
                        className="w-[140px] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                        onClick={
                            updateAction ? handleUpdateArtist : handleAddArtist
                        }
                    >
                        {updateAction ? "Update" : "Add Artist"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ArtistForm;