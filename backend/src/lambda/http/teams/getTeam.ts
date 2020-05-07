import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../../utils/logger'
import { getTeam } from '../../../businessLogic/teams'
import { getUserId } from '../../utils'

const logger = createLogger('api')

export const getTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getTodohandler',
    event: event
  })
  const teamId = event.pathParameters.teamId;
  let userId
  if (process.env.IS_OFFLINE) {
    userId = `user_123456789`
  } else {
    userId = getUserId(event)
  }

  const team = await getTeam(userId, teamId)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      team
    })
  };
}

export const handler = middy(getTodoHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));