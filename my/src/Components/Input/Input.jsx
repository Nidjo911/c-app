import { useState } from 'react';
import './Input.css';

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
          placeholder="Write a message..."
          autoFocus
        />
        <button><i class="bi bi-send"></i>Send</button>
      </form>
    </div>
  );
}