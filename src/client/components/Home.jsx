import React, { useContext } from "react";
import { UserContext } from "../contexts/context";

export const Home = () => {
  const { user } = useContext(UserContext);

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
