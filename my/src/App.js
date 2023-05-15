import { nanoid } from 'nanoid';
import './App.css';
import { Messages, Input, Header, Members } from './Components';
import { useState, useEffect } from 'react';

export default function App() {

  function randomName() {
    const primary = 'User';
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${primary}${randomNumber}`
  }

  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

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
      },
      /* test dodatan property u poruci */
      id: nanoid()

    }
  ]);

  const [member] = useState({
    username: randomName(),
    color: randomColor(),
    id: nanoid()
  });



  const [drone, setDrone] = useState(null);

  const [mems, setmembersArr] = useState([]);
  
  console.log('mems', mems);

  useEffect(() => {
    const myDrone = new window.Scaledrone("s5gXuXATfV67AugL", {
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
        room.on("message", (msssg) => {
          console.log(msssg);
          setMessages(prevMessages => [...prevMessages,
          {
            data: msssg.data.message,
            member: msssg.member.clientData,
            timestamp: msssg.timestamp,
            id: msssg.id
          }]);
        })


        room.on('members', data => {
          console.log('data', data)

          setmembersArr([...data])
        });

        room.on("member_join", function (member) {
          setmembersArr(prevM => [member, ...prevM]);
          
          setMessages(prevMessages => [...prevMessages,
          {
            data: `${member.clientData.username} has joined the chat`,
            member: member.clientData,
            timestamp: false,
            id: nanoid(),
          }]);

        })

        room.on("member_leave", function (member) {
          setmembersArr(prevM => {
            return prevM.filter(filtered => filtered.id !== member.id);
          });

          setMessages(prevMessages => [...prevMessages,
          {
            data: `${member.clientData.username} has left the chat`,
            member: member.clientData,
            timestamp: false,
            id: nanoid(),
          }]);

        })
      });

    }
  }, [drone, mems]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message: { message }
    });
  }

  const unsubscribe = () => {
    drone.close();
    alert('The drone connection is closed! Please refresh the web to continue. You are still visible as an online user!');
    console.log('button clicked');
  }

  const [on, setOn] = useState(false)

  const hide = () => {
    setOn( toggle => !toggle);

  }

  return (

    <div className='Aplikacija'>
      <Header currentMember={member} close={unsubscribe} toggle={hide} />
      { !!on && <Members memberList={mems} />}
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>

  );

}
