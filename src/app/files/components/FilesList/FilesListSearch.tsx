"use client"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const FilesListSearch = () => {
    const router = useRouter()
    const [search, setSearch] = useState("")

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            router.push(`/files?search=${search}`)
        }, 1000)
    }, [search])

    return (
        <div className="w-full">
            <Input
                type="text"
                placeholder="search"
                onChange={onChangeSearch}
                value={search}
            />
        </div >
    )
}

export { FilesListSearch }
