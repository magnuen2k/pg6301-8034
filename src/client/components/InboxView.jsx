import React, { useContext } from "react";
import { UserContext } from "../contexts/context";

export const InboxView = ({ data, onReply, onReplyAll, onDelete }) => {
  const { user } = useContext(UserContext);
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
                  <div>
                    From: {msg.from} ({msg.time}) | Message: {msg.content}
                  </div>
                  <div>
                    To: {user.username}{" "}
                    {msg.to && msg.to.map((u) => u.to + " ")}
                  </div>
                </div>
                {onReply ? (
                  <div>
                    <button onClick={() => onReply(msg.mid, msg.from)}>
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        console.log(msg.to.map((u) => u.to));
                        onReply(
                          msg.mid,
                          msg.from,
                          msg.to.map((u) => u.to)
                        );
                      }}
                    >
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
