import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/reducers";

export const store = legacy_createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

store.subscribe(() => console.info(store.getState())) // Для отладки 
