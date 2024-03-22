
export interface IUploadFile {
    type: string
    url: string
    createdAt: CreatedAt
    name: string
    size: number
}

export interface CreatedAt {
    seconds: number
    nanoseconds: number
}
