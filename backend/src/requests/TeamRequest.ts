/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTeamRequest {
    name: string
    sport: string
    season: string
  }

export interface UpdateTeamRequest {
  name: string
  sport: string
  season: string
  retired: boolean
}