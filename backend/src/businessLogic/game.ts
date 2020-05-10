import * as uuid from 'uuid'
import { GameItem } from '../models/gameItem'
import { GameAccess } from '../dataLayer/gameAccess'
// import { getUploadUrl } from '../dataLayer/s3Bucket'
import { CreateGameRequest, UpdateGameRequest } from '../requests/GameRequest'
import { isValid } from '../dataLayer/validKeyExist'

const gameAccess = new GameAccess();

export async function getAllGames(userId: string): Promise<GameItem[]> {
    return gameAccess.getAllGames(userId);
}

export async function getAllGamesforTeam(userId: string, teamId: string): Promise<GameItem[]> {
    return gameAccess.getAllGamesForTeam(userId, teamId);
}

export async function getGame(userId: string, gameId: string): Promise<GameItem> {
    return gameAccess.getGame(userId, gameId);
}

export async function createGame(userId: string, request: CreateGameRequest): Promise<GameItem> {
    const teamExist = await isValid(userId, request.teamId)
    
    if (!teamExist) {
        throw new Error('team associated to game in request does not exist')
    }
    
    const gameId: string = `game_${uuid.v4()}`;

    const gameItem: GameItem = {
        PK: userId,
        SK: gameId,
        GSI1: request.teamId,
        createdAt: new Date().toISOString(),
        opponentTeam: request.opponentTeam,
        opponentScore: request.opponentScore,
        teamScore: request.teamScore,
        location: request.location,
        date: request.date
    }

    return gameAccess.createGame(gameItem);
}

export async function deleteGame(userId: string, gameId: string): Promise<void> {
    gameAccess.deleteGame(userId, gameId);
}

export async function updateGame(userId: string, gameId: string, request: UpdateGameRequest): Promise<void> {
    gameAccess.updateGame(userId, gameId, request)
}
