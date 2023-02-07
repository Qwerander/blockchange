import React, { FC } from 'react';
import styles from './currencychange.module.css';
import { useFormik } from 'formik';
import { PayloadType } from '../../../../store/reducers/currenciesReducer';
import { Api } from '../../../../api/api';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../store/reducers/reducers';

type PropsType = {
  currency: PayloadType;
  currencyChange: (value: boolean) => void;
};


export const CurrencyChange: FC<PropsType> = ({ currency, currencyChange }) => {


  const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
  const onSubmit = ({ from, to, amount }: InitialValuesType) => {
  
    Api.currencyBuy(token, from, to, amount)
    currencyChange(true)
  }


  return (
    <div className={styles.changeContainer}>
      <h2 className={styles.changeTitle}>
        Обмен валюты
      </h2>
      <ChangeCurrencyForm handleSubmit={onSubmit} currency={currency} />
    </div>
  );
}

type SignupFormType = {
  handleSubmit: (values: any) => void;
  currency: PayloadType
}

type InitialValuesType = {
  from: string;
  to: string;
  amount: number
}

const ChangeCurrencyForm: FC<SignupFormType> = ({ handleSubmit, currency }) => {
  const keysOptionsCurrency = Object.keys(currency)

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      amount: 0
    },
    onSubmit: (values, { resetForm }) => {

      handleSubmit(values)
      resetForm({ values: { from: '', to: '', amount: 0 } })
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.changeForm}>
      <div className={styles.changeWrapper}>
        <div className={styles.changeWrapperTop}>

          <label className={styles.changeLabel}>
            Из
            <select
              id="from"
              name="from"
              onChange={formik.handleChange}
              value={formik.values.from}
              className={styles.changeSelect}
            >
              {keysOptionsCurrency.map(key =>
                <option key={key} value={key}>{key}</option>
              )}

            </select>
          </label>
          <label className={styles.changeLabel}>
            в
            <select
              id="to"
              name="to"
              onChange={formik.handleChange}
              value={formik.values.to}
              className={styles.changeSelect}
            >
              {keysOptionsCurrency.map(key =>
                <option key={key} value={key}>{key}</option>
              )}
            </select>
          </label>
        </div>
        <div className={styles.changeWrapperBottom}>
          <label className={styles.changeLabel}>
            Сумма
            <input
              id="amount"
              name="amount"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className={styles.changeInput}
            />
          </label>
        </div>
      </div>
      <button type='submit' className={styles.changeBtn}>

        Обменять

      </button>
    </form>
  );
};

