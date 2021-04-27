import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Notification = ({ notify }) => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setData(notify);
    if (notify) {
      setTimeout(() => setData([]), 5000);
    }
  }, [notify]);

  const handleClick = () => {
    history.push("/inbox");
  };

  return (
    <div className={"container"}>
      {data.map((notification, index) => (
        <div key={index} className="notification">
          <p onClick={handleClick}>{notification.message}</p>
          <p onClick={() => setData([])}>X</p>
        </div>
      ))}
    </div>
  );
};
