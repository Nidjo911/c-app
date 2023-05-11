import './App.css';
/* import './App.scss'; */
import { Messages, Input } from './Components';
import { useState, useEffect } from 'react';


function membersName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;

}

  function randomName() {
    const primary = 'User';
    const randomNumber = Math.floor(Math.random() * 100000);
    console.log(randomNumber);
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
        id: "999999"
      },
      timestamp: new Date()
    }
  ]);

  const [member] = useState({
    username: randomName(),
    color: randomColor()
  });

  const [drone] = useState(new window.Scaledrone("ukCx6gCBe22KWrvS", {
    data: member
  }));

  useEffect(() => {

    if (drone) {

    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }

    const room = drone.subscribe("observable-room");
    
    room.on('message', (msssg) => {
      console.log(msssg);
      setMessages(prevMessages => [...prevMessages, { data: msssg.data.message, member, timestamp: msssg.timestamp }]);
    } )


    /* probni dio */

/*     room.on('members', function(members) {
    }); */

  });

  }
  }, [drone]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message: { message }

      /* ignore ovo dolje, member vec je u messageu embeddan */
      /*       member, message */
    });
    
/*     setMessages(prevMessages => [...prevMessages, { text: message, member }]); */
  }

  return (
    <div className='App'>

      <div className='App-header'>
        <h1 className='Ni'>My Chat App</h1>
      </div>

      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );

}
