import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getWSRegistrant } from '../../businessLogic/workshopRegister'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getWorkshopRegistrant')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const emailAddress = event.pathParameters.emailAddress
  const workshopRegistrant = await getWSRegistrant(emailAddress)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: workshopRegistrant
    })
  }
}
