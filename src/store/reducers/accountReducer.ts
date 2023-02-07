import { ThunkAction } from "redux-thunk";
import { Api } from "../../api/api";
import { Action, Reducer } from "redux";
import { RootStateType } from "./reducers";
import { AccountType, TransactionType } from "./accountsReducer";


const initialState = {
  loading: false,
  error: '',
  account: {
    account: '',
    balance: 0,
    transactions: [] as Array<TransactionType> 
  },
}

type AccountStateType = typeof initialState

const GET_BEFORE_ACCOUNT = 'GET_BEFORE_ACCOUNTT'
const GET_ACCOUNT = 'GET_ACCOUNT'
const ERROR_ACCOUNT = 'ERROR_ACCOUNT'

type GetBeforeAccountType = {
    type: typeof GET_BEFORE_ACCOUNT
}
type GetAccountType = {
    type: typeof GET_ACCOUNT
    account: AccountType
}
type ErrorAccountType = {
    type: typeof ERROR_ACCOUNT
    error: string
}


export const getBeforeAccount = (): GetBeforeAccountType => ({
  type: GET_BEFORE_ACCOUNT,
});

export const getAccount = (account: AccountType): GetAccountType => ({
  type: GET_ACCOUNT,
  account,
});

export const errorAccount = (error: string): ErrorAccountType => ({
  type: ERROR_ACCOUNT,
  error,
});

type AccountReducerActions = GetBeforeAccountType | GetAccountType | ErrorAccountType

export const accountReducer: Reducer<AccountStateType, AccountReducerActions> = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEFORE_ACCOUNT:
      return {
        ...state,
       loading: true
      }
    case GET_ACCOUNT:
      return {
        ...state,
        account: action.account,
        loading: false
      }
    case ERROR_ACCOUNT:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
}

export const getAccountThunk = (id: string):  ThunkAction<void, RootStateType, unknown, Action<string>> => (dispatch, getState) => {
  const token = getState().tokenReducer.token

  if (token && token !== '') {
    dispatch(getBeforeAccount())
    Api.account(token, id)
      .then((resp) => {
        if (resp.payload) {
          dispatch(getAccount(resp.payload))
        } else if (resp.error) {
          dispatch(errorAccount(resp.error))
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  // 

} 