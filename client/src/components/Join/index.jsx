import { useRef } from "react";
import styles from "../../styles/join.module.css";
import io from "socket.io-client";

const Join = ({ setChatVisibility, setSocket }) => {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("http://localhost:8080");
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className={styles.joinContainer}>
      <h1>Entrar</h1>
      <input type="text" ref={usernameRef} placeholder="Nome de usuário" />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default Join;
