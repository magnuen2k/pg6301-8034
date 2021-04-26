import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/context";
import { Auth } from "./components/Auth";
import { Nav } from "./components/Nav";
import { fetchJsonData, postJsonData } from "./api/apiHandler";
import { Inbox } from "./components/Inbox";

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
    signIn: async (formData) => {
      return await postJsonData("/api/auth/signIn", formData);
    },
    signUp: async (formData) => {
      return await postJsonData("/api/auth/signUp", formData);
    },
  };

  const messageApi = {
    getInbox: async () => {
      return await fetchJsonData("/api/messages/getInbox");
    },
    sendMessage: async (formData) => {
      return await postJsonData("/api/messages/sendMessage", formData);
    },
    getUsersToMessage: async () => {
      return await fetchJsonData("/api/auth/getUsersToMessage");
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
            <Inbox messageApi={messageApi} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
