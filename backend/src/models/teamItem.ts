export interface TeamItem {
    PK: string
    SK: string
    createdAt: string
    name: string
    sport: string
    season: string
    retired: boolean
    teamPicture?: string
  }

export interface TeamUpdate {
  name: string
  sport: string
  season: string
  retired: boolean
}