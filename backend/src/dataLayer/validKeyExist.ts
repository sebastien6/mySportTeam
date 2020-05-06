import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createDynamoDBClient } from './client'
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamodb');
const teamsTable = process.env.TEAMS_TABLE
const docClient: DocumentClient = createDynamoDBClient()

export async function IsValid(userId: string, teamId: string): Promise<boolean> {
    const params = {
        TableName: teamsTable,
        Key:
        {
            PK: userId,
            SK: teamId
        }
    }
    logger.info('verification team exist', {params: params})

    
    let result = await docClient.get(params).promise();
    logger.info('verification team result', {result: result.Item})
    
    if (result.Item !== undefined && result.Item !== null) {
        logger.info('team found')
        return true
    } 

    return false
}