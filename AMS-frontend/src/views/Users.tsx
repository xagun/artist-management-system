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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Register from "./Register";

export default function Users() {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [selectedEmailToDelete, setSelectedEmailToDelete] =
        useState<string>("");

    const handleDialogOpen = () => {
        setOpen(!open);
        getAllUsers();
    };

    const handleDeleteDialog = (email: string) => {
        setSelectedEmailToDelete(email);
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
                console.log(row.original);
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Update</DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    handleDeleteDialog(row.original.email)
                                }
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
        const param = {
            email: emailToDelete,
        };
        try {
            const res = await axiosInstance.post("/user/delete", param);
            if (res.status === 200 && res.data.success === true) {
                setSelectedEmailToDelete("");
                getAllUsers();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await axiosInstance.get("/users");
            if (res.status === 200 && res.data.success === true) {
                setAllUsers(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl">Users</h1>
                <Dialog open={open} onOpenChange={handleDialogOpen}>
                    <DialogTrigger>
                        <Button>Add User</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                            <DialogDescription>
                                <Register
                                    addUser={true}
                                    handleCloseUserDialog={handleDialogOpen}
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

            <AlertDialog open={deleteDialog} onOpenChange={handleDeleteDialog}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteUser(selectedEmailToDelete)}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
