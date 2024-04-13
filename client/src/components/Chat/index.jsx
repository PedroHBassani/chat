import { useEffect, useRef, useState } from "react";
import styles from "../../styles/chat.module.css";

const Chat = ({ socket }) => {
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    socket.on("get_messages", (messages) => {
      setMessageList(messages);
    });

    socket.on("receive_message", (message) => {
      setMessageList((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("get_messages");
    };
  }, []);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    messageRef.current.value = "";
  };

  return (
    <>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messageList.map((message, index) => (
            <div className={styles.message} key={index}>
              <p>{message.user}</p>
              <span>{message.text}</span>
              {
                // if is the last message, show the date
                index !== messageList.length - 1 && (
                  <div className={styles.divisor} />
                )
              }
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <input type="text" placeholder="Mensagem" ref={messageRef} />
          <button onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
