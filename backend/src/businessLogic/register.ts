import { CreateRegistrantRequest } from '../requests/CreateRegistrantRequest'
import { Registrant } from '../models/Registrant'
import { RegistrantAccess } from '../dataLayer/registrantAccess'
import { createLogger } from '../utils/logger'

const registrantAccess = new RegistrantAccess()
const logger = createLogger('RegistrantAccess')

export async function CreateRegistrant(
  createRegistrantRequest: CreateRegistrantRequest
): Promise<Registrant> {
  logger.info('Creating the registrant')

  return await registrantAccess.createRegistrant({
    firstName: createRegistrantRequest.firstName,
    lastName: createRegistrantRequest.lastName,
    emailAddress: createRegistrantRequest.emailAddress,
    phoneNumber: createRegistrantRequest.phoneNumber,
    workshops: createRegistrantRequest.workshops,
    createdAt: new Date().toISOString()
  })
}

export async function getRegistrants(): Promise<Registrant[]> {
  logger.info('Getting Registrants')

  return await registrantAccess.getRegistrants()
}

export async function getRegistrant(emailAddress: string): Promise<Registrant> {
  logger.info('Getting the Registrant', {
    emailAddress: emailAddress
  })

  return await registrantAccess.getRegistrant(emailAddress)
}
