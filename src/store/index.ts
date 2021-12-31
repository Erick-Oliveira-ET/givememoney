import { Context, createWrapper } from "next-redux-wrapper";
import { createStore, Store } from "redux";
import reducers from "./reducers";
import { ThemeState } from "./reducers/theme";

export interface State {
  theme: ThemeState;
}

const makeStore = (context: Context) => createStore(reducers);

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
