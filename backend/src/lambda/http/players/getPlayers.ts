import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { createLogger } from '../../../utils/logger'
import { getAllPlayers } from '../../../businessLogic/player'

const logger = createLogger('api')

export const getPlayersHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getPlayerHandler',
    event: event
  })
  //const userId = getUserId(event)
  const id = 'google-oauth2|114715338908998513605'
  const userId = `user_${id}`

  const items = await getAllPlayers(userId)
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

export const handler = middy(getPlayersHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));