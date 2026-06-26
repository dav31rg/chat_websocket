import "./styles/Chat.css";
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

interface ChatProps {
  username: string;
}

interface Message {
  username: string;
  text: string;
  time: string;
}

function Chat({ username }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<{ socketId: string; username: string }[]>(
    [],
  );

  useEffect(() => {
    socket.on("newMessage", (newMessage: Message) => {
      setMessages((previous) => [...previous, newMessage]);
    });

    socket.on("users", (connectedUsers) => {
      setUsers(connectedUsers);
    });

    return () => {
      socket.off("newMessage");
      socket.off("users");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      username,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="chat-container">
      <aside className="users-panel">
        <h3>Usuarios</h3>

        {users.map((user) => (
          <div key={user.socketId}>🟢 {user.username}</div>
        ))}
      </aside>

      <section className="chat-panel">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.username}</strong>

              <p>{msg.text}</p>

              <small>{msg.time}</small>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            value={message}
            placeholder="Escribe un mensaje..."
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>Enviar</button>
        </div>
      </section>
    </div>
  );
}

export default Chat;
