/**
 * Fields in a request to create a single Team item.
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