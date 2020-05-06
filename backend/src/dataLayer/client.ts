import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

export function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance')
        console.log("Serverless Offline detected; skipping AWS X-Ray setup")
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    const XAWS = AWSXRay.captureAWS(AWS);
    return new XAWS.DynamoDB.DocumentClient()
}