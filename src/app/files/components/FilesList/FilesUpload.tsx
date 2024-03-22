"use client"
import { db, storage } from "@/app/firebase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { User } from "firebase/auth"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { MouseEvent, useState } from "react"
import {
    useUploadFile,
} from 'react-firebase-hooks/storage'


const FilesUpload = ({
    user
}: {
    user: User
}) => {
    const [uploadFile, uploading] = useUploadFile();
    const [file, setFile] = useState<File | undefined>(undefined);
    const storageRef = ref(storage, `uploads/${file?.name}`)
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [prossessingValue, setProcessingValue] = useState(0)
    const [disabled, setDisabled] = useState(false)


    const onOpenModal = () => {
        if (disabled && open) {
            return;
        }

        setOpen(!open)
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault()

        try {
            if (!file) throw new Error("No file selected");
            if (!user) throw new Error("User not logged in");
            setDisabled(true)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                setProcessingValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            }, (error) => {
                console.log(error)

                if (error instanceof Error) {
                    toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                    })
                }

                setDisabled(false)
            }, async () => {

                await addDoc(collection(db, `users/${user.uid}`, "uploads"), {
                    url: await getDownloadURL(uploadTask.snapshot.ref),
                    name: file.name,
                    size: uploadTask.snapshot.totalBytes,
                    type: file.type,
                    userId: user.uid,
                    createdAt: Timestamp.fromDate(new Date()),
                    lastUpdatedAt: Timestamp.fromDate(new Date()),
                })

                toast({
                    title: "Uploaded successfully",
                    description: "Your file has been uploaded successfully",
                })

                setFile(undefined);
                setProcessingValue(0)
                setOpen(false)
                setDisabled(false)
            })




        } catch (error) {
            console.log(error)

            if (error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                })
            }
        }
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        setFile(event.target.files?.[0])
    }

    return (
        <Dialog open={open} onOpenChange={onOpenModal}>
            <DialogTrigger asChild>
                <Button>Upload</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md flex flex-col gap-8">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Upload your file
                    </DialogDescription>
                </DialogHeader>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="file">File</Label>
                    <Input
                        onChange={onChangeFile}
                        id="file"
                        type="file"
                    />
                    <Progress value={prossessingValue} />
                </div>

                <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                    <Button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        disabled={!file || disabled}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >{uploading ? "Uploading..." : "Upload"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export { FilesUpload }

