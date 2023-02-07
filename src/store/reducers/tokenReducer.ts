// import { Api } from "../../api/api";

import { Action, Reducer } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootStateType } from "./reducers"
import { Api } from "../../api/api"


const initialState = {
  token: '',
  error: ''
}

type TokenStateType = typeof initialState

const GET_TOKEN = 'GET_TOKEN'
const ERROR_TOKEN = 'ERROR_TOKEN'

type GetTokenActionType = {
  type: typeof GET_TOKEN
  token: string
}
type ErrorTokenActionType = {
  type: typeof ERROR_TOKEN
  error: string
}



export const getToken = (token: string): GetTokenActionType => ({
  type: GET_TOKEN,
  token,
});

export const errorToken = (error: string): ErrorTokenActionType => ({
  type: ERROR_TOKEN,
  error,
});


export const tokenReducer: Reducer<TokenStateType, GetTokenActionType | ErrorTokenActionType> = (state = initialState, action): TokenStateType => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case ERROR_TOKEN:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}


export const getTokenThunk = (login: string, password: string):  ThunkAction<void, RootStateType, unknown, Action<string>> => (dispatch) => {

  Api.logIn(login, password)
    .then(({ payload, error }) => {
      if (payload) {
        dispatch(getToken(payload.token))
      } else if (error) {
        dispatch(errorToken(error.toString()))
      }
    })
    .catch((error: any) => {
      console.log(error);
    })
} 