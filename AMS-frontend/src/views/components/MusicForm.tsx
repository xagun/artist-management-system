import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/AxiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type IProps = {
    updateAction: boolean;
    activeArtistId: string;
    handleMusicDialog: () => void;
    musicUpdateReq?: any;
};
const MusicForm = ({
    updateAction,
    musicUpdateReq,
    activeArtistId,
    handleMusicDialog,
}: IProps) => {
    const [albumName, setAlbumName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const errorClass = "border-red-500";

    const { setFullSpinner } = useStateContext();

    const handleAddSong = async () => {
        setFullSpinner(true);

        const params = {
            artist_id: activeArtistId,
            album_name: albumName,
            genre: genre,
            title: title,
        };
        try {
            const res = await axiosInstance.post("/music", params);
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                handleMusicDialog();
                setFullSpinner(false);
            }
        } catch (err: any) {
            toast(err.response.data.message);
            setError(true);
            setFullSpinner(false);
            console.log(err);
        }
    };

    useEffect(() => {
        if (musicUpdateReq) {
            setTitle(musicUpdateReq.title);
            setAlbumName(musicUpdateReq.album_name);
            setGenre(musicUpdateReq.genre);
        }
    }, [updateAction === true]);

    const handleUpdateMusic = async () => {
        setFullSpinner(true);

        const params = {
            artist_id: activeArtistId,
            album_name: albumName,
            genre: genre,
            title: title,
        };
        try {
            const res = await axiosInstance.post(
                `/music/update/${musicUpdateReq.id}`,
                params
            );
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                handleMusicDialog();
                setFullSpinner(false);
            }
        } catch (err: any) {
            toast(err.response.data.message);
            setError(true);
            setFullSpinner(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-3">
                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="title"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Title
                        </label>
                        <input
                            placeholder="Enter music title"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && title === "" && errorClass
                            )}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Album name
                        </label>
                        <input
                            placeholder="Enter album name"
                            type="text"
                            id="albumName"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && albumName === "" && errorClass
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-4 max-sm:flex-col">
                    <div className="flex flex-col space-y-1 w-full">
                        <label
                            htmlFor="genre"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Genre
                        </label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className={cn(
                                "inputClass",
                                error && genre === "" && errorClass
                            )}
                        >
                            <option value="" selected>
                                Select genre
                            </option>
                            <option value="rnb">RnB</option>
                            <option value="classic">Classic</option>
                            <option value="country">Country</option>
                            <option value="rock">Rock</option>
                            <option value="jazz">Jazz</option>
                        </select>
                    </div>
                </div>

                <div className="text-end">
                    <Button
                        className="w-[140px] px-4 py-2"
                        onClick={
                            updateAction ? handleUpdateMusic : handleAddSong
                        }
                    >
                        {updateAction ? "Update" : "Add Music"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MusicForm;
