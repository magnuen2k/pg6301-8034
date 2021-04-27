import React, { useEffect, useState } from "react";
import { Input } from "./Input";

export const SendMessage = ({ username, onSendMessage, messageApi }) => {
  const [users, setUsers] = useState();
  const [recipient, setRecipient] = useState("");
  const [formData, setFormData] = useState({
    to: [],
    message: "",
    from: username,
  });

  useEffect(() => {
    messageApi.getUsersToMessage().then((res) => setUsers(res));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRecipient = (e) => {
    let newTo = formData.to;
    newTo.push(recipient);
    e.preventDefault();
    setFormData({ ...formData, to: newTo });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSendMessage(formData);
  };

  return (
    <div className="sendMessageWrapper">
      <div className="recipients">Sender: {formData && formData.from}</div>
      <div className="recipients">
        Recipients: {formData && formData.to.map((u) => u + " ")}
      </div>
      <hr />
      <form className="addRecipient" onSubmit={handleAddRecipient}>
        <p>Chose who you want to send a message to</p>
        <label>
          Pick recipients
          <select
            value={recipient}
            name="recipients"
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="" disabled>
              --------
            </option>
            {users &&
              users.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
          </select>
          <Input
            name="recipient"
            label="Type recipient"
            handleChange={(e) => setRecipient(e.target.value)}
          />
        </label>
        <button className="recipientBtn" type="submit">
          +
        </button>
        <hr />
      </form>
      <form className="sendMessage" onSubmit={handleSubmit}>
        <label>
          Your message: <textarea name="message" onChange={handleChange} />
        </label>
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};
