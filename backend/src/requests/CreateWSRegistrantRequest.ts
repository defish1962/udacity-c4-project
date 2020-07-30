/**
 * Fields in a request to create a single Workshop Registrant.
 */
export interface CreateWSRegistrantRequest {
  workshopId: string
  emailAddress: string
  paid: string
  selected: string
  waitlisted: string
}
