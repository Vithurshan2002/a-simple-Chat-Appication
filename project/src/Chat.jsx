import React, { useEffect, useState } from "react";
const Chat = ({ socket, username, room, setshowchat }) => {
  const [currentmessage, setcurrentmessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentmessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentmessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      await socket.emit("send_message", messageData);
      setMessageList((premessages) => [...premessages, messageData]);
    }
    setcurrentmessage("");
  };

  useEffect(() => {
    socket.on("receivemessage", (data) => {
      setMessageList((premessages) => [...premessages, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col border-2 border-emerald-600 rounded-2xl shadow-lg w-full max-w-lg mx-auto h-[70vh] bg-white overflow-hidden">
      <div className="flex justify-center  relative items-center py-3 bg-emerald-700 text-white font-extrabold text-2xl">
        Live Chat
        <div
          onClick={() => {
            setshowchat(false);
          }}
          className="absolute right-2 text-sm  cursor-pointer hover:bg-emerald-800 transition-all border rounded px-1 py-1 font-medium"
        >
          Leave Room
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        {messageList.map((messagedetails, id) => {
          return (
            <div
              key={id}
              className={`py-1 w-full flex ${
                messagedetails.author === username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div>
                <div
                  className={`font-bold text-white px-2 py-1 rounded-md ${
                    messagedetails.author === username
                      ? "bg-emerald-600"
                      : "bg-gray-500"
                  }`}
                >
                  {messagedetails.message}
                </div>
                <div className="flex items-center space-x-2 font-semibold text-xs text-gray-600 justify-end">
                  <div className="font-bold">
                    {messagedetails.author === username
                      ? "you"
                      : messagedetails.author}
                  </div>
                  <div>{messagedetails.time}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center w-full border-t bg-white px-3 py-2">
        <input
          type="text"
          value={currentmessage}
          onChange={(e) => setcurrentmessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Type your message..."
          onKeyPress={(e)=>{e.key==="Enter"&& sendMessage()}}  //now we can send meage by enter the enter key also
        />
        <button
          className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg px-4 py-2 transition-all"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
