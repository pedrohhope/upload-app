"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "firebase/auth"
import { FilesListContainer } from "./FilesListContainer"
import { FilesListSearch } from "./FilesListSearch"
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

