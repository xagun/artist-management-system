import { IArtist } from "@/types/types";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/DataTable";
import moment from "moment";
import DeleteDialog from "./components/DeleteDialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ArtistForm from "./components/ArtistForm";
import { useStateContext } from "@/context/ContextProvider";
import MusicForm from "./components/MusicForm";
import Music from "./Music";

export default function Artists() {
    const [allArtists, setAllArtists] = useState<IArtist[]>([]);
    const [activeArtist, setActiveArtist] = useState<IArtist>({} as IArtist);

    const [artistToDelete, setArtistToDelete] = useState<number>();
    const [artistUpdateReq, setArtistUpdateReq] = useState<IArtist>(
        {} as IArtist
    );
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openMusicForm, setOpenMusicForm] = useState<boolean>(false);
    const [updateAction, setUpdateAction] = useState<boolean>(false);
    const [openMusicView, setOpenMusicView] = useState<boolean>(false);

    const [activeArtistId, setActiveArtistId] = useState<string>("");

    const { setFullSpinner } = useStateContext();

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        className="p-0 m-0 hover:bg-transparent"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "dob",
            header: "Date of birth",
        },

        {
            accessorKey: "first_release_year",
            header: "First release",
        },

        {
            accessorKey: "no_of_albums_released",
            header: "Albums released",
        },
        {
            header: "Songs",
            cell: ({ row }) => {
                return (
                    <div className="flex w-[100px] gap-1">
                        <Button
                            className="h-[30px] text-xs"
                            onClick={() => {
                                setActiveArtistId(row.original.id);
                                handleMusicDialog();
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            className="h-[30px] text-xs"
                            onClick={() => {
                                setActiveArtistId(row.original.id);
                                setActiveArtist(row.original);
                                handleMusicView();
                            }}
                        >
                            View{" "}
                        </Button>
                    </div>
                );
            },
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
                                    setArtistUpdateReq(row.original);
                                    setOpen(true);
                                }}
                            >
                                Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    handleDeleteDialog();
                                    setArtistToDelete(row.original.id);
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

    const getAllArtist = async () => {
        setUpdateAction(false);
        setFullSpinner(true);

        try {
            const res = await axiosInstance.get("/artist");
            if (res.status === 200 && res.data.success === true) {
                const artistsData = res.data.data;
                artistsData.forEach((artist: IArtist) => {
                    artist.dob = moment(new Date(artist.dob)).format("LL");
                });
                setAllArtists(res.data.data);
                setArtistUpdateReq({} as IArtist);
                setFullSpinner(false);
            }
        } catch (err) {
            setFullSpinner(false);
            console.log(err);
        }
    };

    const deleteArtist = async (id: string) => {
        setFullSpinner(true);
        try {
            const res = await axiosInstance.delete(`/artist/delete/${id}`);
            if (res.status === 200 && res.data.success === true) {
                setFullSpinner(false);
                getAllArtist();
            }
        } catch (err) {
            setFullSpinner(false);
            console.log(err);
        }
    };

    const handleDeleteDialog = () => {
        setDeleteDialog(!deleteDialog);
    };

    const handleArtistDialog = () => {
        setOpen(!open);
        getAllArtist();
    };

    const handleMusicDialog = () => {
        setOpenMusicForm(!openMusicForm);
        openMusicForm && setActiveArtistId("");
    };

    const handleMusicView = () => {
        setOpenMusicView(!openMusicView);
    };

    useEffect(() => {
        getAllArtist();
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <Dialog open={open} onOpenChange={handleArtistDialog}>
                    <DialogTrigger>
                        <Button>Add Artist</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle className="mb-4">
                                {updateAction ? "Update Artist" : "Add artist"}
                            </DialogTitle>
                            <DialogDescription>
                                <ArtistForm
                                    updateAction={updateAction}
                                    handleDialog={handleArtistDialog}
                                    artistUpdateReq={artistUpdateReq}
                                />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable
                columns={columns}
                data={allArtists}
                filterData={"name"}
                filterDataLabel={"name"}
            />

            <DeleteDialog
                open={deleteDialog}
                handleOnChange={handleDeleteDialog}
                onDelete={deleteArtist}
                itemToDelete={artistToDelete}
            />

            {/* Music Form */}
            <Dialog open={openMusicForm} onOpenChange={handleMusicDialog}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Add Music</DialogTitle>
                        <DialogDescription>
                            <MusicForm
                                updateAction={false}
                                activeArtistId={activeArtistId}
                                handleMusicDialog={handleMusicDialog}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Music View */}
            <Dialog open={openMusicView} onOpenChange={handleMusicView}>
                <DialogContent className="bg-white ">
                    <DialogHeader>
                        <DialogDescription>
                            <Music
                                activeArtistId={activeArtistId}
                                handleMusicView={handleMusicView}
                                activeArtist={activeArtist}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
