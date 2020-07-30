import * as uuid from 'uuid'

import { CreateWorkshopRequest } from '../requests/CreateWorkshopRequest'
import { Workshop } from '../models/Workshop'
import { WorkshopAccess } from '../dataLayer/workshopAccess'
import { createLogger } from '../utils/logger'

const workshopAccess = new WorkshopAccess()
const logger = createLogger('WorkshopAccess')

export async function CreateWorkshop(
  createWorkshopRequest: CreateWorkshopRequest
): Promise<Workshop> {
  logger.info('Creating the workshop')

  const workshopId = uuid.v4()

  return await workshopAccess.createWorkshop({
    workshopId: workshopId,
    workshopName: createWorkshopRequest.workshopName,
    workshopType: createWorkshopRequest.workshopType,
    workshopPrice: createWorkshopRequest.workshopPrice,
    workshopStart: createWorkshopRequest.workshopStart,
    workshopEnd: createWorkshopRequest.workshopEnd,
    createdAt: new Date().toISOString()
  })
}

export async function getWorkshops(): Promise<Workshop[]> {
  logger.info('Getting Workshops')

  return await workshopAccess.getWorkshops()
}

export async function getWorkshop(workshopId: string): Promise<Workshop> {
  logger.info('Getting the Workshop', {
    workshopId: workshopId
  })

  return await workshopAccess.getWorkshop(workshopId)
}

export async function deleteWorkshop(workshopId: string): Promise<void> {
  logger.info('Deleting the workshop', {
    workshopId: workshopId
  })

  await workshopAccess.deleteWorkshop(workshopId)
}
