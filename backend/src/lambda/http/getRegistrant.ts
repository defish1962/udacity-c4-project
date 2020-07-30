import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getRegistrant } from '../../businessLogic/register'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getRegistrants')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const emailAddress = event.pathParameters.emailAddress
  const registrant = await getRegistrant(emailAddress)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: registrant
    })
  }
}
