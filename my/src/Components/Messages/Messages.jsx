import './Messages.css';

export default function Messages(props) {

  function renderMessage(message) {
    const { member, data, timestamp } = message;

    const { currentMember } = props;
    const messageFromMe = message.member.id === currentMember.id;
    const className = messageFromMe
      ? "klasa-poruka trenutni-korisnik"
      : "klasa-poruka";


    const formattedTimestamp = new Date(timestamp * 1000).toLocaleString("en-US");

    return (
      <li className={className} key={data.id}>

        <span
          className="boja-korisnika"
          style={{ backgroundColor: member.color }}
        />

        <div className="sadrzaj-poruke">
          <div className="korisnicko-ime"> { member.username }</div>
          <span className="tekst-poruke">{ data }</span>

          {!! timestamp && 
          <span className="tekst-poruke">{ formattedTimestamp }</span>  }
        </div>
      
      </li>

    );
  };

  return (
    <>

    <ul className="popis-poruka">
      
      {props.messages.map((m) => renderMessage(m ))}
    </ul>
    </>
  )
};