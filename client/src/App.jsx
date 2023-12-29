import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './components/Chat'

const socket = io.connect("http://localhost:8000")

function App() {
  const [username, setUsername] = useState("")
  const [roomID, setroomID] = useState("")
  const [showchat, setshowchat] = useState(false);
  const JoinRoom = () => {
    if (username !== "" && roomID !== "") {
      // we have to check whether entered username and room id are valid or not

      // next we are going to join a room/chat often called as dm
      socket.emit("Join_Room", roomID);
      setshowchat(true);
    }
  }
  return (
    <>
      <div className='App'>
        {!showchat ? (
          <div className='joinChatContainer'>
            <h3>Join A Chat</h3>
            <input type="text" placeholder='Arunabh...' onChange={(event) => { setUsername(event.target.value) }} />
            <input type="text" placeholder='Room ID...' onChange={(event) => { setroomID(event.target.value) }} />
            <button onClick={JoinRoom}>Join the Room</button>
          </div>
        )
          :
          (<Chat socket={socket} username={username} roomid={roomID} />)
        }
      </div>
    </>
  )
}

export default App
