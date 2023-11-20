import { useCallback } from 'react';

import useIsMounted from './useIsMounted';

export default function useSafeAsyncaction() {
  const isMounted = useIsMounted();
  const runSafeasyncAction = useCallback(
    (callback) => {
      if (isMounted()) {
        callback();
      }
    },
    [isMounted],
  );
  return runSafeasyncAction;
}
