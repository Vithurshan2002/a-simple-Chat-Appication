import React from "react";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io("https://a-simple-chat-appication.onrender.com");

const App = () => {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const [showchat, setshowchat] = useState(false);

  const JoinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("Join_Room", room.trim());
      setshowchat(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 p-4">
      {!showchat ? (
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl flex flex-col items-center p-6 border border-blue-300">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Join A Chat</h1>

          <div className="flex flex-col w-full space-y-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="outline-none border border-gray-400 rounded-lg p-2 focus:border-blue-600 transition"
              placeholder="Username..."
            />

            <input
              type="text"
              value={room}
              onChange={(e) => setroom(e.target.value)}
              className="outline-none border border-gray-400 rounded-lg p-2 focus:border-blue-600 transition"
              placeholder="Room ID..."
            />
          </div>
          <div className="flex space-x-3 items-center">
            <button
              onClick={JoinRoom}
              className="mt-5 px-8 py-2 cursor-pointer bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-900 transition duration-300"
            >
              Join
            </button>
             <button
            onClick={()=>{setroom('');setusername('')}}
            className="mt-5 px-8 cursor-pointer py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-red-900 transition duration-300"
          >
            Clear
          </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <Chat
            socket={socket}
            username={username}
            room={room}
            setshowchat={setshowchat}
          />
        </div>
      )}
    </div>
  );
};

export default App;
