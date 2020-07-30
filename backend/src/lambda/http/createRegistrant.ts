import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { CreateRegistrantRequest } from '../../requests/CreateRegistrantRequest'
import { createLogger } from '../../utils/logger'
import { CreateRegistrant } from '../../businessLogic/register'

const logger = createLogger('createRegistrant')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const newRegistrant: CreateRegistrantRequest = JSON.parse(event.body)

  const newItem = await CreateRegistrant(newRegistrant)

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
