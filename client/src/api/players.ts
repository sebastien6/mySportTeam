import { apiEndpoint } from '../config'
import { PlayerItem } from '../types/players';
import { PlayerRequest } from '../types/PlayerRequest';
import Axios from 'axios'

export async function getPlayers(idToken: string): Promise<PlayerItem[]> {
    console.log('Fetching players')

    const response = await Axios.get(`${apiEndpoint}/players`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Players:', response.data)
    return response.data.items
}

export async function getPlayer(idToken: string, playerId: string): Promise<PlayerItem> {
    console.log(`Fetching player ${playerId}`)

    const response = await Axios.get(`${apiEndpoint}/players/${playerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Player:', response.data)
    return response.data.items
}

export async function getTeamPlayers(idToken: string, teamId: string): Promise<PlayerItem[]> {
    console.log(`Fetching players in a team ${teamId}`)

    const response = await Axios.get(`${apiEndpoint}/teams/${teamId}/players`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log(`Players for Team ${teamId}: `, response.data)
    return response.data.items
}

export async function createPlayer(idToken: string, newPlayer: PlayerRequest): Promise<PlayerItem> {
    const player = JSON.stringify(newPlayer)
    console.log(`Creating player ${player}`)
    const response = await Axios.post(`${apiEndpoint}/players`, player, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function patchPlayer(idToken: string, playerId: string, updatedPlayer: PlayerRequest): Promise<void> {
    const player: string = JSON.stringify(updatedPlayer)
    console.log(`Updating player ${playerId}, ${player}`)
    try {
        await Axios.patch(`${apiEndpoint}/players/${playerId}`, player, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        const msg = `Failed to patch player ${playerId}:`
        console.log(`${msg} ${JSON.stringify(e)}`)
        alert(`${msg} ${e.message}`)
    }
}

export async function deletePlayer(idToken: string, playerId: string): Promise<void> {
    console.log(`Deleting player ${playerId}`)
    try {
        await Axios.delete(`${apiEndpoint}/players/${playerId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        const msg = `Failed to delete player ${playerId}:`
        console.log(`${msg} ${JSON.stringify(e)}`)
        alert(`${msg} ${e.message}`)
    }
}
