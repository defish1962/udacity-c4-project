import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getRegistrants } from '../../businessLogic/register'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getRegistrants')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const registrants = await getRegistrants()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: registrants
    })
  }
}
