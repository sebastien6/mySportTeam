import { apiEndpoint } from '../config'
import { TeamItem } from '../types/teams';
import { TeamRequest } from '../types/TeamRequest';
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

export async function createTeam(idToken: string, newTeam: TeamRequest): Promise<TeamItem> {
    const team: string = JSON.stringify(newTeam)
    console.log(`Creating team ${team}`)

    const response = await Axios.post(`${apiEndpoint}/teams`, team, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }

    })
    return response.data.item

}

export async function patchTeam(idToken: string, teamId: string, updatedTeam: TeamRequest): Promise<void> {
    const team: string = JSON.stringify(updatedTeam)
    console.log(`Updating team ${teamId} ${team}`)
    try {
        await Axios.patch(`${apiEndpoint}/teams/${teamId}`, team, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        const msg = `Failed to patch team ${teamId}:`
        console.log(`${msg} ${JSON.stringify(e)}`)
        alert(`${msg} ${e.message}`)
    }
}

export async function deleteTeam(idToken: string, teamId: string): Promise<void> {
    console.log(`Deleting team ${teamId}`)
    try {
        await Axios.delete(`${apiEndpoint}/teams/${teamId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        })
    } catch (e) {
        const msg = `Failed to delete team ${teamId}:`
        console.log(`${msg} ${JSON.stringify(e)}`)
        alert(`${msg} ${e.message}`)
    }
}

