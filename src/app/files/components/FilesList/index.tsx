"use client"
import { storage } from "@/app/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "firebase/auth"
import { listAll, ref, StorageReference } from "firebase/storage"
import { useEffect, useState } from "react"
import { FilesListContainer } from "./FilesListContainer"
import { FilesListSearch } from "./FilesListSearch"
import { FilesTable } from "./FilesTable"
import { FilesUpload } from "./FilesUpload"


const FilesList = ({
    search,
    user,
    loading
}: {
    search: string
    user: User,
    loading: boolean
}) => {
    const userFiles = ref(storage, `uploads/${user.uid}/`)
    const [userFilesData, setUserFilesData] = useState<StorageReference[]>([])


    useEffect(() => {
        const getFiles = async () => {
            const files = await listAll(userFiles);
            setUserFilesData(files.items)
        }

        getFiles()

    }, [user.uid])


    return (
        <FilesListContainer>
            {!loading && user ? (
                <div>
                    <div className="flex gap-5 w-full">
                        <FilesListSearch />
                        <div className="mb-5">
                            <FilesUpload user={user} />
                        </div>
                    </div>

                    <div>
                        <FilesTable
                            columns={
                                [{
                                    accessorKey: "name",
                                    header: "Name",
                                }]
                            }

                            data={userFilesData}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <Skeleton className="w-full h-10 mb-5" />
                    <Skeleton className="w-full h-48" />
                </div>
            )}
        </FilesListContainer>
    )
}

export { FilesList }

