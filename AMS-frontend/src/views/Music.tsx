import { useStateContext } from "@/context/ContextProvider";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import { DataTable } from "./components/DataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpDown, MoreVertical, SkipBack } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./components/DeleteDialog";
import MusicForm from "./components/MusicForm";
import { IArtist } from "@/types/types";
import { toast } from "sonner";

type IProps = {
    activeArtistId: string;
    handleMusicView: () => void;
    activeArtist: IArtist;
};

export default function Music({
    activeArtistId,
    handleMusicView,
    activeArtist,
}: IProps) {
    const [musicList, setMusicList] = useState<any[]>([]);

    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [updateAction, setUpdateAction] = useState<boolean>(false);
    const [musicToDelete, setMusicToDelete] = useState<string>("");
    const [musicUpdateReq, setMusicUpdateReq] = useState<any>({});

    const { setFullSpinner } = useStateContext();

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        className="p-0 m-0 hover:bg-transparent"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            accessorKey: "album_name",
            header: "Album name",
        },
        {
            accessorKey: "genre",
            header: "Genre",
        },

        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setUpdateAction(true);
                                    setMusicUpdateReq(row.original);
                                    // setOpen(true);
                                }}
                            >
                                Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    handleDeleteDialog();
                                    setMusicToDelete(row.original.id);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const getMusicByArtist = async () => {
        setFullSpinner(true);
        try {
            const res = await axiosInstance.get(
                `/artist-music/${activeArtistId}`
            );
            if (res.status === 200 && res.data.success === true) {
                setMusicList(res.data.data);
                setFullSpinner(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteDialog = () => {
        setDeleteDialog(!deleteDialog);
    };

    const deleteMusic = async (id: string) => {
        setFullSpinner(true);
        try {
            const res = await axiosInstance.delete(`/music/delete/${id}`);
            if (res.status === 200 && res.data.success === true) {
                toast(res.data.message);
                setFullSpinner(false);
                getMusicByArtist();
            }
        } catch (err: any) {
            setFullSpinner(false);
            toast(err.response.data.message);
        }
    };

    useEffect(() => {
        getMusicByArtist();
    }, [activeArtistId !== ""]);

    return (
        <div className="">
            <h1>
                Music by{" "}
                <span className="text-xl font-bold text-primary">
                    {activeArtist.name}
                    {/* {musicList.length > 0 && musicList[0].artist_name} */}
                </span>
            </h1>
            {updateAction ? (
                <>
                    <ArrowLeft
                        className="my-3 cursor-pointer text-primary hover:-translate-x-2 transition-transform"
                        onClick={() => {
                            setUpdateAction(false);
                        }}
                    >
                        Back
                    </ArrowLeft>
                    <MusicForm
                        updateAction={true}
                        musicUpdateReq={musicUpdateReq}
                        activeArtistId={activeArtistId}
                        handleMusicDialog={() => {
                            setUpdateAction(false);
                            getMusicByArtist();
                        }}
                    />
                </>
            ) : (
                <DataTable
                    columns={columns}
                    data={musicList}
                    filterData={"name"}
                    filterDataLabel={"name"}
                />
            )}

            <DeleteDialog
                open={deleteDialog}
                handleOnChange={handleDeleteDialog}
                onDelete={deleteMusic}
                itemToDelete={musicToDelete}
            />
        </div>
    );
}
