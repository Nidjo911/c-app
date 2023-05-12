import { nanoid } from 'nanoid';

import './App.css';
/* import './App.scss'; */
import { Messages, Input } from './Components';
import { useState, useEffect } from 'react';


  function randomName() {
    const primary = 'User';
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${primary}${randomNumber}`
  }


function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function App() {

  const [messages, setMessages] = useState([
    {
      data: "Welcome to chat app!",
      member: {
        color: "blue",
        username: "chatbot",
        clientData: {
          username: '',
          color: '',
          id: nanoid()
        }
      },
      timestamp: new Date()
    }
  ]);

  const [member] = useState({
    username: randomName(),
    color: randomColor(),
    id: nanoid()
  });

  
  const [drone, setDrone] = useState(null);



  useEffect(() => {
    const myDrone = new window.Scaledrone("ukCx6gCBe22KWrvS", {
      data: member
    });

    setDrone (myDrone);
  }, [])

  useEffect(() => {
    if (drone) {

    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }

    const room = drone.subscribe("observable-room");
    
    room.on('message', (msssg) => {
      console.log(msssg);
      setMessages(prevMessages => [...prevMessages,
        { data: msssg.data.message,
          member: msssg.member.clientData,
          timestamp: msssg.timestamp,
          id: msssg.id
         }]);
      console.log([messages]);
    } )

  });

  }
  }, [drone]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message: { message }

    });

  }

  return (
    <div className='App'>

      <div className='App-header'>
        <h1>My Chat App</h1>
      </div>

      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );

}
