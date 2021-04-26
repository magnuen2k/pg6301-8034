import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/context";

export const useWs = () => {
  const [ws, setWs] = useState();
  const connected = useRef(false);

  const connect = () => {
    const ws = new WebSocket("ws://" + window.location.host);
    setWs(ws);
    ws.onopen = (event) => {
      console.log("opened", event);
      connected.current = true;
    };
    ws.onmessage = (event) => {
      console.log("from server", event);
    };
    /*ws.onclose = (event) => {
      console.log("Closed");
      connected.current = false;
    };*/
    ws.onerror = (event) => {
      console.log(event);
    };
  };
  useEffect(() => {
    connect();
  }, []);
  return ws;
};
