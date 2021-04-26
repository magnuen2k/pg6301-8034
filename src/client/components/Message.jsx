import React, { useState } from "react";
import { Input } from "./Input";
import { postJsonData } from "../api/apiHandler";

export const Message = ({ username, onSendMessage }) => {
  const [recipient, setRecipient] = useState("");
  const [formData, setFormData] = useState({
    to: [],
    message: "",
    from: username,
  });

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
    <>
      <div>Recipients: {formData && formData.to.map((u) => u)}</div>
      <form onSubmit={handleAddRecipient}>
        <Input
          name="to"
          label="to"
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
