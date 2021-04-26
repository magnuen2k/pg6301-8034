import React, { useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/context";
import { WsContext } from "./contexts/context";
import { Auth } from "./components/Auth";
import { Nav } from "./components/Nav";
import { fetchJsonData, postJsonData, deleteJsonData } from "./api/apiHandler";
import { Inbox } from "./components/Inbox";
import { Outbox } from "./components/Outbox";
import { Home } from "./components/Home";
import { Reply } from "./components/Reply";
import { useWs } from "./hooks/useWs";

export const App = () => {
  const ws = useWs();
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
    getUserMessages: async () => {
      return await fetchJsonData("/api/messages/getUserMessages");
    },
    replyToMessage: async (formData) => {
      return await postJsonData("/api/messages/reply", formData);
    },
    deleteMessage: async (mid) => {
      return await deleteJsonData(`/api/messages/delete/${mid}`);
    },
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <WsContext.Provider value={{ ws }}>
          <Nav authApi={authApi} />
          <Switch>
            <Route path={"/"} exact>
              <Home />
            </Route>
            <Route path={"/auth"}>
              <Auth authApi={authApi} />
            </Route>
            <Route path={"/inbox"} exact>
              <Inbox messageApi={messageApi} />
            </Route>
            <Route path={"/outbox"}>
              <Outbox messageApi={messageApi} />
            </Route>
            <Route path={"/inbox/reply"}>
              <Reply messageApi={messageApi} />
            </Route>
          </Switch>
        </WsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
