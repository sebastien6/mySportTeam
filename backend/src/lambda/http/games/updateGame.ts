import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { UpdateGameRequest } from '../../../requests/GameRequest'
import { createLogger } from '../../../utils/logger'
import { updateGame } from '../../../businessLogic/game'
import { getUserId } from '../../utils'

const logger = createLogger('api');

export const updateHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', {
        func: 'createTodoHandler',
        event: event
    })

    const gameId = event.pathParameters.gameId;
    const updatedGame: UpdateGameRequest = JSON.parse(event.body)
    let userId
    if (process.env.IS_OFFLINE) {
        userId = `user_123456789`
    } else {
        userId = getUserId(event)
    }

    const item = await updateGame(userId, gameId, updatedGame);

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