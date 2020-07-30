import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { WorkshopRegistrants } from '../models/WorkshopRegistrants'

export class WorkshopRegistrantAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly workshopsRegistrantTable = process.env.WS_REGISTRANTS_TABLE
  ) {}

  //Create WorkshopRegistrant function
  async createWSRegistrant(
    WorkshopRegistrants: WorkshopRegistrants
  ): Promise<WorkshopRegistrants> {
    await this.docClient
      .put({
        TableName: this.workshopsRegistrantTable,
        Item: WorkshopRegistrants
      })
      .promise()

    return WorkshopRegistrants
  }

  //Get WorkshopRegistrants
  async getWSRegistrants(workshopId: string): Promise<WorkshopRegistrants[]> {
    const result = await this.docClient
      // .query({
      //   TableName: this.workshopsRegistrantTable,
      //   KeyConditionExpression: 'workshopId = :workshopId',
      //   ExpressionAttributeValues: {
      //     ':workshopId': workshopId
      //   },
      //   ScanIndexForward: false
      // })
      .scan({
        TableName: this.workshopsRegistrantTable,
        FilterExpression: '#wsId = :workshopId',
        ExpressionAttributeNames: {
          '#wsId': 'workshopId'
        },
        ExpressionAttributeValues: {
          ':workshopId': workshopId
        }
      })
      .promise()

    return result.Items as WorkshopRegistrants[]
  }

  //Get a Workshop Registrant
  async getWSRegistrant(emailAddress: string): Promise<WorkshopRegistrants> {
    const result = await this.docClient
      .get({
        TableName: this.workshopsRegistrantTable,
        Key: {
          emailAddress: emailAddress
        }
      })
      .promise()

    return result.Item as WorkshopRegistrants
  }

  //Delete a Workshop Registrant function
  async deleteWSRegistrant(
    workshopId: string,
    emailAddress: string
  ): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.workshopsRegistrantTable,
        Key: {
          workshopId: workshopId,
          emailAddress: emailAddress
        }
      })
      .promise()
  }
}
