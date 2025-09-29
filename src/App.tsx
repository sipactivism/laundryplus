import { useState } from 'react'
import './App.css'

const Machine = () => {
  return (
    <>
        <div className="machine">
          <p className="machine-id"><b>5</b></p>
          <img className="machine-icon" src="machine.png"></img>
          <p className="status">Getting status...</p>
        </div>
    </>
  )
};

const Room = () => {
  return (
    <>
      <div id="room">
        <Machine/>
        <Machine/>
        <Machine/>
        <Machine/>
        <Machine/>
        <Machine/>
        <Machine/>
        <Machine/>
      </div>
    </>
  )
}

const RoomDropdown = () => {
  return (
    <>
        <select id="roomselect">
          <option value="none">Select a laundry room...</option>
          <option value="muirodds">Muir Odds</option>
          <option value="muirevens">Muir Evens</option>
        </select>
    </>
  )
}

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 id="title"><i>Laundry+</i></h1>
      <RoomDropdown/>
      <Room/>
    </>
  )
}

export default App
