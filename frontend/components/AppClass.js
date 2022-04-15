import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {

  state = {
    coordinateX: 2,
    coordinateY: 2,
    totalMoves: 0,
    board: ["", "", "", "", "", "", "", "", ""],
    message: "",
    email: ""
  }

  handleUp = () => {
    console.log("We are going up");
    if (this.state.coordinateY === 1) {
      this.setState({
        message: "You can't go up"
      })
    } else {
     this.setState({
        ... this.state,
       coordinateY: this.state.coordinateY - 1,
       totalMoves: this.state.totalMoves + 1
      });
    }
  }

  handleDown = () => {
    console.log("We are going down");
    if (this.state.coordinateY === 3) {
      this.setState({
        message: "You can't go down"
      })
    } else {
     this.setState({
        ... this.state,
       coordinateY: this.state.coordinateY + 1,
       totalMoves: this.state.totalMoves + 1
      });
    }
  }

  handleRight = () => {
    console.log("We are going right");
    if (this.state.coordinateX === 3) {
      this.setState({
        message: "You can't go right"
      })
    } else {
     this.setState({
        ... this.state,
       coordinateX: this.state.coordinateX + 1,
       totalMoves: this.state.totalMoves + 1
      });
    }
  }

  handleLeft = () => {
    console.log("We are going left");
    if (this.state.coordinateX === 1) {
      this.setState({
        message: "You can't go left"
      })
    } else {
     this.setState({
        ... this.state,
       coordinateX: this.state.coordinateX - 1,
       totalMoves: this.state.totalMoves + 1
      });
    }
  }

  reset = () => {
    this.setState({
      ... this.state,
      coordinateX: 2,
      coordinateY: 2,
      totalMoves: 0,
      message: "",
      email: ""
    })
  }

  mapCoordinatesWithPosition = (index) => {
    if (this.state.coordinateX === 1 && this.state.coordinateY === 1 && index === 0) {
      return true;
    }
    if (this.state.coordinateX === 2 && this.state.coordinateY === 1 && index === 1) {
      return true;
    } 
    if (this.state.coordinateX === 3 && this.state.coordinateY === 1 && index === 2) {
      return true;
    }
    if (this.state.coordinateX === 1 && this.state.coordinateY === 2 && index === 3) {
      return true;
    }
    if (this.state.coordinateX === 2 && this.state.coordinateY === 2 && index === 4) {
      return true;
    } 
    if (this.state.coordinateX === 3 && this.state.coordinateY === 2 && index === 5) {
      return true;
    }
    if (this.state.coordinateX === 1 && this.state.coordinateY === 3 && index === 6) {
      return true;
    }
    if (this.state.coordinateX === 2 && this.state.coordinateY === 3 && index === 7) {
      return true;
    }
    if (this.state.coordinateX === 3 && this.state.coordinateY === 3 && index === 8) {
      return true;
    }
  }

  emailChangeHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("We are sane");
    const payload = {
      "x": this.state.coordinateX,
      "y": this.state.coordinateY,
      "steps": this.state.totalMoves,
      "email": this.state.email
    };
    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        console.log(res.data.message);
        this.setState({
          ...this.state,
          message: res.data.message
        })
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinateX}, {this.state.coordinateY})</h3>
          <h3 id="steps">You moved {this.state.totalMoves} times</h3>
        </div>
        <div id="grid">
          {this.state.board.map((value, index) => {
            // If the value matches with the coordinates, 
            // Set orange square for the div
            if (this.mapCoordinatesWithPosition(index) === true) {
              return ( 
                <div key={index} className="square active">
                  B
                </div>
              )
            }
            return ( 
              <div key={index} className="square">
                {value}
              </div>
            )
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleLeft}>LEFT</button>
          <button id="up" onClick={this.handleUp}>UP</button>
          <button id="right" onClick={this.handleRight}>RIGHT</button>
          <button id="down" onClick={this.handleDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={this.state.email}
            onChange={this.emailChangeHandler}
            >
          </input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
