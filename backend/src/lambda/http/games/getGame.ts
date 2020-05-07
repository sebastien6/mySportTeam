import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserId } from '../../utils'
import { createLogger } from '../../../utils/logger'
import { getGame } from '../../../businessLogic/game'

const logger = createLogger('api')

export const getGameHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getGameHandler',
    event: event
  })
  const gameId = event.pathParameters.gameId;
  let userId
  if (process.env.IS_OFFLINE) {
    userId = `user_123456789`
  } else {
    userId = getUserId(event)
  }

  const items = await getGame(userId, gameId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items,
    })
  };
}

export const handler = middy(getGameHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));