import { History } from 'history'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Divider,
  Form,
  Header,
  Input,
  Image,
  Label,
  Loader,
  GridRow,
  GridColumn
} from 'semantic-ui-react'

import { createRegistrant, getRegistrant } from '../api/registrants-api'
import { createWorkshopRegistrant } from '../api/workshopRegistrants-api'
import { sendEmail } from '../api/email-api'
import Auth from '../auth/Auth'
import { WorkshopList } from './WorkshopsList'
import { emailConfig } from '../config'

interface RegistrantProps {
  auth: Auth
  history: History
  workshopsSelected: string[]
  workshopsChosen: {
    workshopId: string
    workshopName: string
    workshopPrice: number
    workshopStart: string
    workshopEnd: string
  }[]
  emailAddress: string
}

interface RegistrantState {
  newRegistrantFirstName: string
  newRegistrantLastName: string
  newRegistrantEmail: string
  newRegistrantPhone: string
  emailError: string
  firstNameError: string
  lastNameError: string
  phoneNumberError: string
  workshopsError: string
  formValid: boolean
}

// interface WorkshopsSelected {
//   workshopsSelected: [string]
// }

export class RegistrationForm extends React.PureComponent<
  RegistrantProps,
  RegistrantState
> {
  constructor(props: any) {
    super(props)
    type Props = { manageWorkshopsList(wsId: string): [string] }
    this.manageWorkshopsList = this.manageWorkshopsList.bind(this)
  }

  state: RegistrantState = {
    newRegistrantFirstName: '',
    newRegistrantLastName: '',
    newRegistrantEmail: '',
    newRegistrantPhone: '',
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    phoneNumberError: '',
    workshopsError: '',
    formValid: true
  }

  workshopsSelected: string[] = []
  private registrantWorkshops: object[] = []

  buildWorkshopInfo(wsId: string, emailAddress: string) {
    let addWorkshop = {
      workshopId: wsId,
      emailAddress,
      selected: 'No',
      paid: 'No',
      waitlisted: 'No'
    }
    this.registrantWorkshops.push(addWorkshop)
    console.log(addWorkshop)
  }

  createWorkshopsEntries = () => {
    this.workshopsSelected.forEach((wsId) => {
      this.onWSRegistrantCreate(wsId)
    })
  }

  validateForm = () => {
    // Email address has been entered
    if (this.state.newRegistrantEmail.length < 1) {
      this.setState({ emailError: 'Please provide a valid email address' })
      this.setState({ formValid: false })
    } else {
      this.setState({ emailError: '' })
      this.setState({ formValid: true })
    }

    // First Name Entered
    if (this.state.newRegistrantFirstName.length < 1) {
      this.setState({ firstNameError: 'Please provide a first name' })
      this.setState({ formValid: false })
    } else {
      this.setState({ firstNameError: '' })
      this.setState({ formValid: true })
    }

    // Last Name Entered
    if (this.state.newRegistrantLastName.length < 1) {
      this.setState({ lastNameError: 'Please provide a last name' })
      this.setState({ formValid: false })
    } else {
      this.setState({ lastNameError: '' })
      this.setState({ formValid: true })
    }

    //Phone Number is long enough
    if (this.state.newRegistrantPhone.length > 0) {
      if (this.state.newRegistrantPhone.length < 11) {
        this.setState({
          phoneNumberError:
            'Phone number must be at least 11 digits. Make sure you include the country code'
        })
        this.setState({ formValid: false })
      } else {
        this.setState({ phoneNumberError: '' })
        this.setState({ formValid: true })
      }
    } else {
      this.setState({ phoneNumberError: '' })
      this.setState({ formValid: true })
    }

    // At least one workshop selected
    console.log(this.workshopsSelected.length)
    if (this.workshopsSelected.length === 0) {
      this.setState({ workshopsError: 'Please select at least one workshop' })
      this.setState({ formValid: false })
    } else {
      this.setState({ workshopsError: '' })
      this.setState({ formValid: true })
    }
    // Check to see if this email address has already been used to register
    this.alreadyRegistered()
  }

  alreadyRegistered = async () => {
    const emailUsed = await getRegistrant(this.state.newRegistrantEmail)
    if (emailUsed === undefined) {
      this.setState({ emailError: '' })
      this.setState({ formValid: true })
      // Register the user
      this.onRegistrantCreate()
    } else {
      console.log(emailUsed.emailAddress)
      this.setState({
        emailError:
          'This email address has already been used to register for the lottery'
      })
      this.setState({ formValid: false })
    }
  }

  onWSRegistrantCreate = async (wsId: string) => {
    try {
      const newWSRegistrant = await createWorkshopRegistrant({
        workshopId: wsId,
        emailAddress: this.state.newRegistrantEmail,
        paid: 'No',
        selected: 'No',
        waitlisted: 'No'
      })
    } catch {
      alert('Could not creat Workshop Registrant entries')
    }
  }

  sendEmail = async () => {
    console.log('sending email')
    //const mailOptions = emailConfig

    const newEmail = await sendEmail({
      from: emailConfig.from,
      to: this.state.newRegistrantEmail,
      subject: emailConfig.subject,
      html: emailConfig.html,
      bcc: emailConfig.bcc
    })
  }

  onRegistrantCreate = async () => {
    try {
      console.log(this.registrantWorkshops)
      const newRegistrant = await createRegistrant({
        firstName: this.state.newRegistrantFirstName,
        lastName: this.state.newRegistrantLastName,
        emailAddress: this.state.newRegistrantEmail,
        phoneNumber: this.state.newRegistrantPhone
      })

      //Add workshop entries for registrant
      this.createWorkshopsEntries()

      //Send Confirmation email
      this.sendEmail()

      let detail = {
        email: this.state.newRegistrantEmail,
        workshops: this.registrantWorkshops
      }
      this.props.history.push({
        pathname: '/LandingPageSuccess',
        state: { detail: detail }
      })
    } catch {
      alert('Oh oh! Looks like something went wrong. Please try again')
    }
  }

  manageWorkshopsList(wsId: string) {
    console.log(wsId)
    let pos = this.workshopsSelected.indexOf(wsId)
    if (pos >= 0) {
      //Remove it from the array
      this.workshopsSelected.splice(pos, 1)
    } else {
      this.workshopsSelected.push(wsId)
    }
    console.log(this.workshopsSelected)
    return this.workshopsSelected
  }

  generateWorkshopList() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <WorkshopList manageWorkshopsList={this.manageWorkshopsList} />
            )
          }}
        />
        <Route path="/LandingPageSuccess" />
      </Switch>
    )
  }

  render() {
    return <div>{this.renderCreateRegistrantInput()}</div>
  }

  renderCreateRegistrantInput() {
    return (
      <Form onSubmit={this.validateForm}>
        <Form.Field>
          <label>First Name</label>
          <Input
            placeholder="First Name"
            value={this.state.newRegistrantFirstName}
            onChange={(e) =>
              this.setState({ newRegistrantFirstName: e.target.value })
            }
          />
        </Form.Field>
        <div>
          <span>
            {this.state.firstNameError ? (
              <Label color="red">{this.state.firstNameError}</Label>
            ) : null}
          </span>
        </div>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={this.state.newRegistrantLastName}
            onChange={(e) =>
              this.setState({ newRegistrantLastName: e.target.value })
            }
          />
        </Form.Field>
        <div>
          <span>
            {this.state.lastNameError ? (
              <Label color="red">{this.state.lastNameError}</Label>
            ) : null}
          </span>
        </div>
        <Form.Field>
          <label>Email Address</label>
          <input
            placeholder="Email Address"
            value={this.state.newRegistrantEmail}
            onChange={(e) =>
              this.setState({ newRegistrantEmail: e.target.value })
            }
          />
        </Form.Field>
        <div>
          <span>
            {this.state.emailError ? (
              <Label color="red">{this.state.emailError}</Label>
            ) : null}
          </span>
        </div>
        <Form.Field>
          <label>Phone Number (Optional)</label>
          <label>
            Please enter a phone number if you would like to receive text
            messages about your Fast Flash Workshops
          </label>
          <input
            placeholder="Phone Number - Country Code First (e.g. 1 for the US or Canada)"
            value={this.state.newRegistrantPhone}
            onChange={(e) =>
              this.setState({ newRegistrantPhone: e.target.value })
            }
          />
        </Form.Field>
        <div>
          <span>
            {this.state.phoneNumberError ? (
              <Label color="red">{this.state.phoneNumberError}</Label>
            ) : null}
          </span>
        </div>
        <p />
        <div>{this.generateWorkshopList()}</div>
        <div>
          <span>
            {this.state.workshopsError ? (
              <Label color="red">{this.state.workshopsError}</Label>
            ) : null}
          </span>
        </div>
        <p />
        <Form.Button color="orange">Enroll</Form.Button>
      </Form>
    )
  }
}
