export interface GameItem {
    PK: string
    SK: string
    createdAt: string
    GSI1: string
    opponentTeam: string
    teamScore?: number
    opponentScore?: number
    location: string
    date: string
}

export interface GameUpdate {
    opponentTeam: string
    teamScore?: number
    opponentScore?: number
    location: string
    date: string
}