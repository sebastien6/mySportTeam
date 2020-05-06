import * as uuid from 'uuid';

import { PlayerItem } from '../models/playerItem';
import { PlayerAccess } from '../dataLayer/playerAccess';
// import { getUploadUrl } from '../dataLayer/s3Bucket';
import { CreatePlayerRequest } from '../requests/PlayerRequest';

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

// export async function updatePlayer(userId: string, todoId: string, request: UpdatePlayerRequest): Promise<void> {
//     playerAccess.updatePlayer(userId, todoId, request)
// }

// export async function uploadUrl(userId: string, teamId: string): Promise<string> {
//     const bucketName = process.env.IMAGES_S3_BUCKET;

//     const imageId = uuid.v4();
//     const uploadUrl = getUploadUrl(imageId);

//     if (process.env.IS_OFFLINE) {
//         playerAccess.updateTodoAttachment(userId, teamId, `https://localhost:8001/${imageId}`);
//     } else {
//         playerAccess.updateTodoAttachment(userId, teamId, `https://${bucketName}.s3.amazonaws.com/${imageId}`);
//     }

    
//     return uploadUrl;
// }