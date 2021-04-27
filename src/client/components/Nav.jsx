import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/context";
import { useHistory } from "react-router-dom";

export const Nav = ({ authApi, notify }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const signOut = async () => {
    const res = await authApi.signOut();
    if (res === "done") {
      setUser(undefined);
      history.push("/");
    }
  };

  return (
    <nav className="navigation">
      <ul>
        {notify.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/outbox">Outbox</Link>
        </li>
        <li>
          <Link to="/archive">Archive</Link>
        </li>
        {!user ? (
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
        ) : (
          <li id="signOut" style={{ cursor: "pointer" }} onClick={signOut}>
            Sign Out
          </li>
        )}
      </ul>
    </nav>
  );
};
