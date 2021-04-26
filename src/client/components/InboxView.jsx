import React, { useState } from "react";

export const InboxView = ({ data, onReply, onDelete }) => {
  return (
    <div className="container">
      <div>
        {data &&
          data.map((msg) => (
            <div className="message" key={msg.mid}>
              From: {msg.from} ({msg.time}) | Message: {msg.content}
              {onReply ? (
                <div>
                  <button onClick={() => onReply(msg.mid, msg.from)}>
                    Reply
                  </button>
                  <button onClick={() => onDelete(msg.mid)}>Delete</button>
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