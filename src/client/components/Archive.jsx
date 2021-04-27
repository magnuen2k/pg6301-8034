import React, { useContext, useEffect, useState } from "react";
import { InboxView } from "./InboxView";
import { UserContext } from "../contexts/context";

export const Archive = ({ messageApi }) => {
  const [userMessages, setUserMessages] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    messageApi.getArchive().then((res) => {
      setUserMessages(res);
    });
  }, []);

  if (!user) {
    return <div className="container">Please log in</div>;
  }

  if (!userMessages) {
    return <div className="container">No messages</div>;
  }

  return (
    <div className="container">
      <h1>Archived messages</h1>
      <InboxView data={userMessages} />
    </div>
  );
};
