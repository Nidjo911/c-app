import { nanoid } from 'nanoid';
import './App.css';
/* import './App.scss'; */
import { Messages, Input, Header } from './Components';
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
          id: nanoid(),
        }
      }

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

    setDrone(myDrone);


  }, [])

  useEffect(() => {

    if (drone) {

      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }

        const room = drone.subscribe("observable-room");

        let arrMem = [member.username];

        room.on('message', (msssg) => {
          console.log(msssg);
          setMessages(prevMessages => [...prevMessages,
          {
            data: msssg.data.message,
            member: msssg.member.clientData,
            timestamp: msssg.timestamp,
            id: msssg.id
          }]);
        })

        room.on("member_join", function (member) {
          setMessages(prevMessages => [...prevMessages,
          {
            data: `${member.clientData.username} has joined the chat`,
            member: member.clientData,
            timestamp: false,
            id: nanoid(),
          }]);

          let newUser = member.clientData.username;
          arrMem.push(newUser);
          console.log(arrMem);
        });

        room.on("member_leave", function (member) {

          setMessages(prevMessages => [...prevMessages,
          {
            data: `${member.clientData.username} has left the chat`,
            member: member.clientData,
            timestamp: false,
            id: nanoid(),
          }]);

          let leftUser = member.clientData.username;

          arrMem = arrMem.filter(a => a !== leftUser);
        })
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

    <div className='Aplikacija'>
      <Header currentMember={member} />
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );

}
