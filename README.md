# context-media-match
🚠 A React hook for creating ActionCable subscriptions in components

## Install

```
yarn add use-action-cable
```

## Usage

#### Use ActionCableProvider as a context provider

```jsx
import React from 'react';
import { ActionCableProvider } from 'use-action-cable';

const App = (props) => (
  <ActionCableProvider url="/cable">
    <SomeComponent />
  </ActionCableProvider>
)
```

#### Implement subscriptions using `useActionCable`

```jsx
import React from 'react';
import { useActionCable } from 'use-action-cable';

const SomeOtherComponent = ({ id }) => {
  const channelParams = { channel: 'SomeChannel', id };
  const channelHandlers = {
    received(data) {
      console.log(JSON.parse(data);
    }
  }
  
  useActionCable(channelParams, channelHandlers);

  return <p>When this mounts, there will be an active subscription. If id changes, the subscription will be unsubscribed and re-subscribed with the new id. The subscription will be remove when unmounted.</p>;
}

export default SomeOtherComponent;
```

###### The hook will not create the subscription until `params` is present.
- This helps with components that need to fetch data first. For example:

```jsx
import React, { useEffect, useState } from 'react';
import { useActionCable } from 'use-action-cable';
...

const SomeOtherComponent = () => {
  const [currentOrg, setCurrentOrg] = useState();

  useEffect(async () => {
    const resp = await getCurrentOrg();
    setCurrentOrg(resp);
  }, []);

  let channelParams;
  
  if (currentOrg) {
    channelParams = { channel: 'OrgChannel', room: currentOrg.id };
  }

  const channelHandlers = {
    received(data) {
      console.log(JSON.parse(data);
    }
  }
  
  useActionCable(channelParams, channelHandlers); // doesn't subscribe until channelParams is present

  return <p>Subscription is not created until organizationId is fetched.</p>;
}

export default SomeOtherComponent;
```

###### API
`<ActionCableProvider url="path to cable">{children}</ActionCableProvider>`

`useActionCable(params, handlers)`
- `params` must include `channel` and then any number of additional params
- `handlers` provides a hash of handler functions

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
