import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext, WsContext } from "../contexts/context";
import { useWs } from "../hooks/useWs";

export const Home = () => {
  const { user } = useContext(UserContext);
  const { ws } = useContext(WsContext);

  if (!user) {
    return <div className="container">Sign in to use out service!</div>;
  }

  return (
    <div className="container">
      <h1>Welcome back, {user.firstName}</h1>
      <p>App description</p>
    </div>
  );
};
