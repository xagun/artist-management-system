import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/DataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import axiosInstance from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import { IUser } from "@/types/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Register from "./Register";
import DeleteDialog from "./components/DeleteDialog";
import moment from "moment";
import { toast } from "sonner";
import { useStateContext } from "@/context/ContextProvider";

export default function Users() {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [updateAction, setUpdateAction] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [selectedEmailToDelete, setSelectedEmailToDelete] =
        useState<string>("");

    const [updateReqData, setUpdateReqData] = useState<IUser>({} as IUser);

    const { setFullSpinner } = useStateContext();

    const handleDialogOpen = () => {
        setOpen(!open);
    };
    const handleUpdateDialog = () => {
        setUpdateAction(!updateAction);
    };

    const handleDeleteDialog = () => {
        setDeleteDialog(!deleteDialog);
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "full_name",
            header: ({ column }) => {
                return (
                    <Button
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
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "dob",
            header: "Date of birth",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "address",
            header: "Address",
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
                                    setUpdateReqData(row.original);
                                }}
                            >
                                Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    handleDeleteDialog();
                                    setSelectedEmailToDelete(
                                        row.original.email
                                    );
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

    const deleteUser = async (emailToDelete: string) => {
        setFullSpinner(true);

        const param = {
            email: emailToDelete,
        };
        try {
            const res = await axiosInstance.post("/user/delete", param);
            if (res.status === 200 && res.data.success === true) {
                setFullSpinner(false);

                toast.success(res.data.message);
                setSelectedEmailToDelete("");
                getAllUsers();
            }
        } catch (err: any) {
            setFullSpinner(false);

            toast.error(err.response.data.message);
        }
    };

    const getAllUsers = async () => {
        setFullSpinner(true);

        try {
            const res = await axiosInstance.get("/users");
            if (res.status === 200 && res.data.success === true) {
                const usersData = res.data.data;
                usersData.forEach((user: IUser) => {
                    user.dob = moment(new Date(user.dob)).format("LL");
                });
                setFullSpinner(false);

                setAllUsers(usersData);
            }
        } catch (err: any) {
            setFullSpinner(false);

            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <Dialog open={open} onOpenChange={handleDialogOpen}>
                    <DialogTrigger>
                        <Button>Add User</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Add user</DialogTitle>
                            <DialogDescription>
                                <Register
                                    addUser={true}
                                    handleCloseUserDialog={handleDialogOpen}
                                    updateAction={updateAction}
                                    getAllUsers={getAllUsers}
                                />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable
                columns={columns}
                data={allUsers}
                filterData={"full_name"}
                filterDataLabel={"name"}
            />

            <DeleteDialog
                open={deleteDialog}
                handleOnChange={handleDeleteDialog}
                onDelete={deleteUser}
                itemToDelete={selectedEmailToDelete}
            />

            {/* //Update User  */}
            <Dialog open={updateAction} onOpenChange={handleUpdateDialog}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Update user</DialogTitle>
                        <DialogDescription>
                            <Register
                                addUser={false}
                                handleCloseUserDialog={handleUpdateDialog}
                                updateAction={updateAction}
                                updateReqData={updateReqData}
                                getAllUsers={getAllUsers}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
