import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { SendMessage } from "./SendMessage";
import { InboxView } from "./InboxView";
import { useHistory } from "react-router-dom";

export const Inbox = ({ messageApi }) => {
  const { user } = useContext(UserContext);
  const [isInbox, setIsInbox] = useState(true);
  const [data, setData] = useState([]);
  const [userMessages, setUserMessages] = useState();
  const history = useHistory();

  useEffect(() => {
    messageApi.getInbox().then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, [isInbox]);

  const toggleView = () => {
    setIsInbox((prevIsInbox) => !prevIsInbox);
  };

  const sendMessage = async (formData) => {
    await messageApi.sendMessage(formData);
    toggleView();
  };

  const reply = async (mid, reply, to) => {
    const formData = {
      message: reply,
      from: user.username,
      replyTo_id: mid,
      to,
    };
    const res = await messageApi.replyToMessage(formData);
    console.log(res);
  };

  const handleSentMessages = async () => {
    const userMessages = await messageApi.getUserMessages();
    setUserMessages(userMessages);
  };

  if (!user) {
    return "log in please";
  }

  if (!data) {
    return "loading";
  }

  return (
    <div className="container">
      <h1>{user.username}'s Inbox</h1>
      <button onClick={toggleView}>
        {!isInbox ? "Return to inbox" : "Send new message"}
      </button>
      {isInbox ? (
        <InboxView data={data} onReply={reply} />
      ) : (
        <SendMessage
          username={user.username}
          onSendMessage={sendMessage}
          messageApi={messageApi}
        />
      )}
      {userMessages && <InboxView data={userMessages} />}
      <div onClick={handleSentMessages}>
        Click here to see your sent messages
      </div>
    </div>
  );
};
