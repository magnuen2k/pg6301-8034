import { useEffect, useState } from "react";

// Hook inspired from class
export const useLoading = (loadingFunction) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const reload = async () => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(reload, []);
  return { loading, error, data };
};
