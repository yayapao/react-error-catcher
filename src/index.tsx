import React from 'react'

interface ErrorBoundaryProps {
  
}

class ReactErrorCatcher extends React.Component<ErrorBoundaryProps, {}> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    console.log('hello world')
  }

  render() {
    return this.props.children
  }
}

export default ReactErrorCatcher
