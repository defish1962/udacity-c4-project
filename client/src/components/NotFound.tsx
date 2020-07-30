import * as React from 'react'

interface NotFoundProps {}

interface NotFoundState {}

export class NotFound extends React.PureComponent<
  NotFoundProps,
  NotFoundState
> {
  render() {
    return <h1>Page Not Found</h1>
  }
}
