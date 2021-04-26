import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/context";
import { Auth } from "./components/Auth";
import { Nav } from "./components/Nav";

export const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    // fetch user
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Nav />
        <Switch>
          <Route path={"/"} exact>
            <div>HOME</div>
          </Route>
          <Route path={"/auth"}>
            <Auth />
          </Route>
          <Route path={"/inbox"}>
            <Auth />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
