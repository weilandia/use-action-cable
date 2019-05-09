// libraries
import { useEffect, useContext } from 'react';

// ActionCableHooks
import { ActionCableContext } from './context.jsx';

export const useActionCable = (params, handlers = {}) => {
  const { conn } = useContext(ActionCableContext);

  const diff = JSON.stringify(params);

  useEffect(() => {
    let subscription;

    if (params) {
      subscription = conn.subscriptions.create(params, handlers);
    }

    return () => subscription && conn.subscriptions.remove(subscription);
  }, [diff]);
};
