import React, { useContext } from "react";
import { UserContext } from "../contexts/context";

export const InboxView = ({ data, onOpenMessage }) => {
  const { user } = useContext(UserContext);
  console.log(data);
  return (
    <div className="container">
      <div>
        {data &&
          data.map((msg) => (
            <div key={msg.mid}>
              From: {msg.from} ({msg.time}) | Message: {msg.content}
              <button onClick={() => onOpenMessage(msg.mid)}>Reply</button>
            </div>
          ))}
      </div>
    </div>
  );
};
