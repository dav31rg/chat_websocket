import { useState } from "react";

interface LoginProps {
  onJoin: (username: string) => void;
}

function Login({ onJoin }: LoginProps) {
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!username.trim()) return;

    onJoin(username);
  };

  return (
    <div>
      <h1>Chat WebSocket</h1>

      <input
        type="text"
        placeholder="Tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleJoin}>Entrar</button>
    </div>
  );
}

export default Login;
