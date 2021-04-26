import React, { useContext, useEffect, useState } from "react";
import { InboxView } from "./InboxView";
import { UserContext, WsContext } from "../contexts/context";

export const Outbox = ({ messageApi }) => {
  const [userMessages, setUserMessages] = useState();
  const { user } = useContext(UserContext);
  const { ws } = useContext(WsContext);
  console.log(ws);

  useEffect(() => {
    messageApi.getUserMessages().then((res) => {
      setUserMessages(res);
    });
  }, []);

  if (!user) {
    return "please log in";
  }

  if (!userMessages) {
    return "No messages";
  }

  return <InboxView data={userMessages} />;
};
