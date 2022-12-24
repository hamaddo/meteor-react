import { useCallback, useEffect, useState } from 'react';

import { Meteor } from 'meteor/meteor';

export const useMeteorMethod = <T>(method: string, params?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const request = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await Meteor.callAsync(method, params);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  }, [method]);

  useEffect(() => {
    request();
  }, [request]);
  return { isLoading, error, request, data };
};
