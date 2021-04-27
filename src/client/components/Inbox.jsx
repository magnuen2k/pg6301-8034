import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { SendMessage } from "./SendMessage";
import { InboxView } from "./InboxView";
import { useHistory } from "react-router-dom";

export const Inbox = ({ messageApi, notify }) => {
  const { user } = useContext(UserContext);
  const [isInbox, setIsInbox] = useState(true);
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    messageApi.getInbox().then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, [isInbox, notify]);

  const toggleView = () => {
    setIsInbox((prevIsInbox) => !prevIsInbox);
  };

  const sendMessage = async (formData) => {
    await messageApi.sendMessage(formData);
    toggleView();
  };

  const reply = async (mid, to) => {
    const formData = {
      from: user.username,
      replyTo_id: mid,
      to: [to],
    };
    history.push("/inbox/reply", { params: formData });
  };

  const replyAll = async (mid, to) => {
    const newTo = [to];
    console.log(typeof newTo);
    // have ot get all users that received this message and add to "to"
    const formData = {
      from: user.username,
      replyTo_id: mid,
      to: newTo,
    };
    history.push("/inbox/reply", { params: formData });
  };

  const deleteMessage = async (mid) => {
    console.log("deleting user from message: " + mid);
    await messageApi.deleteMessage(mid);
    history.push("/");
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
        <InboxView
          data={data}
          onReplyAll={replyAll}
          onReply={reply}
          onDelete={deleteMessage}
        />
      ) : (
        <SendMessage
          username={user.username}
          onSendMessage={sendMessage}
          messageApi={messageApi}
        />
      )}
    </div>
  );
};
