'use strict'
import { createLogger } from '../../utils/logger'
import { CreateEmailRequest } from '../../requests/CreateEmailRequest'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

const aws = require('aws-sdk')
const ses = new aws.SES({ region: 'us-east-2' })
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({ SES: ses })
const logger = createLogger('Email')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const newEmail: CreateEmailRequest = JSON.parse(event.body)

  let mailOptions = {
    from: newEmail.from,
    to: newEmail.to,
    subject: newEmail.subject,
    html: newEmail.html,
    bcc: newEmail.bcc
  }

  let result = await transporter.sendMail(mailOptions)
  logger.info('Result:', result)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        status: 'success',
        messageId: result.messageId
      },
      null
    ),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
