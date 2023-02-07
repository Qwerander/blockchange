import React, { useEffect } from 'react';
import styles from './accountdetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../../store/reducers/reducers';
import { AccountType } from '../../../../../store/reducers/accountsReducer';
import { NavLink, useParams } from 'react-router-dom';
import { getAccountThunk } from '../../../../../store/reducers/accountReducer';

export function AccountDetails() {
  const dispatch = useDispatch()
  
  const account = useSelector<RootStateType, AccountType>(state => state.accountReducer.account)
  const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
  const params = useParams<{ id: string }>()

  useEffect(() => {
      if (token) {
          dispatch<any>(getAccountThunk(params.id))
      }
  }, [dispatch, params.id, token])


  return (
      <div className={styles.accountDetails}>
          <div className={styles.accountDetailsTop}>
              <div className={styles.accountDetailsTopLeft}>
                  <h3 className={styles.accountDetailsTitle}>
                      Просмотр счёта
                  </h3>
                  <span className={styles.accountDetailsCheck}>
                     № {account.account}
                  </span>
              </div>
              <div className={styles.accountDetailsTopRight}>
                  <NavLink to={'/accounts'} className={styles.accountDetailsButton}>
                     Вурнутся назад
                  </NavLink>
                  <div className={styles.accountDetailsBalance}>
                      <span className={styles.accountDetailsBalanceText}>
                          Баланс : 
                      </span>
                      <span className={styles.accountDetailsBalanceSumm}>
                          {account.balance}
                      </span>
                  </div>
              </div>
          </div>
          <div className={styles.accountDetailsCenter}>
              <div className={styles.accountDetailsCenterLeft}>
                  {/* <NewTransaction account={account.account} /> */}
              </div>
              <div className={styles.accountDetailsCenterRight}>
                  {/* <Graf transactions={account.transactions} /> */}
              </div>
          </div>
          <div className={styles.accountDetailsBottom}>
              {/* <HistoryTransactions transactions={account.transactions} account={account.account} /> */}
          </div>
      </div>
  );
}
