import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/context";

export const useWs = () => {
  const [ws, setWs] = useState();
  const [notify, setNotify] = useState([]);
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
      const { message } = JSON.parse(event.data);
      setNotify((notify) => [...notify, { message }]);
      console.log(message);
    };
    ws.onclose = (event) => {
      console.log("Closed");
      connected.current = false;
    };
    ws.onerror = (event) => {
      console.log(event);
    };
  };
  useEffect(() => connect(), []);

  const sendData = (data) => {
    console.log("sender til server hvem user er");
    ws.send(data);
  };
  return { sendData, notify };
};
