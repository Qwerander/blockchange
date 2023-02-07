
import { ThunkAction } from "redux-thunk";
import { Api } from "../../api/api";
import { Action, Reducer } from "redux";
import { RootStateType } from "./reducers";


const initialState = {
  loading: false,
  error: '',
  accounts: [] as Array<AccountType>,
}

export type AccountType = {
    account: string,
    balance: number,
    transactions: Array<TransactionType>
}

export type TransactionType = {
    amount: number,
    date: string,
    from: string,
    to: string
}

type AccountsStateType = typeof initialState

const GET_BEFORE_ACCOUNTS = 'GET_BEFORE_ACCOUNTS'
const GET_ACCOUNTS = 'GET_ACCOUNTS'
const ERROR_ACCOUNTS = 'ERROR_ACCOUNTS'

type GetBeforeAccountsType = {
    type: typeof GET_BEFORE_ACCOUNTS
}
type GetAccountsType = {
    type: typeof GET_ACCOUNTS
    accounts: Array<AccountType>
}
type ErrorAccountsType = {
    type: typeof ERROR_ACCOUNTS
    error: string
}


export const getBeforeAccounts = (): GetBeforeAccountsType => ({
  type: GET_BEFORE_ACCOUNTS,
});

export const getAccounts = (accounts: Array<AccountType>): GetAccountsType => ({
  type: GET_ACCOUNTS,
  accounts,
});

export const errorAccounts = (error: string): ErrorAccountsType => ({
  type: ERROR_ACCOUNTS,
  error,
});

type AccountsReducerActions = GetBeforeAccountsType | GetAccountsType | ErrorAccountsType


export const accountsReducer: Reducer<AccountsStateType, AccountsReducerActions> = (state = initialState, action): AccountsStateType => {
  switch (action.type) {
    case GET_BEFORE_ACCOUNTS:
      return {
        ...state,
       loading: true
      }
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
        loading: false
      }
    case ERROR_ACCOUNTS:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
}

export const getAccountsThunk = ():  ThunkAction<void, RootStateType, unknown, Action<string>> => (dispatch, getState) => {
  const token = getState().tokenReducer.token

  if (token && token !== '') {
    dispatch(getBeforeAccounts())
    Api.accounts(token)
      .then((resp) => {
        if (resp.payload) {
          dispatch(getAccounts(resp.payload))
        } else if (resp.error) {
          dispatch(errorAccounts(resp.error))
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  // 

} 