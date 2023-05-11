import './Messages.css';

export default function Messages(props) {

  function renderMessage(message) {
    const { member, data, timestamp } = message;

    const { currentMember } = props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";


      /* potrebno je popraviti ASAP ovaj formattedTimestamp */
    const formattedTimestamp = new Date(timestamp * 1000).toLocaleString("en-US");/* toLocaleDateString("en-US"); */

    return (
      <li className={className} key={data.id}>
        <span
          className="avatar"
          style={{ backgroundColor: member.color }}
        />
        <div className="Message-content">
          <div className="username"> { member.username }</div>
          <span className="text">{ data }</span>
          <span className="text">{ formattedTimestamp }</span>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      
      {props.messages.map((m) => renderMessage(m ))}
      
    </ul>
  )
};