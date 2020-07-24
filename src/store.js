import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { Reducers } from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

export default Store;
