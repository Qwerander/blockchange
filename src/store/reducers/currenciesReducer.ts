// import { Api } from "../../api/api";

import { Action, Reducer } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootStateType } from "./reducers"
import { Api } from "../../api/api"

type CurrencyType = {
  amount: number
  code: string
}

export type PayloadType = {
  AUD: null | CurrencyType
  BTC: null | CurrencyType,
  BYR: null | CurrencyType,
  CAD: null | CurrencyType,
  CHF: null | CurrencyType,
  CNH: null | CurrencyType,
  ETH: null | CurrencyType,
  EUR: null | CurrencyType,
  GBP: null | CurrencyType,
  HKD: null | CurrencyType,
  JPY: null | CurrencyType,
  NZD: null | CurrencyType,
  RUB: null | CurrencyType,
  UAH: null | CurrencyType,
  USD: null | CurrencyType
}

export type CurrencyStateType = {
  payload: PayloadType
  error: string
}

const initialState: CurrencyStateType = { 
  payload: {
    AUD: null, 
    BTC: null,
    BYR: null,
    CAD: null,
    CHF: null,
    CNH: null,
    ETH: null,
    EUR: null,
    GBP: null,
    HKD: null,
    JPY: null,
    NZD: null,
    RUB: null,
    UAH: null,
    USD: null
  },
  error: ''
}

const GET_CURRENCY = 'GETGET_CURRENCY_TOKEN'
const ERROR_CURRENCY = 'ERROR_CURRENCY'

type GetCurrencyActionType = {
  type: typeof GET_CURRENCY
  payload: PayloadType
}

type ErrorCurrencyActionType = {
  type: typeof ERROR_CURRENCY
  error: string
}

export const getCurrency = (payload: PayloadType): GetCurrencyActionType => ({
  type: GET_CURRENCY,
  payload,
});

export const errorCurrency = (error: string): ErrorCurrencyActionType => ({
  type: ERROR_CURRENCY,
  error,
});


export const currencyReducer: Reducer<CurrencyStateType, GetCurrencyActionType | ErrorCurrencyActionType> = (state = initialState, action): CurrencyStateType => {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        payload: action.payload,
      }
    case ERROR_CURRENCY:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}


export const getCurrencyThunk = ():  ThunkAction<void, RootStateType, unknown, Action<string>> => (dispatch, getState) => {
  const token = getState().tokenReducer.token
  Api.currencies(token)
    .then(({ payload, error }) => {
      if (payload) {
        dispatch(getCurrency(payload))
      } else if (error) {
        dispatch(errorCurrency(error.toString()))
      }
    })
    .catch((error: any) => {
      console.log(error);
    })
} 