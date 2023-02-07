import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { accountsReducer } from "./accountsReducer";
import { accountReducer } from "./accountReducer";
import { currencyReducer } from "./currenciesReducer";

export const rootReducer = combineReducers({
    tokenReducer,
    accountsReducer,
    accountReducer,
    currencyReducer
});

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>