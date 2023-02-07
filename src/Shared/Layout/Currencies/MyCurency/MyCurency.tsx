import React, { FC } from 'react';
import styles from './mycurency.module.css';
import { PayloadType } from '../../../../store/reducers/currenciesReducer';



type PropsType = {
  currency: PayloadType
};

export const MyCurency: FC<PropsType> = ({ currency }) => {
  
  const currencyArray = Object.entries(currency)

  return (
    <div className={styles.myCurrency}>
      <h3 className={styles.myCurrencyTitle}>
        Ваши валюты
      </h3>
      {currencyArray.map(item => (
        <CurrencyItem item={item} key={item[0]}/>
      ))}
    </div>
  );
}

type CurrencyItemType = {
  item: [string, { amount: number; code: string; } | null]
}

const CurrencyItem: FC<CurrencyItemType> = ({item}): JSX.Element => {
  return (
    <div className={styles.myCurrencyItem}>
      <span>
        {item[0]}
      </span>
      <span className={styles.myCurrencyDotter}></span>
      <span>
        {item[1]?.amount}
      </span>
    </div>

  )
}

