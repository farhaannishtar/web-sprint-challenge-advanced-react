import React, {useState} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {

  const [state, setState] = useState({
    coordinateX: 2,
    coordinateY: 2,
    totalMoves: 0,
    board: ["", "", "", "", "", "", "", "", ""],
    message: "",
    email: ""
  })

  const handleUp = () => {
    console.log("We are going up");
    if (state.coordinateY === 1) {
      setState({
        ... state,
        message: "You can't go up"
      })
    } else {
     setState({
        ... state,
       coordinateY: state.coordinateY - 1,
       totalMoves: state.totalMoves + 1
      });
    }
  }

  const handleDown = () => {
    console.log("We are going down");
    if (state.coordinateY === 3) {
      setState({
        ...state,
        message: "You can't go down"
      })
    } else {
     setState({
        ...state,
       coordinateY: state.coordinateY + 1,
       totalMoves: state.totalMoves + 1
      });
    }
  }

  const handleRight = () => {
    console.log("We are going right");
    if (state.coordinateX === 3) {
      setState({
        ...state,
        message: "You can't go right"
      })
    } else {
     setState({
        ... state,
       coordinateX: state.coordinateX + 1,
       totalMoves: state.totalMoves + 1
      });
    }
  }

  const handleLeft = () => {
    console.log("We are going left");
    if (state.coordinateX === 1) {
      setState({
        ...state,
        message: "You can't go left"
      })
    } else {
     setState({
        ... state,
       coordinateX: state.coordinateX - 1,
       totalMoves: state.totalMoves + 1
      });
    }
  }

  const reset = () => {
    setState({
      ...state,
      coordinateX: 2,
      coordinateY: 2,
      totalMoves: 0,
      message: "",
      email: "",
    })
  }

  const mapCoordinatesWithPosition = (index) => {
    if (state.coordinateX === 1 && state.coordinateY === 1 && index === 0) {
      return true;
    }
    if (state.coordinateX === 2 && state.coordinateY === 1 && index === 1) {
      return true;
    } 
    if (state.coordinateX === 3 && state.coordinateY === 1 && index === 2) {
      return true;
    }
    if (state.coordinateX === 1 && state.coordinateY === 2 && index === 3) {
      return true;
    }
    if (state.coordinateX === 2 && state.coordinateY === 2 && index === 4) {
      return true;
    } 
    if (state.coordinateX === 3 && state.coordinateY === 2 && index === 5) {
      return true;
    }
    if (state.coordinateX === 1 && state.coordinateY === 3 && index === 6) {
      return true;
    }
    if (state.coordinateX === 2 && state.coordinateY === 3 && index === 7) {
      return true;
    }
    if (state.coordinateX === 3 && state.coordinateY === 3 && index === 8) {
      return true;
    }
  }

  const emailChangeHandler = (event) => {
    setState({
      ...state,
      email: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("We are sane");
    const payload = {
      "x": state.coordinateX,
      "y": state.coordinateY,
      "steps": state.totalMoves,
      "email": state.email
    };
    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        console.log(res.data.message);
        setState({
          ...state,
          message: res.data.message,
          email: ""
        })
      })
      .catch(err => {
        console.log("HI");
        setState({
          ...state,
          message: "Ouch: email is required",
          email: ""
        })
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">Coordinates ({state.coordinateX}, {state.coordinateY})</h3>
          {
            (state.totalMoves === 1)
              ? <h3 id="steps">You moved {state.totalMoves} time</h3>
              : <h3 id="steps">You moved {state.totalMoves} times</h3>
          }
          {/* <h3 id="steps">You moved {state.totalMoves} times</h3> */}
        </div>
        <div id="grid">
          {state.board.map((value, index) => {
            // If the value matches with the coordinates, 
            // Set orange square for the div
            if (mapCoordinatesWithPosition(index) === true) {
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
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={handleLeft}>LEFT</button>
          <button id="up" onClick={handleUp}>UP</button>
          <button id="right" onClick={handleRight}>RIGHT</button>
          <button id="down" onClick={handleDown}>DOWN</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
        <form onSubmit={handleSubmit}>
        <input 
            id="email" 
            type="email" 
            placeholder="type email"
            value={state.email}
            onChange={emailChangeHandler}
            >
          </input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
