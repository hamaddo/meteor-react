import { useState } from 'react';

export const useToggle = (
  initialStatus?: boolean,
  callbackOnToggle?: (newStatus: boolean) => void
): [boolean, () => void] => {
  const [status, setStatus] = useState(initialStatus ?? false);

  const toggleStatus = () => {
    setStatus((prevState) => !prevState);
    if (callbackOnToggle) callbackOnToggle(!status);
  };

  return [status, toggleStatus];
};
