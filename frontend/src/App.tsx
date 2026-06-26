import { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const joinChat = (name: string) => {
    socket.emit("join", {
      username: name,
    });

    setUsername(name);

    setJoined(true);
  };

  if (!joined) {
    return <Login onJoin={joinChat} />;
  }

  return <Chat username={username} />;
}

export default App;
