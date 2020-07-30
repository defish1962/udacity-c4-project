import * as React from 'react'
import { Checkbox, Container, Grid, Header, Loader } from 'semantic-ui-react'

import { getWorkshops } from '../api/workshops-api'
import { Workshop } from '../types/Workshop'

interface WorkshopState {
  workshops: Workshop[]
  workshopId: string
  workshopName: string
  workshopPrice: number
  workshopStart: string
  workshopEnd: string
  loadingWorkshops: boolean
}

interface ManageWorkshopsList {
  manageWorkshopsList: (wsId: string) => string[]
}

interface WorkshopsChosen {
  workshopId: string
  workshopName: string
  workshopPrice: number
  workshopStart: string
  workshopEnd: string
}
;[]

export class WorkshopList extends React.PureComponent<ManageWorkshopsList> {
  constructor(props: any) {
    super(props)
  }

  state: WorkshopState = {
    workshops: [],
    workshopId: '',
    workshopName: '',
    workshopPrice: 0,
    workshopStart: '',
    workshopEnd: '',
    loadingWorkshops: true
  }

  workshopsChosen = [
    {
      workshopsId: '',
      workshopName: '',
      workshopPrice: 0,
      workshopStart: '',
      workshopEnd: ''
    }
  ]

  async componentDidMount() {
    try {
      const workshops = await getWorkshops()
      this.setState({
        workshops: workshops,
        loadingWorkshops: false
      })
    } catch (e) {
      alert(`Failed to fetch workshops: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Workshops
        </Header>
        <div>
          <Container text>
            <Header as="h3" textAlign="center">
              You may enroll in the lottery for as many workshops as you would
              like. If selected for a workshop your other lottery entries will
              be removed.
            </Header>
            <p />
          </Container>
        </div>
        <div>{this.renderWorkshops()}</div>
      </div>
    )
  }

  renderWorkshops() {
    return this.renderWorkshopsList()
  }

  currencyFormat(num: number) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  formatDate(str: string) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(str).toLocaleDateString([], options)
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Workshops
        </Loader>
      </Grid.Row>
    )
  }

  renderWorkshopsList() {
    return (
      <Grid>
        {this.state.workshops.map((workshop, pos) => {
          return (
            <Grid.Row key={workshop.workshopId}>
              <Grid.Column width="5">
                <Checkbox
                  label={workshop.workshopName}
                  onChange={(e) => {
                    console.log(this.props)
                    this.props.manageWorkshopsList(workshop.workshopId)
                  }}
                />
              </Grid.Column>
              <Grid.Column width="2">
                {' '}
                {this.currencyFormat(workshop.workshopPrice)}
              </Grid.Column>
              <Grid.Column width="6">
                {this.formatDate(workshop.workshopStart)} -{' '}
                {this.formatDate(workshop.workshopEnd)}
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}
