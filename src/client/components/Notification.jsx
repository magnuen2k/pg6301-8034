import React, { useEffect, useState } from "react";

export const Notification = ({ notify }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(notify);
    if (notify) {
      setTimeout(() => setData([]), 5000);
    }
  }, [notify]);

  return (
    <div className={"container"}>
      {data.map((notification, index) => (
        <p key={index}>{notification.message}</p>
      ))}
    </div>
  );
};
