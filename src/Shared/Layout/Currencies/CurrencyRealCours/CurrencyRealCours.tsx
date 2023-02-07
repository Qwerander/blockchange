import React, { useEffect, useState } from 'react';
import styles from './currencyrealcours.module.css';
import arrowUp from '../../../../assets/img/arrowUpGreen.svg';
import arrowDown from '../../../../assets/img/arrowDownRed.svg';
import { ws } from '../../../../api/api';

type RateChangeType = {
  change: 1 | -1
  from: string
  rate: number
  to: string
}



export function CurrencyRealCours() {
  const [currencyCoursies, setCurrencyCoursies] = useState<Array<RateChangeType>>([])
  const [tempCurrency, setTempCurrency] = useState('')
  useEffect(() => {

    const wsHandler = (e: any) => {
      setTempCurrency(e.data)
      const cours: RateChangeType = {
        change: JSON.parse(e.data).change,
        from: JSON.parse(e.data).from,
        to: JSON.parse(e.data).to,
        rate: JSON.parse(e.data).rate
      }
      if (tempCurrency !== e.data) {

        setCurrencyCoursies(prev => {
    
          const temp = prev.concat(cours)
          return  temp.reverse()
        })
      }
    }
    ws.addEventListener('message', (e) => {
      wsHandler(e)
    })

    return ws.removeEventListener('message',(e) => wsHandler(e))
  }, [1])



  return (
    <div className={styles.currencyRealCours}>
      <h3 className={styles.currencyRealCoursTitle}>
        Изменение курсов в реальном времени
      </h3>
      {currencyCoursies.map(item => (
        <div key={Math.random().toString(36).substring(2, 15)} className={styles.currencyRealCoursItem}>
          <span>
            {item.from}/{item.to}
          </span>
          <span className={styles.currencyRealCoursDotter}></span>
          <span>
            {item.rate}
          </span>
          {item.change > 0 &&
            <img src={arrowUp} alt="Цена выросла" />
          }
          {item.change < 0 &&
               <img src={arrowDown} alt="Цена упала" />
          }
          
       
        </div>

      ))}
    </div>
  );
}
