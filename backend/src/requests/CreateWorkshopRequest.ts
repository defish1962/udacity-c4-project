/**
 * Fields in a request to create a single Workshop.
 */
export interface CreateWorkshopRequest {
  workshopName: string
  workshopType: string
  workshopPrice: number
  workshopStart: string
  workshopEnd: string
}
