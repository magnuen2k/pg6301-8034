import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { Message } from "./Message";

export const Inbox = ({ messageApi }) => {
  const { user } = useContext(UserContext);
  const [inbox, setInbox] = useState();
  const [isInbox, setIsInbox] = useState(true);
  console.log(user);

  useEffect(() => {
    messageApi.getInbox().then((res) => {
      setInbox(res);
    });
  }, [isInbox]);

  const toggleView = () => {
    setIsInbox((prevIsInbox) => !prevIsInbox);
    console.log(isInbox);
  };

  const sendMessage = async (formData) => {
    console.log(formData);
    await messageApi.sendMessage(formData);
    toggleView();
  };

  const openMessage = (mid) => {
    console.log(mid);
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>{user.username}'s Inbox</h1>
          <button onClick={toggleView}>
            {isInbox ? "Send a new message" : "Return to inbox"}
          </button>
          {isInbox ? (
            <div>
              {inbox ? (
                inbox.map((msg) => (
                  <div onClick={() => openMessage(msg.mid)} key={msg.mid}>
                    {msg.content}
                  </div>
                ))
              ) : (
                <div>No messages</div>
              )}
            </div>
          ) : (
            <Message
              username={user.username}
              onSendMessage={sendMessage}
              messageApi={messageApi}
            />
          )}
        </div>
      ) : (
        <div>You have to log in to see your inbox</div>
      )}
    </div>
  );
};
