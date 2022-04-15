import React from 'react'

export default class AppClass extends React.Component {

  state = {
    coordinateX: 2,
    coordinateY: 2,
    totalMoves: 0,
    board: ["", "", "", 
            "", "B", "",       // ["", "", "", "", "", "", "", "", ""]
            "", "", ""]
  }

  handleUp = () => {
    console.log("We can do this");
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
            return ( 
              <div key={index} className="square">
                {value}
              </div>
            )
          })}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up" onClick={this.handleUp}>UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
