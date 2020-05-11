import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { registerSagasWithMiddleware } from "./components/rootSaga";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import rootReducer from "./components/rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
registerSagasWithMiddleware(sagaMiddleware);

export default props => {
  return <Provider store={store}>{props.children}</Provider>;
};
