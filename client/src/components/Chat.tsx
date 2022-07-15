import React, { useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: any;
  room: number | string;
  username: string;
};

const Chat = ({ socket, room, username }: Props) => {
  console.log(socket);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const sendMessage = async () => {
    if (!currentMessage.trim()) {
      return;
    } else {
      const message = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emmit("send_message", message);
    }
  };
  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" placeholder="Hey..." />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
