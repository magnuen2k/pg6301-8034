import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { useHistory } from "react-router";
import { Message } from "./Message";

export const Inbox = ({ messageApi }) => {
  const { user } = useContext(UserContext);
  const [inbox, setInbox] = useState();
  const [isInbox, setIsInbox] = useState(true);
  console.log(user);

  useEffect(() => {
    getInbox();
  }, []);

  const getInbox = async () => {
    const inbox = await messageApi.getInbox();
    setInbox(inbox);
    console.log(inbox);
  };

  const toggleView = () => {
    setIsInbox((prevIsInbox) => !prevIsInbox);
    console.log(isInbox);
  };

  const sendMessage = async (formData) => {
    console.log(formData);
    const res = await messageApi.sendMessage(formData);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Inbox</h1>
          <button onClick={toggleView}>Send a new message</button>
          {isInbox ? (
            <div>
              {inbox ? (
                inbox.map((msg) => <div key={msg.mid}>{msg.content}</div>)
              ) : (
                <div>No messages</div>
              )}
            </div>
          ) : (
            <Message username={user.username} onSendMessage={sendMessage} />
          )}
        </div>
      ) : (
        <div>You have to log in to see your inbox</div>
      )}
    </div>
  );
};
