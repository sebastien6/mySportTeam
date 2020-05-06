import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreateGameRequest } from '../../../requests/GameRequest'
import { createLogger } from '../../../utils/logger'
import { createGame } from '../../../businessLogic/game'
// import { getUserId } from '../utils'

const logger = createLogger('api')

const createGameHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'createTeamHandler',
    event: event
  })

  const newGame: CreateGameRequest = JSON.parse(event.body);
  //const userId = getUserId(event)
  const id = 'google-oauth2|114715338908998513605'
  const userId = `user_${id}`

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
