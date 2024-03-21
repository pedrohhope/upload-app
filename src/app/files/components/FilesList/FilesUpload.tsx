"use client"
import { storage } from "@/app/firebase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { User } from "firebase/auth"
import { ref } from "firebase/storage"
import { MouseEvent, useState } from "react"
import {
    useUploadFile,
} from 'react-firebase-hooks/storage'


const FilesUpload = ({
    user
}: {
    user: User
}) => {
    const [uploadFile, uploading, UploadTaskSnapshot] = useUploadFile();
    const [file, setFile] = useState<File | undefined>(undefined);
    const storageRef = ref(storage, `uploads/${user.uid}/${file?.name}`)
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault()

        try {
            if (!file) throw new Error("No file selected");
            if (!user) throw new Error("User not logged in");
            await uploadFile(storageRef, file, {
                contentType: file.type
            })

            console.log(UploadTaskSnapshot)

            console.log("File uploaded successfully")

            toast({
                title: "Uploaded successfully",
                description: "Your file has been uploaded successfully",
            })

            setFile(undefined);
            setOpen(false)
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
        <Dialog open={open} onOpenChange={setOpen}>
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
                        disabled={!file || uploading}
                    >{uploading ? "Uploading..." : "Upload"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export { FilesUpload }
