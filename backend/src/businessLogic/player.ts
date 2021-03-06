import * as uuid from 'uuid'
import { PlayerItem } from '../models/playerItem'
import { PlayerAccess } from '../dataLayer/playerAccess'
// import { getUploadUrl } from '../dataLayer/s3Bucket';
import { CreatePlayerRequest, UpdatePlayerRequest } from '../requests/PlayerRequest'
import { isValid } from '../dataLayer/validKeyExist'

const playerAccess = new PlayerAccess();

export async function getAllPlayers(userId: string): Promise<PlayerItem[]> {
    return playerAccess.getAllPlayers(userId);
}

export async function getAllPlayersInTeam(userId: string, teamId: string): Promise<PlayerItem[]> {
    return playerAccess.getAllPlayersInTeam(userId, teamId);
}

export async function getPlayer(userId: string, playerId: string): Promise<PlayerItem> {
    return playerAccess.getPlayer(userId, playerId);
}

export async function createPlayer(userId: string, request: CreatePlayerRequest): Promise<PlayerItem> {
    const teamExist = await isValid(userId, request.teamId)
    
    if (!teamExist) {
        throw new Error('team associated to player in request does not exist')
    }

    const playerId: string = `player_${uuid.v4()}`;

    const playerItem: PlayerItem = {
        PK: userId,
        SK: playerId,
        GSI1: request.teamId,
        createdAt: new Date().toISOString(),
        firstName: request.firstName,
        lastName: request.lastName,
        yearOfBirth: request.yearOfBirth,
        position: request.position,
        jerseyNumber: request.jerseyNumber
    }

    return playerAccess.createPlayer(playerItem);
}

export async function deletePlayer(userId: string, playerId: string): Promise<void> {
    playerAccess.deletePlayer(userId, playerId);
}

export async function updatePlayer(userId: string, playerId: string, request: UpdatePlayerRequest): Promise<void> {
    playerAccess.updatePlayer(userId, playerId, request)
}

