import React from 'react'

class ReactErrorCatcher extends React.Component {
  constructor(props) {
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
}

export default ReactErrorCatcher
