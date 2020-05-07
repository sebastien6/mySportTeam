import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreatePlayerRequest } from '../../../requests/PlayerRequest'
import { createLogger } from '../../../utils/logger'
import { createPlayer } from '../../../businessLogic/player'
import { getUserId } from '../../utils'

const logger = createLogger('api')

const createPlayerHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'createTeamHandler',
    event: event
  })

  const newPlayer: CreatePlayerRequest = JSON.parse(event.body);
  const userId = getUserId(event)

  const item = await createPlayer(userId, newPlayer);

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

export const handler = middy(createPlayerHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
