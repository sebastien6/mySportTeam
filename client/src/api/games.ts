import { apiEndpoint } from '../config'
import { GameItem } from '../types/games';
import { GameRequest } from '../types/GameRequest';
import Axios from 'axios'

export async function getGames(idToken: string): Promise<GameItem[]> {
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

export async function getGame(idToken: string, gameId: string): Promise<GameItem> {
    console.log(`Fetching game ${gameId}`)

    const response = await Axios.get(`${apiEndpoint}/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Game:', response.data)
    return response.data.items
}

export async function getTeamGames(idToken: string, teamId: string): Promise<GameItem[]> {
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


export async function createGame(idToken: string, newGame: GameRequest): Promise<GameItem> {
    const game: string = JSON.stringify(newGame)
    console.log(`Updating game ${game}`)
    const response = await Axios.post(`${apiEndpoint}/games`, game, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function patchGame(idToken: string, gameId: string, updatedGame: GameRequest): Promise<void> {
    const game: string = JSON.stringify(updatedGame)
    console.log(`Updating game ${gameId} ${game}`)
    try{
        await Axios.patch(`${apiEndpoint}/games/${gameId}`, game, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
} catch (e) {
    const msg = `Failed to patch player ${gameId}:`
    console.log(`${msg} ${JSON.stringify(e)}`)
    alert(`${msg} ${e.message}`)
}
}

export async function deleteGame(idToken: string, gameId: string): Promise<void> {
    console.log(`Deleting game ${gameId}`)
    try{
        await Axios.delete(`${apiEndpoint}/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
} catch (e) {
    const msg = `Failed to delete player ${gameId}:`
    console.log(`${msg} ${JSON.stringify(e)}`)
    alert(`${msg} ${e.message}`)
}
}
