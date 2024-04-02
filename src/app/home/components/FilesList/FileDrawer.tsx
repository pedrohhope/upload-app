"use client"
import { db } from "@/app/firebase"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { toast } from "@/components/ui/use-toast"
import { IUploadFile } from "@/interfaces/uploadFile"
import bytes from "bytes"
import { User } from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"


const FileDrawer = ({
    isOpen,
    onOpenChange,
    file,
    user
}: {
    isOpen: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    file: IUploadFile | null,
    user: User | null | undefined
}) => {
    if (!file) return;
    console.log("file", file)

    const handleDelete = async () => {
        if (!user || !user.uid) {
            console.error("User not authenticated or user UID not available");
            return;
        }

        const fileId = file.uid;

        if (!fileId) {
            console.error("File ID not available");
            return;
        }

        try {
            await deleteDoc(doc(db, `users/${user.uid}/uploads`, fileId));
            onOpenChange(false);

            toast({
                title: "File deleted",
                description: "The file has been successfully deleted.",
            });
        } catch (error) {
            console.error("Error deleting file:", error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the file.",
                variant: "destructive",
            });
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg py-5">
                    <DrawerHeader className="flex justify-between">
                        <div>
                            <DrawerTitle>{file.name}</DrawerTitle>
                            <DrawerDescription>{file.type}</DrawerDescription>
                        </div>

                        <div>
                            <p>{bytes(file.size)}</p>
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Link href={file.url} target="_blank" className="bg-[#171717] text-white py-2 px-4 rounded-md flex justify-center items-center">Download</Link>
                        <Button variant="destructive" className="w-full text-[16px] mb-5" onClick={handleDelete}>Delete</Button>

                        <DrawerClose>
                            <Button variant="outline" className="w-full text-[16px]">Cancel</Button>
                        </DrawerClose>

                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export { FileDrawer }

