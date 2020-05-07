import * as uuid from 'uuid';

import { TeamItem } from '../models/teamItem';
import { TeamAccess } from '../dataLayer/teamsAccess';
import { CreateTeamRequest, UpdateTeamRequest } from '../requests/TeamRequest';

const teamAccess = new TeamAccess();

export async function getAllTeams(userId: string): Promise<TeamItem[]> {
    return teamAccess.getAllTeams(userId);
}

export async function getTeam(userId: string, teamId: string): Promise<TeamItem> {
    return teamAccess.getTeam(userId, teamId);
}

export async function createTeam(userId: string, request: CreateTeamRequest): Promise<TeamItem> {
    const teamId: string = `team_${uuid.v4()}`;

    const teamItem: TeamItem = {
        PK: userId,
        SK: teamId,
        createdAt: new Date().toISOString(),
        name: request.name,
        sport: request.sport,
        season: request.season,
        retired: request.retired
    }

    return teamAccess.createTeam(teamItem);
}

export async function deleteTeam(userId: string, todoId: string): Promise<void> {
    teamAccess.deleteTeam(userId, todoId);
}

export async function updateTeam(userId: string, todoId: string, request: UpdateTeamRequest): Promise<void> {
    teamAccess.updateTeam(userId, todoId, request)
}
