import React, { useEffect, useState } from "react";
import { Input } from "./Input";

export const Message = ({ username, onSendMessage, messageApi }) => {
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
    console.log(recipient);
    let newTo = formData.to;
    newTo.push(recipient);
    e.preventDefault();
    setFormData({ ...formData, to: newTo });
    // Find clean way to remove state after added a recipient
    //setRecipient("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSendMessage(formData);
  };

  return (
    <>
      <div>RECIPIENTS: {formData && formData.to.map((u) => u)}</div>
      <form onSubmit={handleAddRecipient}>
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
        </label>
        <Input
          name="recipient"
          label="Type recipient"
          handleChange={(e) => setRecipient(e.target.value)}
        />
        <button type="submit">Add recipient</button>
      </form>
      <form onSubmit={handleSubmit}>
        <Input name="message" label="message" handleChange={handleChange} />
        <button type="submit">Send message</button>
      </form>
    </>
  );
};
