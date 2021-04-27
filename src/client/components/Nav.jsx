import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, WsContext } from "../contexts/context";
import { useHistory } from "react-router-dom";

export const Nav = ({ authApi }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  //const { ws } = useContext(WsContext);

  const signOut = async () => {
    const res = await authApi.signOut();
    if (res === "done") {
      setUser(undefined);
      //ws.close();
      history.push("/");
    }
  };

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/outbox">Outbox</Link>
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
