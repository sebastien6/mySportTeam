import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../../utils/logger'
import { deleteTeam } from '../../../businessLogic/teams'
import { getUserId } from '../../utils'

const logger = createLogger('api')

const deleteTeamHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'deleteTeamHandler',
    event: event
  })

  const teamId = event.pathParameters.teamId;
  const userId = getUserId(event)
  
  await deleteTeam(userId, teamId);

  return {
    statusCode: 204,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({})
  };
}

export const handler = middy(deleteTeamHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
