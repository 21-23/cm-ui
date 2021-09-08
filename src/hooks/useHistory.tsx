import { useState } from "preact/hooks";
import { createHashHistory, HashHistory } from 'history';

export default function useHistory(): HashHistory {
  const [history] = useState<HashHistory>(() => {
    const hashHistory = createHashHistory();
    const hashHistoryListen = hashHistory.listen.bind(hashHistory);

    // hack to fix interfaces mismatch between `history` and `preact-router`
    // HashHistory calls `listen` callback with an object `{ action, location }`
    // but preact-router expects `location` right away
    hashHistory.listen = (callback) => {
      return hashHistoryListen(({ location }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return callback(location);
      });
    }

    return hashHistory;
  });

  return history;
}
