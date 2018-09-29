import React, { Component } from 'react'

class Sock extends Component {
  constructor(props) {
    super(props);
    this.state = {tree: null}
  }
  
  componentDidMount() {
    setTimeout(() => {
      socket.emit('data', {
        data: 'socket from client'
      })
    }, 5000);

    socket.on('data', data => {
      this.setState(state => {
        return {tree: JSON.stringify(data)}
      })
    })
  }

  render() {
    return (
      <div>
        here
        <p>{this.state.tree}</p>
      </div>
    )
  }
} 





export default Sock;