import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { createDynamoDBClient } from './client'
import {TeamItem, TeamUpdate } from '../models/teamItem';
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamodb');

export class TeamAccess {
    constructor(
        private readonly teamsTable = process.env.TEAMS_TABLE,
        //private readonly createdAtIndex = process.env.CREATED_AT_INDEX,
        private readonly docClient: DocumentClient = createDynamoDBClient()
    ){}

    public async getAllTeams(userId: string): Promise<TeamItem[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.teamsTable,
            //IndexName: this.createdAtIndex,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': userId,
                ':sk': 'team'
            } 
        }
        logger.info('Processing db get items with params', {params: params})
        
        const result = await this.docClient.query(params).promise()
        logger.info('get all teams', {NumberItems: result.Items.length})
        
        return result.Items as TeamItem[];
    }

    public async getTeam(userId: string, teamId: string): Promise<TeamItem> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.teamsTable,
            Key: {
                PK: userId,
                SK: teamId
            } 
        } 
        logger.info('Processing db get item with params', {params: params})

        const result = await this.docClient.get(params).promise()
        logger.info('get team', {team: result.Item})
        
        return result.Item as TeamItem
    }

    public async createTeam(team: TeamItem): Promise<TeamItem> {
        const params = {
            TableName: this.teamsTable,
            Item: team
        }
        logger.info('Processing db create team with params', {params: params})
        
        await this.docClient.put(params).promise()
        logger.info('team successfully created')

        return team;
    }

    public async deleteTeam(userId: string, teamId: string): Promise<void> {
        const params = {
            TableName: this.teamsTable,
            Key:{
                PK: userId,
                SK: teamId
            },
            ReturnValues: 'ALL_OLD',
        }
        logger.info('Processing db delete item with params', {params: params})

        const result = await this.docClient.delete(params).promise()
        logger.info('team deleted successfully', {team: result.Attributes})
    }

    public async updateTeam(userId: string, teamId: string, teamUpdate: TeamUpdate): Promise<void> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.teamsTable,
            Key:{
                PK: userId,
                SK: teamId
            },
            UpdateExpression:
                    'set  #N = :name, season = :season, sport = :sport, retired = :retired',
                ExpressionAttributeValues: {
                    ':name': teamUpdate.name,
                    ':season': teamUpdate.season,
                    ':sport': teamUpdate.sport,
                    ':retired': teamUpdate.retired
                },
                ExpressionAttributeNames: {
                    '#N': 'name', // fix for ValidationException: Invalid UpdateExpression: Attribute name is a reserved keyword
                },
                ReturnValues: 'UPDATED_NEW',
        }
        logger.info('Processing db update item with params', {params: params})
        
        const item = await this.docClient.update(params).promise()
        logger.info('team updated successfully', {item: item.Attributes});
    }

    public async updateTodoAttachment(userId: string, teamId: string, attachmentUrl: string): Promise<void> {
        const params = {
            TableName: this.teamsTable,
            Key: {
                userId: userId,
                todoId: teamId
            },
            UpdateExpression:
                'set teamPicture = :teamPicture',
            ExpressionAttributeValues: {
                ':teamPicture': attachmentUrl
            },
            ReturnValues: 'UPDATED_NEW',
        }
        logger.info('Processing db update to add attachment to item', {params: params})
        
        const res = await this.docClient.update(params).promise();
        logger.info('team updated attachment successful', {item: res.Attributes});
    }
}


  