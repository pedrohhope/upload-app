"use client"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { IUploadFile } from "@/interfaces/uploadFile"
import bytes from "bytes"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"


const FileDrawer = ({
    isOpen,
    onOpenChange,
    file
}: {
    isOpen: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    file: IUploadFile | null
}) => {
    if (!file) return;

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange} snapPoints={['1000px']}>
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
                        <DrawerClose>
                            <Button variant="outline" className="w-full">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export { FileDrawer }

