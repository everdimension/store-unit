# store-unit

A minimal watchable store.

## Install

```sh
npm install store-unit
```

## Usage

```js
import { Store } from "store-unit";

const store = new Store({ count: 0 });

// Subscribe to changes
const unsubscribe = store.on("change", (state, prevState) => {
  console.log("Changed:", prevState, "→", state);
});

// Update state
store.setState({ count: 1 });

// Update with a function
store.setState((state) => ({ count: state.count + 1 }));

// Read state
console.log(store.getState()); // { count: 2 }

// Stop listening
unsubscribe();
```

## API

### `new Store(initialState)`

Creates a store with the given initial state.

### `.getState()`

Returns the current state.

### `.state`

Direct access to current state (same as `getState()`).

### `.setState(newState | updaterFn)`

Updates state and notifies listeners. Accepts either a new state value or an updater function that receives the current state and returns the new state.

If the new state is referentially equal (`===`) to the current state, listeners are not notified.

### `.setStateSilent(newState)`

Updates state without notifying listeners.

### `.on("change", callback)`

Subscribes to state changes. The callback receives `(newState, prevState)`.

Returns an unsubscribe function.

## Philosophy

This library is deliberately minimal. It provides one thing: an observable value.

**Non-goals:**

Store Unit doesn't need to be a state management solution that you have to learn.
It's as minimal as an event emitter, but a store.

## License

MIT