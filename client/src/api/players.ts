import { apiEndpoint } from '../config'
import { Player } from '../types/players';
import { CreatePlayerRequest, UpdatePlayerRequest } from '../types/PlayerRequest';
import Axios from 'axios'

export async function getPlayers(idToken: string): Promise<Player[]> {
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

export async function getPlayer(idToken: string, playerId: string): Promise<Player> {
    console.log(`Fetching player ${playerId}`)

    const response = await Axios.get(`${apiEndpoint}/players/${playerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Player:', response.data)
    return response.data.item
}

export async function getTeamPlayers(idToken: string, teamId: string): Promise<Player[]> {
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

export async function createPlayer(idToken: string, newPlayer: CreatePlayerRequest): Promise<Player> {
    console.log(`Creating player ${newPlayer.firstName} ${newPlayer.lastName}`)
    const response = await Axios.post(`${apiEndpoint}/players`, JSON.stringify(newPlayer), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function patchPlayer(idToken: string, playerId: string, updatedPlayer: UpdatePlayerRequest): Promise<void> {
    console.log(`Updating player ${playerId}`)
    await Axios.patch(`${apiEndpoint}/players/${playerId}`, JSON.stringify(updatedPlayer), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}

export async function deletePlayer(idToken: string, playerId: string): Promise<void> {
    console.log(`Deleting player ${playerId}`)
    await Axios.delete(`${apiEndpoint}/players/${playerId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}
