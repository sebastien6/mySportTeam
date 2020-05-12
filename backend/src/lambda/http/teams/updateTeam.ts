import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { UpdateTeamRequest } from '../../../requests/TeamRequest'
import { createLogger } from '../../../utils/logger'
import { updateTeam } from '../../../businessLogic/teams'
import { getUserId } from '../../utils'

const logger = createLogger('api');

export const updateHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', {
        func: 'createTeamHandler',
        event: event
    })

    const teamId = event.pathParameters.teamId;
    const updatedTeam: UpdateTeamRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    const item = await updateTeam(userId, teamId, updatedTeam);

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            item,
        })
    };
}

export const handler = middy(updateHandler)
    .use(httpErrorHandler())
    .use(cors({ credentials: true }));