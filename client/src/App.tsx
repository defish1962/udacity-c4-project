import React, { Component, useState } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Button, Menu, Segment, Header, Image } from 'semantic-ui-react'
import logo from './skillshare-thumbnail.png'
import Auth from './auth/Auth'
import { NotFound } from './components/NotFound'
import { RegistrationForm } from './components/RegistrationForm'
import { LandingPageSuccess } from './components/LandingPageSuccess'

export interface AppProps {
  auth: Auth
  history: any
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

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Fast Flash Workshops Lottery
        </Header>
        <Image src={logo} centered size="large" />
      </div>
    )
  }

  generateCurrentPage() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <RegistrationForm
                {...props}
                auth={this.props.auth}
                workshopsSelected={this.props.workshopsSelected}
                workshopsChosen={this.props.workshopsChosen}
                emailAddress={this.props.emailAddress}
              />
            )
          }}
        />

        <Route
          path="/LandingPageSuccess"
          exact
          render={(props) => {
            return <LandingPageSuccess props={props} />
          }}
        />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
