import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreateTeamRequest } from '../../../requests/TeamRequest'
import { createLogger } from '../../../utils/logger'
import { createTeam } from '../../../businessLogic/teams'
import { getUserId } from '../../utils'

const logger = createLogger('api')

const createTeamHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'createTeamHandler',
    event: event
  })

  const newTeam: CreateTeamRequest = JSON.parse(event.body);
  let userId
  if (process.env.IS_OFFLINE) {
    userId = `user_123456789`
  } else {
    userId = getUserId(event)
  }

  const item = await createTeam(userId, newTeam);

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

export const handler = middy(createTeamHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
