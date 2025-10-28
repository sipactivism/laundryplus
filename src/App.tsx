import { useState } from "react";
import "./App.css";

const Machine = (props: any) => {
  console.log(props);
  let status_text;
  let status_img;
  let duration = "awaiting the next load";
  switch (props.machine_status) {
    case 0:
      if (typeof props.time_left === "string") {
        status_text = "finished";
        status_img = "washersleep.png";
      } else {
        status_text = "full";
        status_img = "washerbusy.png";
      }
      break;
    case 1:
      status_text = "empty";
      status_img = "washerhappy.png";
      break;
    case 2:
      status_text = "finished";
      status_img = "washersleep.png";
      break;
  }
  const currentTime = new Date(Date.now());
  if (typeof props.time_left === "number") {
    const minutes = currentTime.getMinutes();
    currentTime.setSeconds(currentTime.getSeconds() + props.time_left);
    duration = `finishes at ${currentTime.getHours()}:${
      minutes < 10 ? "0" + String(minutes) : String(minutes)
    }`;
  }
  return (
    <>
      <div className="machine">
        <p className="machine-id">{props.machine_id}</p>
        <img className="machine-icon" src={status_img}></img>
        <p className="status">
          {props.machine_type}, {status_text}
        </p>
        <p className="duration">{duration}</p>
      </div>
    </>
  );
};

const Room = (props: any) => {
  console.log("loading");
  const [machineData, setMachineData] = useState([]);
  const [machineDataLoaded, setMachineDataLoaded] = useState(false);
  if (props.roomName === "none")
    return (
      <>
        <div id="room"></div>
      </>
    );
  fetch("/get")
    .then((res) => res.json())
    .then((res) =>
      res.map(
        (machine: {
          id: number;
          status: number;
          type: string;
          time_left: number;
        }) => (
          <Machine
            machine_id={machine.id}
            machine_status={machine.status}
            machine_type={machine.type}
            time_left={machine.time_left}
          />
        )
      )
    )
    .then((res) => {
      if (machineDataLoaded) return;
      setMachineDataLoaded(true);
      setMachineData(res);
    });
  return (
    <>
      <div id="room">{machineData}</div>
    </>
  );
};

const RoomSelect = () => {
  const [room, setRoom] = useState("none");
  return (
    <>
      <select id="roomselect" onChange={(e) => setRoom(e.target.value)}>
        <option value="none">Select a laundry room...</option>
        <option value="muirodds">Muir Odds</option>
        <option value="muirevens">Muir Evens</option>
      </select>
      <Room roomName={room} />
    </>
  );
};

const App = () => {
  return (
    <>
      <h1 id="title">
        <i>Laundry+</i>
      </h1>
      <RoomSelect />
    </>
  );
};

export default App;
