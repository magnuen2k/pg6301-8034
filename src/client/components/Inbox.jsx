import React, { useContext } from "react";
import { UserContext } from "../contexts/context";
import { useHistory } from "react-router";

export const Inbox = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const newMessage = () => {
    history.push("/message");
  };
  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Inbox</h1>
          <button onClick={newMessage}>Send a new message</button>
          <div>Map over all messages where this user is a receiver</div>
          <div>Map over all messages where this user is a receiver</div>
          <div>Map over all messages where this user is a receiver</div>
        </div>
      ) : (
        <div>You have to log in to see your inbox</div>
      )}
    </div>
  );
};
