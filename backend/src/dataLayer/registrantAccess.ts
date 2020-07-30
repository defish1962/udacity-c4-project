import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Registrant } from '../models/Registrant'

export class RegistrantAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly registrantTable = process.env.REGISTRANTS_TABLE
  ) {}

  //Create Registrant function
  async createRegistrant(registrant: Registrant): Promise<Registrant> {
    await this.docClient
      .put({
        TableName: this.registrantTable,
        Item: registrant
      })
      .promise()

    return registrant
  }

  //Get Registrants function
  async getRegistrants(): Promise<Registrant[]> {
    const result = await this.docClient
      .scan({
        TableName: this.registrantTable
      })
      .promise()

    return result.Items as Registrant[]
  }

  //Get a Registrant function
  async getRegistrant(emailAddress: string): Promise<Registrant> {
    const result = await this.docClient
      .get({
        TableName: this.registrantTable,
        Key: {
          emailAddress: emailAddress
        }
      })
      .promise()

    return result.Item as Registrant
  }

  //Delete a Registrant function
  async deleteRegistrant(emailAddress: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.registrantTable,
        Key: {
          emailAddress: emailAddress
        }
      })
      .promise()
  }
}
