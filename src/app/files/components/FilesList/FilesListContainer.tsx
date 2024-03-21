import React from 'react'

const FilesListContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='container mx-auto'>{children}</div>
    )
}

export { FilesListContainer }
