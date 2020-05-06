import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createDynamoDBClient } from './client'

const teamsTable = process.env.TEAMS_TABLE
const docClient: DocumentClient = createDynamoDBClient()

export async function IsValid(userId: string, token: string) {
    const params = {
        TableName: teamsTable,
        Key:
        {
            pk: userId,
            sk: token
        }
    }

    var exists = false
    let result = await docClient.get(params).promise();
    if (result.Item !== undefined && result.Item !== null) {
        exists = true
    }

    return (exists)
}