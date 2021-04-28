import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/context";
import { SendMessage } from "./SendMessage";
import { InboxView } from "./InboxView";
import { useHistory } from "react-router-dom";
import { LoadingView } from "./LoadingView";

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

  const reply = async (mid, to, otherRecipients) => {
    let newTo = [];
    if (otherRecipients) {
      newTo = otherRecipients;
    }
    if (!newTo.includes(to)) {
      newTo.push(to);
    }
    const formData = {
      from: user.username,
      replyTo_id: mid,
      to: newTo,
    };
    history.push("/inbox/reply", { params: formData });
  };

  const deleteMessage = async (mid) => {
    await messageApi.deleteMessage(mid);
    history.push("/");
  };

  if (!user) {
    return <div className="container">Please log in</div>;
  }

  if (!data) {
    return <LoadingView />;
  }

  return (
    <div className="container">
      <h1>{user.username}'s inbox</h1>
      <button onClick={toggleView}>
        {!isInbox ? "Return to inbox" : "Send new message"}
      </button>
      {isInbox ? (
        <InboxView data={data} onReply={reply} onDelete={deleteMessage} />
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
