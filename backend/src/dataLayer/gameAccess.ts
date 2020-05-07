import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { createDynamoDBClient } from './client'
import { GameItem, GameUpdate } from '../models/gameItem';
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamodb');

export class GameAccess {
    constructor(
        private readonly teamsTable = process.env.TEAMS_TABLE,
        private readonly Gsi1Index = process.env.GSI1_INDEX,
        private readonly docClient: DocumentClient = createDynamoDBClient()
    ){}

    public async getAllGames(userId: string): Promise<GameItem[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.teamsTable,
            //IndexName: this.createdAtIndex,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': userId,
                ':sk': 'game'
            } 
        }
        logger.info('Processing db get items with params', {params: params})
        
        const result = await this.docClient.query(params).promise()
        logger.info('get all Games', {NumberItems: result.Items.length})
        
        return result.Items as GameItem[];
    }

    public async getAllGamesForTeam(userId: string, teamId: string): Promise<GameItem[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.teamsTable,
            IndexName: this.Gsi1Index,
            KeyConditionExpression: 'begins_with(SK, :sk) AND GSI1 = :gsi1',
            ExpressionAttributeValues: {
                ':sk': 'game',
                ':gsi1': teamId,
                ':pk': userId,
            },
            FilterExpression: '#P = :pk',
            ExpressionAttributeNames: {
                '#P': 'PK',
            }
        }
        logger.info('Processing db get items with params', {params: params})
        
        const result = await this.docClient.query(params).promise()
        logger.info('get all games for team', {team: teamId, NumberItems: result.Items.length})
        
        return result.Items as GameItem[];
    }

    public async getGame(userId: string, gameId: string): Promise<GameItem> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.teamsTable,
            Key: {
                PK: userId,
                SK: gameId
            } 
        } 
        logger.info('Processing db get item with params', {params: params})

        const result = await this.docClient.get(params).promise()
        logger.info('get game', {team: result.Item})
        
        return result.Item as GameItem
    }

    public async createGame(game: GameItem): Promise<GameItem> {
        const params = {
            TableName: this.teamsTable,
            Item: game
        }
        logger.info('Processing db create game with params', {params: params})
        
        await this.docClient.put(params).promise()
        logger.info('game successfully created')

        return game;
    }

    public async deleteGame(userId: string, gameId: string): Promise<void> {
        const params = {
            TableName: this.teamsTable,
            Key:{
                PK: userId,
                SK: gameId
            },
            ReturnValues: 'ALL_OLD',
        }
        logger.info('Processing db delete item with params', {params: params})

        const result = await this.docClient.delete(params).promise()
        logger.info('game deleted successfully', {team: result.Attributes})
    }

    public async updateGame(userId: string, gameId: string, gameUpdate: GameUpdate): Promise<void> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.teamsTable,
            Key:{
                PK: userId,
                SK: gameId
            },
            UpdateExpression:
                    'set  opponentTeam = :opponent, teamScore = :tscore, opponentScore = :oscore, location = :location, date= :date',
                ExpressionAttributeValues: {
                    ':opponent': gameUpdate.opponentTeam,
                    ':tscore': gameUpdate.teamScore,
                    ':oscore': gameUpdate.opponentScore,
                    ':location': gameUpdate.location,
                    ':date': gameUpdate.date,
                },
                ReturnValues: 'UPDATED_NEW',
        }
        logger.info('Processing db update item with params', {params: params})
        
        const item = await this.docClient.update(params).promise()
        logger.info('game updated successfully', {item: item.Attributes});
    }

    public async updateGameAttachment(userId: string, gameId: string, attachmentUrl: string): Promise<void> {
        const params = {
            TableName: this.teamsTable,
            Key: {
                PK: userId,
                SK: gameId
            },
            UpdateExpression:
                'set gamePicture = :gamePicture',
            ExpressionAttributeValues: {
                ':gamePicture': attachmentUrl
            },
            ReturnValues: 'UPDATED_NEW',
        }
        logger.info('Processing db update to add attachment to game item', {params: params})
        
        const res = await this.docClient.update(params).promise();
        logger.info('game updated attachment successful', {item: res.Attributes});
    }
}
