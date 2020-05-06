/**
 * Fields in a request to create a single Game item.
 */
export interface CreateGameRequest {
    teamId: string
    opponentTeam: string
    teamScore?: number
    opponentScore?: number
    location: string
    date: string
}

export interface UpdateGameRequest {
    opponentTeam: string
    teamScore?: number
    opponentScore?: number
    location: string
    date: string
}