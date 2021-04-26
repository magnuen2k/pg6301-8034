import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/context";
import { useHistory } from "react-router-dom";

export const Nav = ({ authApi }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  /* const signOut = async () => {
        const res = await authApi.signOut();
        if (res === "done") {
            setUser(undefined);
            history.push("/");
        }
    };*/

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "2rem 4rem",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
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
