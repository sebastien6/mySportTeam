/**
 * Fields in a request to create a single Player item.
 */
export interface CreatePlayerRequest {
    teamId: string
    firstName: string
    lastName: string
    yearOfBirth: number
    jerseyNumber: number
    position: string
  }

export interface UpdatePlayerRequest {
    teamId: string
    firstName: string
    lastName: string
    yearOfBirth: number
    jerseyNumber: number
    position: string
}