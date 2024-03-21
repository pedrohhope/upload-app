"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import { storage } from "@/app/firebase"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User } from "firebase/auth"
import { listAll, ref, StorageReference } from "firebase/storage"
import { useEffect, useState } from "react"

export function FilesTable({
    user,
    loading
}: {
    user: User,
    loading: boolean
}) {
    const userFiles = ref(storage, `uploads/${user?.uid}/`)
    const [userFilesData, setUserFilesData] = useState<StorageReference[]>([])

    const columns = [
        {
            accessorKey: "name",
            header: "Name",
        },
    ]


    const data = userFilesData.map((file) => {
        return {
            name: file.name
        }
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })



    useEffect(() => {
        const getFiles = async () => {
            const files = await listAll(userFiles);
            console.log(files)
            setUserFilesData(files.items)
        }

        getFiles()

    }, [loading])

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    <ScrollArea className="h-96">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}

                    </ScrollArea>
                </TableBody>
            </Table>
        </div>
    )
}
