import React from "react";

export const InboxView = ({ data, onOpenMessage }) => {
  console.log(data);
  return (
    <div className="container">
      <div>
        {data &&
          data.map((msg) => (
            <div className="message" key={msg.mid}>
              From: {msg.from} ({msg.time}) | Message: {msg.content}
              {onOpenMessage ? (
                <button onClick={() => onOpenMessage(msg.mid)}>Reply</button>
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
