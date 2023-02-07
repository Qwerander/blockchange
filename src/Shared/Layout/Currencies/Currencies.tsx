import React, { useEffect, useState } from 'react';
import styles from './currencies.module.css';
import { MyCurency } from './MyCurency';
import { CurrencyChange } from './CurrencyChange';
import { CurrencyRealCours } from './CurrencyRealCours';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../store/reducers/reducers';
import { PayloadType, getCurrencyThunk } from '../../../store/reducers/currenciesReducer';

export function Currencies() {

  const [isCurrencyChange, setIsCurrencyChange] = useState(true)

  const dispatch = useDispatch()
	const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)

  const currency = useSelector<RootStateType, PayloadType>(state => state.currencyReducer.payload)

  
  useEffect(() => {
    if (token && isCurrencyChange) {
      dispatch<any>(getCurrencyThunk())
      setIsCurrencyChange(false)
     
    }
  }, [dispatch, token, isCurrencyChange])

  return (
    <div className={styles.currencies}>
      <div className={styles.currenciesTop}>
        <h2 className={styles.currenciesTitle}>
          Валютный обмен
        </h2>
      </div>
      <div className={styles.currenciesBottom}>
        <div className={styles.currenciesBottomLeft}>
          <div className={styles.currenciesBottomLeftTop}>
            <MyCurency currency={currency} />
          </div>
          <div className={styles.currenciesBottomLeftBottom}>
            <CurrencyChange  currency={currency} currencyChange={setIsCurrencyChange}/>
          </div>
        </div>
        <div className={styles.currenciesBottomRight}>
          <CurrencyRealCours />
        </div>
      </div>
    </div>
  );
}
