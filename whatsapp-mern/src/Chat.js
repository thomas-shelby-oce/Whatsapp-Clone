import React from 'react'
import { IconButton, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'
import "./Chat.css"

function Chat({messages}) {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new",{
      message:input,
      name:"Demo app",
      timestamp:"Just Now",
      received: false
    })
    setInput("");
  }
    return (
        <div className="chat">
            <div className="chat-header">
               <Avatar />
               <div className="chat-headerInfo">
                   <h3>Room Name</h3>
                   <p>Last Seen...</p>
               </div>
               <div className="chat-headerRight">
                  <IconButton>
                      <SearchIcon />
                  </IconButton>
                  <IconButton>
                      <AttachFileIcon />
                  </IconButton>
                  <IconButton>
                      <MoreVertIcon />
                  </IconButton>
               </div>
            </div>
            <div className="chat-body">
              {messages.map(message => {
                <p className={`chat-message ${message.received && "chat-receiver"}`}>
                <span className="chat-name">{messages.name}</span>
                   {message.message}
                <span className="time-stamp">{message.timestamp}</span>
              </p>
              })}
              <p className="chat-message chat-receiver">
                <span className="chat-name">Sonny</span>
                   This is a message
                <span className="time-stamp">{new Date().toLocaleTimeString}</span>
              </p>
              <p className="chat-message">
                <span className="chat-name">Sonny</span>
                   This is a message
                <span className="time-stamp">{new Date().toLocaleTimeString}</span>
              </p>
            </div>
            <div className="chat-footer">
              <EmojiEmotionsIcon />
              <form>
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a Message" type="text" />
                <button onClick={sendMessage} type="submit">
                  Send a Message
                </button>
                <MicIcon />
              </form>
            </div>
        </div>
    )
}

export default Chat
