import React, { useContext } from "react";
import { InboxView } from "./InboxView";
import { UserContext } from "../contexts/context";
import { useLoading } from "../hooks/useLoading";
import { LoadingView } from "./LoadingView";
import { ErrorView } from "./ErrorView";

export const Archive = ({ messageApi }) => {
  const { loading, data, error } = useLoading(() => messageApi.getArchive());
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="container">Please log in</div>;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  if (loading) {
    return <LoadingView />;
  }

  if (!data) {
    return <div className="container">No messages</div>;
  }

  return (
    <div className="container">
      <h1>{user.username}'s archived messages</h1>
      <InboxView data={data} />
    </div>
  );
};
