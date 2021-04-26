import React, { useState } from "react";
import { Input } from "./Input";

export const InboxView = ({ data, onReply }) => {
  const [reply, setReply] = useState("");
  return (
    <div className="container">
      <div>
        {data &&
          data.map((msg) => (
            <div className="message" key={msg.mid}>
              From: {msg.from} ({msg.time}) | Message: {msg.content}
              {onReply ? (
                <div>
                  <Input
                    name="recipient"
                    label="Type recipient"
                    handleChange={(e) => setReply(e.target.value)}
                  />
                  <button onClick={() => onReply(msg.mid, reply, msg.from)}>
                    Reply
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
