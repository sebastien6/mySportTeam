import { apiEndpoint } from '../config'
import { TeamItem } from '../types/teams';
import { CreateTeamRequest, UpdateTeamRequest } from '../types/TeamRequest';
import Axios from 'axios'

export async function getTeams(idToken: string): Promise<TeamItem[]> {
    console.log('Fetching teams')

    const response = await Axios.get(`${apiEndpoint}/teams`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Teams:', response.data)
    return response.data.items
}

export async function getTeam(idToken: string, teamId: string): Promise<TeamItem> {
    console.log(`Fetching team ${teamId}`)

    const response = await Axios.get(`${apiEndpoint}/teams/${teamId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    })
    console.log('Team:', response.data)
    return response.data.team
}

export async function createTeam(idToken: string, newTeam: CreateTeamRequest): Promise<TeamItem> {
    console.log(`Creating team ${newTeam.name}`)
    const response = await Axios.post(`${apiEndpoint}/teams`, JSON.stringify(newTeam), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.item
}

export async function patchTeam(idToken: string, teamId: string, updatedTeam: UpdateTeamRequest): Promise<void> {
    console.log(`Updating team ${teamId}`)
    await Axios.patch(`${apiEndpoint}/teams/${teamId}`, JSON.stringify(updatedTeam), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}

export async function deleteTeam(idToken: string, teamId: string): Promise<void> {
    console.log(`Deleting team ${teamId}`)
    await Axios.delete(`${apiEndpoint}/teams/${teamId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
}

