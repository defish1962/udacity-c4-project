import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getWorkshop, deleteWorkshop } from '../../businessLogic/workshops'

const logger = createLogger('deleteWorkshop')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const workshopId = getUserId(event)

  const workshop = await getWorkshop(workshopId)
  if (!workshop) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Workshop does not exist or user does not have access to it'
      })
    }
  }

  await deleteWorkshop(workshopId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: null
  }
}
