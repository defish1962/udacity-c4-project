export interface Registrant {
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  createdAt: string
  formErrors: {
    firstName: string
    lastName: string
    email: string
  }
}
