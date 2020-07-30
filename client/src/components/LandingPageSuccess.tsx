import * as React from 'react'
import { Location } from 'history'
import { RouteComponentProps } from 'react-router-dom'

import {
  Divider,
  Grid,
  Header,
  Image,
  Label,
  GridRow,
  GridColumn
} from 'semantic-ui-react'

interface LandingPageProps {
  props: any
}

export class LandingPageSuccess extends React.PureComponent<LandingPageProps> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Grid>
        <p />
        <Header as="h2" textAlign="center">
          Congratulations! You are now registered for the Fast Flash Workshops
          Lottery!
        </Header>
        <p />
        <Header as="h2">
          A confirmation email will be sent to
          <br />
          {this.props.props.location.state.detail.email}
        </Header>
        <p />
      </Grid>
    )
  }
}
