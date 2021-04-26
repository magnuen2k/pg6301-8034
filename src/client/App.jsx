import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/context";
import { Auth } from "./components/Auth";
import { Nav } from "./components/Nav";
import { fetchJsonData } from "./api/apiHandler";
import { Inbox } from "./components/Inbox";
import { Message } from "./components/Message";

export const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    authApi.getUser().then((res) => setUser(res));
  }, []);

  const authApi = {
    getUser: async () => {
      return await fetchJsonData("/api/auth/getUser");
    },
    signOut: async () => {
      return await fetchJsonData("/api/auth/signOut");
    },
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Nav authApi={authApi} />
        <Switch>
          <Route path={"/"} exact>
            <div>HOME</div>
          </Route>
          <Route path={"/auth"}>
            <Auth authApi={authApi} />
          </Route>
          <Route path={"/inbox"}>
            <Inbox />
          </Route>
          <Route path={"/message"}>
            <Message />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
