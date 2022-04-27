# store-unit

A watchable store unit

## Install

```sh
npm install store-unit
```

## Getting Started

```js
import { Store } from "store-unit";

const initialValue = { count: 42 };

const store = new Store(initialValue);

const unlisten = store.on("change", (newState, previousState) => {
  updateSomething(state);
});

// Stop listening:
unlisten();
```
