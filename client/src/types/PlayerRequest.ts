/**
 * Fields in a request to create a single Player item.
 */
export interface PlayerRequest {
    teamId: string
    firstName: string
    lastName: string
    yearOfBirth: number
    jerseyNumber: number
    position: string
  }
