// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '9msmfk5380'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-5-kp86z1.auth0.com', // Auth0 domain
  clientId: 'BnYDdP6O6WMOo426jue5069WyS1IszHg', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
