/**
 * Fields in a request to create a single Game item.
 */
export interface GameRequest {
    opponentTeam: string
    teamScore: number
    opponentScore: number
    location: string
    date: string
}
