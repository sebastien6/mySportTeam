import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { createLogger } from '../../../utils/logger'
import { getAllGames } from '../../../businessLogic/game'

const logger = createLogger('api')

export const getGamesHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getGamesHandler',
    event: event
  })
  //const userId = getUserId(event)
  const id = 'google-oauth2|123456789'
  const userId = `user_${id}`

  const items = await getAllGames(userId)
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

export const handler = middy(getGamesHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));