import React, { useContext, useEffect, useState } from "react";
import { InboxView } from "./InboxView";
import { UserContext, WsContext } from "../contexts/context";

export const Outbox = ({ messageApi }) => {
  const [userMessages, setUserMessages] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    messageApi.getUserMessages().then((res) => {
      setUserMessages(res);
    });
  }, []);

  if (!user) {
    return <div>Please log in</div>;
  }

  if (!userMessages) {
    return "No messages";
  }

  return <InboxView data={userMessages} />;
};
