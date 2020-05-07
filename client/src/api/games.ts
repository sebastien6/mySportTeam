import { apiEndpoint } from '../config'
import { Game } from '../types/games';
import { CreateGameRequest, UpdateGameRequest } from '../types/GameRequest';
import Axios from 'axios'

export async function getGames(idToken: string): Promise<Game[]> {
    console.log('Fetching games')

    const response = await Axios.get(`${apiEndpoint}/games`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Games:', response.data)
    return response.data.items
}

export async function getGame(idToken: string, gameId: string): Promise<Game> {
    console.log(`Fetching game ${gameId}`)

    const response = await Axios.get(`${apiEndpoint}/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Game:', response.data)
    return response.data.item
}

export async function getTeamGames(idToken: string, teamId: string): Promise<Game[]> {
    console.log(`Fetching games for team ${teamId}`)

    const response = await Axios.get(`${apiEndpoint}/teams/${teamId}/games`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log(`Games for team ${teamId}: `, response.data)
    return response.data.items
}


export async function createGame(idToken: string, newGame: CreateGameRequest): Promise<Game> {
    console.log(`Creating game ${newGame}`)
    const response = await Axios.post(`${apiEndpoint}/games`, JSON.stringify(newGame), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function patchGame(idToken: string, gameId: string, updatedPlayer: UpdateGameRequest): Promise<void> {
    console.log(`Updating game ${gameId}`)
    await Axios.patch(`${apiEndpoint}/games/${gameId}`, JSON.stringify(updatedPlayer), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}

export async function deleteGame(idToken: string, gameId: string): Promise<void> {
    console.log(`Deleting game ${gameId}`)
    await Axios.delete(`${apiEndpoint}/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}
