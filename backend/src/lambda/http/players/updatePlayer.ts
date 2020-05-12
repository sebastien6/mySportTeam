import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { UpdatePlayerRequest } from '../../../requests/PlayerRequest'
import { createLogger } from '../../../utils/logger'
import { updatePlayer } from '../../../businessLogic/player'
import { getUserId } from '../../utils'

const logger = createLogger('api');

export const updateHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', {
        func: 'createPlayerHandler',
        event: event
    })

    const playerId = event.pathParameters.playerId;
    const updatedPlayer: UpdatePlayerRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    const item = await updatePlayer(userId, playerId, updatedPlayer);

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