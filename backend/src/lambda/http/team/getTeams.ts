import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { createLogger } from '../../../utils/logger'
import { getAllTeams } from '../../../businessLogic/teams'
//import { getUserId } from '../utils'

const logger = createLogger('api')

export const getTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getTodohandler',
    event: event
  })
  //const userId = getUserId(event)
  const id = 'google-oauth2|114715338908998513605'
  const userId = `user_${id}`

  const items = await getAllTeams(userId)
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

export const handler = middy(getTodoHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));