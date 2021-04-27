import React from "react";

export const ErrorView = ({ error }) => {
  return <div>An error has occurred: {error.toString()}</div>;
};
