import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

type Chat = {
  sender: string;
  message: string;
};

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (message) => {
      console.log(message);
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sender = location.port === "5173" ? "P" : "Z";
    socket.emit("message", { sender, message });
    setMessage("");
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <h3>ChatApp</h3>
          <ul className="content">
            {chat.map((message, index) => (
              <li
                key={index}
                style={{
                  background:
                    message.sender === "P" ? "lightblue" : "lightgreen",
                }}
              >
                <div>{message.sender}</div>
                <span>{message.message}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              value={message}
              placeholder="Enter your message"
              onChange={handleChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
