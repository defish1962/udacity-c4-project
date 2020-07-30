/**
 * Fields in a request to create a single Registrant.
 */
export interface CreateRegistrantRequest {
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  workshops: any
}
