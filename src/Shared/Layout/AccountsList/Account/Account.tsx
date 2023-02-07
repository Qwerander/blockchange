import React from 'react';
import styles from './account.module.css';
import { AccountType } from '../../../../store/reducers/accountsReducer';
import { NavLink } from 'react-router-dom';

export function Account({ account, balance, transactions }: AccountType) {


return (
    <div className={styles.account}>
        <h3 className={styles.accountTitle}>
            {account}
        </h3>
        <span className={styles.accountSumm}>
            {balance}
        </span>
        <div className={styles.accountBottom}>
            <div className={styles.accountLastTransaction}>
                <span className={styles.accountLastTransactionText}>Последняя транзакция</span>
                <span className={styles.accountLastTransactionDate}>{transactions[0]?.date}</span>
            </div>
    
            <NavLink to={`/account/${account}`} className={styles.accountButton}>
              Открыть
            </NavLink>
   
      
        </div>
    </div>
);
}
