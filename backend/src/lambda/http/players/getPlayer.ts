import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { createLogger } from '../../../utils/logger'
import { getPlayer } from '../../../businessLogic/player'

const logger = createLogger('api')

export const getPlayerHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getPlayerHandler',
    event: event
  })
  const playerId = event.pathParameters.playerId;
  //const userId = getUserId(event)
  const id = 'google-oauth2|123456789'
  const userId = `user_${id}`

  const items = await getPlayer(userId, playerId)
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

export const handler = middy(getPlayerHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));