import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getWSRegistrants } from '../../businessLogic/workshopRegister'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getWorkshopRegistrants')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const workshopId = event.pathParameters.workshopId
  const workshopRegistrants = await getWSRegistrants(workshopId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: workshopRegistrants
    })
  }
}
