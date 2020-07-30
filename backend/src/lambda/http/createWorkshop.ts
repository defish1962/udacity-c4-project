import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { CreateWorkshopRequest } from '../../requests/CreateWorkshopRequest'
import { createLogger } from '../../utils/logger'
import { CreateWorkshop } from '../../businessLogic/workshops'

const logger = createLogger('createWorkshop')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const newWorkshop: CreateWorkshopRequest = JSON.parse(event.body)

  const newItem = await CreateWorkshop(newWorkshop)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
