import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createDynamoDBClient } from './client'
// import { createLogger } from '../utils/logger';

// const logger = createLogger('dynamodb');
const teamsTable = process.env.TEAMS_TABLE
const docClient: DocumentClient = createDynamoDBClient()

// export function IsValid(userId: string, teamId: string): boolean {
//     const params = {
//         TableName: teamsTable,
//             Key: {
//                 PK: userId,
//                 SK: teamId
//             }
//         }
//     logger.info('verification team exist', {params: params})
//     // let result = docClient.get(params).promise();

//     docClient.get(params, function(err, data) {
//         if (err) logger.error('error', {error: err, stack: err.stack}); // an error occurred
//         else{
//             if (data.Item !== undefined && data.Item !== null) {
//                 logger.info('team found')
//                 return true
//             }
//         };           // successful response
//       });

//     // logger.info('verification team result', {result: })

//     return false
// }

export async function isValid(userId: string, teamId: string): Promise<boolean> {
        const params = {
        TableName: teamsTable,
        Key:
        {
            PK: userId,
            SK: teamId
        }
    }

    var exists = false
    let result = await docClient.get(params).promise();
    if (result.Item !== undefined && result.Item !== null) {
        exists = true
    }

    return (exists)
}