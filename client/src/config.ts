const apiId = 'yjer5tpylj'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-5-kp86z1.auth0.com', // Auth0 domain
  clientId: 'lqYN8XzNGXWOEug4PZ4qRayOr7SKzrUT', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

export const emailConfig = {
  from: 'workshops@kathy-fish.com',
  subject: 'Fast Flash Workshops Lottery Enrollment Confirmation',
  html:
    'Congratulations! This email serves as confirmation of your enrollment in the Fast Flash Online Workshops Lottery',
  bcc: ['registration@kathy-fish.com']
}
