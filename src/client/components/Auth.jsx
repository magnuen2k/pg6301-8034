import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext, WsContext } from "../contexts/context";
import { Input } from "./Input";

export const Auth = ({ authApi }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorCode, setErrorCode] = useState();

  const { user, setUser } = useContext(UserContext);
  const { ws } = useContext(WsContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorCode(undefined);
    if (isSignup) {
      // Handle signup
      await doSignUp();
    } else {
      await doSignIn();
    }
  };

  const doSignUp = async () => {
    try {
      const res = await authApi.signUp(formData);
      if (res) {
        // Set user
        setUser(res);
        ws.send(user.username);
        // Redirect user back to home page
        history.push("/");
      }
    } catch (e) {
      setErrorCode(e.response);
    }
  };

  const doSignIn = async () => {
    try {
      const res = await authApi.signIn(formData);
      if (res) {
        // Set user
        setUser(res);
        console.log(res.username);
        ws.send(res.username);
        // Redirect user back to home page
        history.push("/");
      }
    } catch (e) {
      console.log(e);
      setErrorCode(e.response);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // Find a way to clear input fields
  };

  const googleLogin = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <p>You are already logged in</p>
          <Link to={"/"}>Go back to home page</Link>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type="password"
            />
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
                <Input
                  name="email"
                  label="Email"
                  handleChange={handleChange}
                  type="email"
                />
              </>
            )}
            <button id="submitBtn" type="submit">
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button id="switch" onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Dont have an account yet? Sign Up"}
          </button>
        </div>
      )}
      {errorCode && (
        <div>
          {errorCode === 400
            ? "Fill out the form"
            : "Wrong username or password"}
        </div>
      )}
      <div className="googleLogin" onClick={googleLogin}>
        <p>
          Click here to login with <strong>GOOGLE</strong>
        </p>
      </div>
    </div>
  );
};
