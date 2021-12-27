import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const midddlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...midddlewares));

export default store;
