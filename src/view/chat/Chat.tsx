import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import { User } from "../../model/userModel";
const API_URL = process.env.REACT_APP_API_URL;
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUsers] = useState<User[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const getUsers = async () => {
    axios
      .get(`${API_URL}/get-all-users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error:", err));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    getUsers();

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
    let botReply = "";
    if (input === "user") {
      botReply = user[0].username;
    }
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botReply ? botReply : "Hello! How can I help you?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      <h3>Chat UI</h3>
      <div
        className="chat-container"
        style={{
          width: "100%",
          maxWidth: "100%",
          // margin: "20px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          ref={chatBoxRef}
          style={{
            height: "45rem",
            flex: 1,
            overflowY: "auto",
            //   border: "1px solid #ccc",
            paddingRight: "5rem",
            //   marginBottom: "10px",
            borderRadius: "10px",
            scrollbarWidth: "thin" /* Firefox */,
            scrollbarColor: "#555 #1e1e1e",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "5px",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      {/* ช่อง Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          background: "#222",
          borderRadius: "10px",
          marginTop: "10px",
          width: "100%",
          maxWidth: "25rem",
          height: "100%",
          maxHeight: "5rem",
        }}
      >
        <InputText
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            background: "#333",
            border: "none",
            borderRadius: "5px",
            color: "white",
            height: "100%",
            maxHeight: "5rem",
          }}
        />
      </div>
    </>
  );
};

export default Chat;
