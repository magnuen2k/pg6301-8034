import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { useHistory } from "react-router";

export const Inbox = ({ messageApi }) => {
  const { user } = useContext(UserContext);
  const [inbox, setInbox] = useState();
  const history = useHistory();
  console.log(user);

  useEffect(() => {
    getInbox();
  }, []);

  const getInbox = async () => {
    const inbox = await messageApi.getInbox();
    setInbox(inbox);
    console.log(inbox);
  };

  const newMessage = () => {
    history.push("/message");
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Inbox</h1>
          <button onClick={newMessage}>Send a new message</button>
          {inbox && inbox.map((msg) => <div key={msg.mid}>{msg.content}</div>)}
        </div>
      ) : (
        <div>You have to log in to see your inbox</div>
      )}
    </div>
  );
};
