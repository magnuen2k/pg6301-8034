import React, { useState } from "react";
import { Input } from "./Input";
import { postJsonData } from "../api/apiHandler";

export const Message = ({ username }) => {
  const [formData, setFormData] = useState({
    to: "",
    message: "",
    from: username,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postJsonData("api/messages/sendMessage", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="to" label="to" handleChange={handleChange} />
      <Input name="message" label="message" handleChange={handleChange} />
      <button type="submit">Send message</button>
    </form>
  );
};
