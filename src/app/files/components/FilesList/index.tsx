"use client"
import { auth, db } from "@/app/firebase"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { IUploadFile } from "@/interfaces/uploadFile"
import { ColumnDef } from "@tanstack/react-table"
import bytes from "bytes"
import { collection } from "firebase/firestore"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { FileDrawer } from "./FileDrawer"
import { FilesListContainer } from "./FilesListContainer"



const FilesList = () => {
    const [user, loading] = useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false)
    const [selectFile, setSelectFile] = useState<IUploadFile | null>(null);

    const [value, loadingFiles, _] = useCollection(
        collection(db, `users/${user?.uid}/uploads`)
    );

    const onOpenChange = (selectFile: IUploadFile) => {
        setSelectFile(selectFile)
        setIsOpen(!isOpen)
    }

    const columns: ColumnDef<IUploadFile>[] = [{
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ getValue }) => {
            return bytes(getValue<number>())
        }
    }, {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <img src="menu-vertical.png" onClick={() => onOpenChange(row.original)} alt="menu" className="cursor-pointer" />
        }
    }]

    const data = value?.docs.map((doc) => {
        const {
            name,
            size,
            type,
            createdAt,
            url,

        } = doc.data() as IUploadFile

        return {
            name,
            size,
            type,
            createdAt,
            url
        }
    }) || []

    return (
        <>
            <FilesListContainer>
                {!loading && user && !loadingFiles ? (
                    <div>
                        <DataTable data={data} columns={columns} />
                    </div>
                ) : (
                    <div>
                        <Skeleton className="w-full h-10 mb-5" />
                        <Skeleton className="w-full h-48" />
                    </div>
                )}
            </FilesListContainer>

            <FileDrawer
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                file={selectFile}
            />
        </>
    )
}

export { FilesList }

