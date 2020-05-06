export interface PlayerItem {
    PK: string
    SK: string
    createdAt: string
    GSI1: string
    firstName: string
    lastName: string
    yearOfBirth: number
    jerseyNumber?: number
    position?: string
    playerPicture?: string
}

export interface PlayerUpdate {
    firstName: string
    lastName: string
    jerseyNumber?: number
    yearOfBirth: number
    position?: string
}