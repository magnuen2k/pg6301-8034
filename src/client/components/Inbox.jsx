import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { SendMessage } from "./SendMessage";
import { useLoading } from "../hooks/useLoading";
import { InboxView } from "./InboxView";

export const Inbox = ({ messageApi }) => {
  const { user } = useContext(UserContext);
  const [isInbox, setIsInbox] = useState(true);
  const { loading, data, error } = useLoading(() => messageApi.getInbox());

  const toggleView = () => {
    setIsInbox((prevIsInbox) => !prevIsInbox);
  };

  const sendMessage = async (formData) => {
    await messageApi.sendMessage(formData);
    toggleView();
  };

  const openMessage = (mid) => {
    console.log(mid);
  };

  if (error) {
    return "error view here";
  }

  if (!user) {
    return "log in please";
  }

  if (!data || loading) {
    return "loading";
  }

  return (
    <div className="container">
      <h1>{user.username}'s Inbox</h1>
      <button onClick={toggleView}>Return to inbox</button>
      {isInbox ? (
        <InboxView data={data} onOpenMessage={openMessage} />
      ) : (
        <SendMessage
          username={user.username}
          onSendMessage={sendMessage}
          messageApi={messageApi}
        />
      )}
      <div>Click here to see your sent messages</div>
    </div>
  );
};
