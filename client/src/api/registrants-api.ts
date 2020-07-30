import { apiEndpoint } from '../config'
import { Registrant } from '../types/Registrant'
import { CreateRegistrantRequest } from '../types/CreateRegistrantRequest'
import Axios from 'axios'

export async function getRegistrants(idToken: string): Promise<Registrant[]> {
  console.log('Fetching Registrants')

  const response = await Axios.get(`${apiEndpoint}/registrants`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('Registrants:', response.data)
  return response.data.items
}

export async function getRegistrant(emailAddress: string): Promise<Registrant> {
  console.log('Fetching Registrant')

  const response = await Axios.get(
    `${apiEndpoint}/registrants/${emailAddress}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  console.log('Registrant:', response.data)
  return response.data.items
}

export async function createRegistrant(
  newRegistrant: CreateRegistrantRequest
): Promise<Registrant> {
  const response = await Axios.post(
    `${apiEndpoint}/registrants`,
    JSON.stringify(newRegistrant),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data.registrant
}
