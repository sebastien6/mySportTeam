import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../../utils/logger'
import { deletePlayer } from '../../../businessLogic/player'
// import { getUserId } from '../utils'

const logger = createLogger('api')

const deletePlayerHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'deletePlayerHandler',
    event: event
  })

  const playerId = event.pathParameters.gameId;
  //const userId = getUserId(event)
  const id = 'google-oauth2|114715338908998513605'
  const userId = `user_${id}`

  await deletePlayer(userId, playerId);

  return {
    statusCode: 204,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({})
  };
}

export const handler = middy(deletePlayerHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
