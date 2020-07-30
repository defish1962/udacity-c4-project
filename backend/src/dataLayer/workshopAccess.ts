import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Workshop } from '../models/Workshop'

export class WorkshopAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly workshopTable = process.env.WORKSHOPS_TABLE
  ) {}

  compare(a, b) {
    if (a.workshopId < b.workshopId) {
      return -1
    }
    if (a.workshopId > b.workshopId) {
      return 1
    }
    return 0
  }

  //Create Workshop function
  async createWorkshop(workshop: Workshop): Promise<Workshop> {
    await this.docClient
      .put({
        TableName: this.workshopTable,
        Item: workshop
      })
      .promise()

    return workshop
  }

  //Get Workshops function
  async getWorkshops(): Promise<Workshop[]> {
    const result = await this.docClient
      .scan({
        TableName: this.workshopTable
      })
      .promise()

    var sortedWorkshops = result.Items
    sortedWorkshops.sort(this.compare)

    return sortedWorkshops as Workshop[]
    //return result.Items as Workshop[]
  }

  //Get a Workshop function
  async getWorkshop(workshopId: string): Promise<Workshop> {
    const result = await this.docClient
      .get({
        TableName: this.workshopTable,
        Key: {
          userId: workshopId
        }
      })
      .promise()

    return result.Item as Workshop
  }

  //Delete a Workshop function
  async deleteWorkshop(workshopId: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.workshopTable,
        Key: {
          userId: workshopId
        }
      })
      .promise()
  }
}
