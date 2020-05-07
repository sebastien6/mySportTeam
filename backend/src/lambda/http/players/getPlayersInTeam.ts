import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserId } from '../../utils'
import { createLogger } from '../../../utils/logger'
import { getAllPlayersInTeam } from '../../../businessLogic/player'

const logger = createLogger('api')

export const getPlayersInTeamHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'getPlayersInTeamHandler',
    event: event
  })
  const teamId = event.pathParameters.teamId;
  let userId
  if (process.env.IS_OFFLINE) {
    userId = `user_123456789`
  } else {
    userId = getUserId(event)
  }

  const items = await getAllPlayersInTeam(userId, teamId)
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

export const handler = middy(getPlayersInTeamHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));