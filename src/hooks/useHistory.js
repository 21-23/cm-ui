import { useState } from "preact/hooks";
import { createHashHistory } from 'history';

export default function useHistory() {
  const [history] = useState(() => {
    const hashHistory = createHashHistory();
    const hashHistoryListen = hashHistory.listen.bind(hashHistory);

    // hack to fix interfaces mismatch between `history` and `preact-router`
    // HashHistory calls `listen` callback with an object `{ action, location }`
    // but preact-router expects `location` right away
    hashHistory.listen = (callback) => {
      return hashHistoryListen(({ location }) => {
        return callback(location);
      });
    }

    return hashHistory;
  });

  return history;
}
