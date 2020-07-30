import { apiEndpoint } from '../config'
import { WorkshopRegistrant } from '../types/WorkshopRegistrant'
import { CreateWorkshopRegistrantRequest } from '../types/CreateWorkshopRegistrantRequest'
import Axios from 'axios'

export async function getWorkshopRegistrants(
  idToken: string,
  workshopId: string
): Promise<WorkshopRegistrant[]> {
  console.log('Fetching Workshop Registrants')

  const response = await Axios.get(
    `${apiEndpoint}/wsRegistrants/${workshopId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  console.log('Workshop Registrants:', response.data)
  return response.data.items
}

export async function getWorkshopRegistrant(
  emailAddress: string
): Promise<WorkshopRegistrant> {
  console.log('Fetching Workshop Registrant')

  const response = await Axios.get(
    `${apiEndpoint}/wsRegistrants/${emailAddress}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  console.log('Workshop Registrant:', response.data)
  return response.data.items
}

export async function createWorkshopRegistrant(
  newWorkshopRegistrant: CreateWorkshopRegistrantRequest
): Promise<WorkshopRegistrant> {
  const response = await Axios.post(
    `${apiEndpoint}/wsRegistrants`,
    JSON.stringify(newWorkshopRegistrant),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data.registrant
}
