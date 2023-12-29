import React, { useEffect, useMemo, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
function Chat({socket, username, roomid}) {
    const [currentMessage, setcurrentMessage] = useState("")
    const [Messagelist, setMessageList] = useState([]);
    const sendMessage = async () => {
        // making the function asynchronous ensures that the data is sent completely before moving forward for further operations
        if(currentMessage !== ""){
            const messageData = {
                room: roomid,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            setMessageList((list) => [...list, messageData]);
            await socket.emit("send_message", messageData);
            setcurrentMessage("");
        }
    }

    useEffect(()=>{
        socket.on("recieve_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        })
        return () => socket.removeListener('recieve_message')
    }, [socket])
  return (
    <divc className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>

            {Messagelist.map((messagecontent) => {
                return (
                <div className="message" id={username === messagecontent.author ? "you" : "other"}>
                    <div className="message-content">
                        <p>{messagecontent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p id="time">{messagecontent.time}</p>
                        <p id="author">{messagecontent.author}</p>
                    </div>
                </div>
                )
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" 
                value = {currentMessage}
                placeholder="Type any message..." 
                onChange={(event) => {
                    setcurrentMessage(event.target.value)
                }}
                onKeyDown ={(event) => {
                    event.key === "Enter" && sendMessage()
                }} />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </divc>
  )
}

export default Chat