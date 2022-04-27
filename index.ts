import { createNanoEvents as createEmitter } from "nanoevents";
import type { Emitter } from "nanoevents";

interface Events<State> {
  change: (state: State, prevState: State) => void;
}

interface SetStateAction<S> {
  (state: S): S;
}

function isSetStateAction<S>(x: S | SetStateAction<S>): x is SetStateAction<S> {
  return typeof x === "function";
}

export class Store<S> {
  state: S;
  private emitter: Emitter<Events<S>>;

  constructor(initialState: S) {
    this.state = initialState;
    this.emitter = createEmitter<Events<S>>();
  }

  addEventListener<K extends keyof Events<S>>(event: K, cb: Events<S>[K]) {
    return this.emitter.on(event, cb);
  }

  getState() {
    return this.state;
  }

  setState(stateOrStateSetter: S | SetStateAction<S>) {
    let newState: S;
    if (isSetStateAction(stateOrStateSetter)) {
      newState = stateOrStateSetter(this.state);
    } else {
      newState = stateOrStateSetter;
    }
    if (newState === this.state) {
      return;
    }
    const prevState = this.state;
    this.state = newState;
    this.emitter.emit("change", this.state, prevState);
  }
}

export class FormDataStore<
  FormDataObject extends { [key: string]: any }
> extends Store<FormDataObject> {
  initialState: FormDataObject;

  constructor(initialState: FormDataObject) {
    super(initialState);
    this.initialState = initialState;
  }

  setValue = (
    key: keyof FormDataObject,
    value: FormDataObject[keyof FormDataObject]
  ) => {
    this.setState((state) =>
      state[key] === value ? state : { ...state, [key]: value }
    );
  };

  handleChange = (event: Event) => {
    if (event.currentTarget) {
      const target = event.currentTarget as
        | HTMLInputElement
        | HTMLSelectElement;
      this.setValue(
        target.name as keyof FormDataObject,
        target.value as FormDataObject[keyof FormDataObject]
      );
    }
  };

  reset = () => {
    this.setState(this.initialState);
  };
}
