import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { CreateWSRegistrantRequest } from '../../requests/CreateWSRegistrantRequest'
import { createLogger } from '../../utils/logger'
import { CreateWSRegistrant } from '../../businessLogic/workshopRegister'

const logger = createLogger('createWorkshopRegistrant')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const newWSRegistrant: CreateWSRegistrantRequest = JSON.parse(event.body)

  const newItem = await CreateWSRegistrant(newWSRegistrant)

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
