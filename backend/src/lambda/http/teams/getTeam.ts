import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../../utils/logger'
import { getTeam } from '../../../businessLogic/teams'
import { getUserId } from '../../utils'

const logger = createLogger('api')

export const getTeamHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getTeamhandler',
    event: event
  })
  const teamId = event.pathParameters.teamId;
  const userId = getUserId(event)

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

export const handler = middy(getTeamHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));