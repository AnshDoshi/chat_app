import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io("http://localhost:3001/");

function App() {
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const joinRoom = () => {
    if (!name.trim() || !roomId?.trim()) {
      return;
    } else {
      socket.emit("join_room", roomId);
      console.log({ roomId, name });
    }
  };
  return (
    <div className="App">
      <h3>join room</h3>
      <input
        type="text"
        placeholder="harsh"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="room id"
        onChange={(e) => setRoomId(e.target.value)}
        style={{ margin: "0px 10px" }}
      />
      <button onClick={joinRoom}>join room</button>
      <Chat socket={socket} room={roomId} username={name} />
      {/* <div>{`${name} ${roomId}`}</div> */}
    </div>
  );
}

export default App;
