import React from "react";

export const InboxView = ({ data, onReply, onReplyAll, onDelete }) => {
  return (
    <div className="container">
      <div>
        {data &&
          data
            .slice(0)
            .reverse()
            .map((msg) => (
              <div className="message" key={msg.mid}>
                <div>
                  From: {msg.from} ({msg.time}) | Message: {msg.content}
                </div>
                {onReply ? (
                  <div>
                    <button onClick={() => onReply(msg.mid, msg.from)}>
                      Reply
                    </button>
                    <button onClick={() => onReplyAll(msg.mid, msg.from)}>
                      Reply All
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
