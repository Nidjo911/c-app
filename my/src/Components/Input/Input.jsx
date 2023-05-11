import { useState } from 'react';
import './Input.css';
/* import { Button } from 'bootstrap'; */



export default function Input(props) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setText("");
    props.onSendMessage(text);
  }

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus
        />
        <button><i class="bi bi-send"></i>Send</button>
        <button type="button" class="btn btn-success">
        <i class="bi bi-send"></i>
          Send
        </button>
      </form>
    </div>
  );
}