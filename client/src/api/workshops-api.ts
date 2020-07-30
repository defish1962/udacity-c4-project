import { apiEndpoint } from '../config'
import { Workshop } from '../types/Workshop'
import Axios from 'axios'

export async function getWorkshops(): Promise<Workshop[]> {
  console.log('Fetching Workshops')

  const response = await Axios.get(`${apiEndpoint}/workshops`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data.items
}

export async function createWorkshop(
  idToken: string,
  newWorkshop: Workshop
): Promise<Workshop> {
  const response = await Axios.post(
    `${apiEndpoint}/workshops`,
    JSON.stringify(newWorkshop),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.workshop
}

export async function deleteWorkshop(
  idToken: string,
  workshopId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/workshops/${workshopId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}
