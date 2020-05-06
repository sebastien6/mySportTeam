import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { createDynamoDBClient } from './client'
import {PlayerItem } from '../models/playerItem';
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamodb');

export class PlayerAccess {
    constructor(
        private readonly teamsTable = process.env.TEAMS_TABLE,
        private readonly Gsi1Index = process.env.GSI1_INDEX,
        private readonly docClient: DocumentClient = createDynamoDBClient()
    ){}

    public async getAllPlayers(userId: string): Promise<PlayerItem[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.teamsTable,
            //IndexName: this.createdAtIndex,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': userId,
                ':sk': 'player'
            } 
        }
        logger.info('Processing db get items with params', {params: params})
        
        const result = await this.docClient.query(params).promise()
        logger.info('get all players', {NumberItems: result.Items.length})
        
        return result.Items as PlayerItem[];
    }

    public async getAllPlayersInTeam(userId: string, teamId: string): Promise<PlayerItem[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.teamsTable,
            IndexName: this.Gsi1Index,
            KeyConditionExpression: 'begins_with(SK, :sk) AND GSI1 = :gsi1',
            ExpressionAttributeValues: {
                ':sk': 'player',
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
        logger.info('get all players in team', {NumberItems: result.Items.length})
        
        return result.Items as PlayerItem[];
    }

    public async getPlayer(userId: string, playerId: string): Promise<PlayerItem> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.teamsTable,
            Key: {
                PK: userId,
                SK: playerId
            } 
        } 
        logger.info('Processing db get item with params', {params: params})

        const result = await this.docClient.get(params).promise()
        logger.info('get player', {team: result.Item})
        
        return result.Item as PlayerItem
    }

    public async createPlayer(player: PlayerItem): Promise<PlayerItem> {
        const params = {
            TableName: this.teamsTable,
            Item: player
        }
        logger.info('Processing db create player with params', {params: params})
        
        await this.docClient.put(params).promise()
        logger.info('player successfully created')

        return player;
    }

    public async deletePlayer(userId: string, playerId: string): Promise<void> {
        const params = {
            TableName: this.teamsTable,
            Key:{
                PK: userId,
                SK: playerId
            },
            ReturnValues: 'ALL_OLD',
        }
        logger.info('Processing db delete item with params', {params: params})

        const result = await this.docClient.delete(params).promise()
        logger.info('team deleted successfully', {team: result.Attributes})
    }

    // public async updatePlayer(userId: string, teamId: string, playerUpdate: PlayerUpdate): Promise<void> {
    //     const params: DocumentClient.UpdateItemInput = {
    //         TableName: this.teamsTable,
    //         Key:{
    //             PK: userId,
    //             SK: teamId
    //         },
    //         UpdateExpression:
    //                 'set  firstName = :fname, lastName = :lname, jerseyNumber = :jersey, YearOfBirth = :ybirth, position= :position',
    //             ExpressionAttributeValues: {
    //                 ':fname': playerUpdate.firstName,
    //                 ':lname': playerUpdate.lastName,
    //                 ':ybirth': playerUpdate.yearOfBirth,
    //                 ':jersey': playerUpdate.jerseyNumber,
    //                 ':position': playerUpdate.position,
    //             },
    //             ReturnValues: 'UPDATED_NEW',
    //     }
    //     logger.info('Processing db update item with params', {params: params})
        
    //     const item = await this.docClient.update(params).promise()
    //     logger.info('team updated successfully', {item: item.Attributes});
    // }

    // public async updatePlayerAttachment(userId: string, teamId: string, attachmentUrl: string): Promise<void> {
    //     const params = {
    //         TableName: this.teamsTable,
    //         Key: {
    //             userId: userId,
    //             todoId: teamId
    //         },
    //         UpdateExpression:
    //             'set teamPicture = :teamPicture',
    //         ExpressionAttributeValues: {
    //             ':teamPicture': attachmentUrl
    //         },
    //         ReturnValues: 'UPDATED_NEW',
    //     }
    //     logger.info('Processing db update to add attachment to item', {params: params})
        
    //     const res = await this.docClient.update(params).promise();
    //     logger.info('team updated attachment successful', {item: res.Attributes});
    // }
}
