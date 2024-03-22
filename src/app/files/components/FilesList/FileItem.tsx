import { IUploadFile } from "@/interfaces/uploadFile";


const FileItem = ({
    data
}: {
    data: IUploadFile
}) => {

    return (
        <div>
            <p>{data.name}</p>
        </div>
    )
}

export { FileItem };

