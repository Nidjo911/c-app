import './Members.css';

export default function Members(props) {

  console.log('this is member list from members', props.memberList);

  return (
    <div>
      <span className='textie-text'>Online members: </span>
      <ul className="list-inline">
        {props.memberList.map((value, _) =>
          <li key={value.id}>{value.clientData.username}</li>)}

      </ul>
    </div>
  )
}