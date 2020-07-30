import { apiEndpoint } from '../config'
import { Email } from '../types/Email'
import { CreateEmailRequest } from '../types/CreateEmailRequest'
import Axios from 'axios'

export async function sendEmail(newEmail: CreateEmailRequest): Promise<Email> {
  const response = await Axios.post(
    `${apiEndpoint}/nodemailer`,
    JSON.stringify(newEmail),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data.nodemailer
}
