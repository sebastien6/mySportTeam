import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreateGameRequest } from '../../../requests/GameRequest'
import { createLogger } from '../../../utils/logger'
import { createGame } from '../../../businessLogic/game'
import { getUserId } from '../../utils'

const logger = createLogger('api')

const createGameHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'createTeamHandler',
    event: event
  })

  const newGame: CreateGameRequest = JSON.parse(event.body);
  let userId
  if (process.env.IS_OFFLINE) {
    userId = `user_123456789`
  } else {
    userId = getUserId(event)
  }
  const item = await createGame(userId, newGame);

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

export const handler = middy(createGameHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
