import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Input } from "./Input";

export const Reply = ({ messageApi }) => {
  const [reply, setReply] = useState("");
  const location = useLocation();
  const data = location.state.params;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await messageApi.replyToMessage({ ...data, message: reply });
    history.push("/inbox");
  };

  return (
    <div className="container">
      <p>Reply to - {data.to}</p>
      <form onSubmit={handleSubmit}>
        <Input
          name="reply"
          label="Message"
          handleChange={(e) => setReply(e.target.value)}
          type="area"
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};
