import React, { useEffect } from 'react';
import styles from './accountslist.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../store/reducers/reducers';
import { AccountType, getAccountsThunk } from '../../../store/reducers/accountsReducer';
import { Api } from '../../../api/api';
import { Account } from './Account/Account';

export function AccountsList() {
  const dispatch = useDispatch()
	const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
  const accountsData = useSelector<RootStateType, Array<AccountType>>(state => state.accountsReducer.accounts)

  useEffect(() => {
      if (token && token !== '') {
          dispatch<any>(getAccountsThunk())
      }
  }, [dispatch, token])

  const buttonAction = () => {
      Api.createAccount(token)
      dispatch<any>(getAccountsThunk())
  }


  if (!accountsData) return null

  const acc = accountsData.map(acc => {

      return <Account
          key={acc.account}
          account={acc.account}
          balance={acc.balance}
          transactions={acc.transactions}
       
      />

  })


  return (

    <div className={styles.accountsList}>

      <div className={styles.accountsListTop}>
        <h2 className={styles.accountsListTitle}>
          Ваши счета
        </h2>
        выпадающий список
        <button className={styles.accountsButton} onClick={buttonAction}>
          + Создать новый счет
        </button>
      </div>


      <div className={styles.accountsListWrapper}>
        {acc && acc}

      </div>

    </div>

  );
}
