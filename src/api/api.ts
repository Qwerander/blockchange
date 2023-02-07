import axios from "axios";



export const ws = new WebSocket('ws://localhost:3000/currency-feed')

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    },
});

type RequestType = {
    payload: any
    error: string
}

type RequestLoginType = {
    payload: { token: string }
    error: string
}


type ApiType = {
    logIn: (login: string, password: string) => Promise<RequestLoginType>;
    accounts: (token: string) => Promise<RequestType>;
    account: (token: string, id: string) => Promise<RequestType>;
    createAccount: (token: string) => Promise<RequestType>;
    transferFunds: (token: string, from: string, to: string, amount: number) => Promise<RequestType>;
    allCurrencies: (token: string) => Promise<RequestType>;
    currencies: (token: string) => Promise<RequestType>;
    currencyBuy: (token: string, from: string, to: string, amount: number) => Promise<RequestType>;
    banks: (token: string) => Promise<RequestType>;
}

export const Api: ApiType = {
    logIn: async (login, password) => {
        const resp = await instance.post('login',
            {
                login, password
            }
        );
        return resp.data;
    },
    accounts: async (token) => {
        const resp = await instance.get('accounts',
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
    account: async (token, id) => {
        const resp = await instance.get(`account/${id}`,
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
    createAccount: async (token) => {
        console.log(token);
        const resp = await instance.post(`create-account`, {},
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
    transferFunds: async (token, from, to, amount) => {

        const resp = await instance.post(`transfer-funds`,
            {
                from,
                to,
                amount,
            },
            {
                headers: { 'Authorization': `Basic ${token}` },
            },
        );
        return resp.data;
    },
    allCurrencies: async (token) => {
        const resp = await instance.get(`all-currencies`,
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
    currencies: async (token) => {
        const resp = await instance.get(`currencies`,
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
    currencyBuy: async (token, from, to, amount) => {
        const resp = await instance.post(`currency-buy`,
            {
                from,
                to,
                amount,

            },
            {
                headers: { 'Authorization': `Basic ${token}` },

            }
        );
        return resp.data;
    },
    banks: async (token) => {
        const resp = await instance.get(`banks`,
            {
                headers: { 'Authorization': `Basic ${token}` }
            }
        );
        return resp.data;
    },
}


