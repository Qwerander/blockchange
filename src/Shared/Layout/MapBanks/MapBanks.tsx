import React, { useState } from 'react';
import styles from './mapbanks.module.css';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Api } from '../../../api/api';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/reducers/reducers';

export function MapBanks() {
const [placemarks, setPlacemarks] = useState([])

const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
Api.banks(token).then(resp => setPlacemarks(resp.payload))

  return (
    <div className={styles.mapBanks}>
      <div className={styles.mapBanksTop}>
        <h2 className={styles.mapBanksTitle}>
          Карта банкоматов
        </h2>
      </div>
      <div className={styles.mapBanksBottom}>
        <YMaps>
          <Map width={'100%'} height={'400px'} defaultState={{
            center: [55.751574, 37.573856],
            zoom: 9
          }}>
            {
              placemarks.map((item: any) => (
                <Placemark defaultGeometry={[item.lat, item.lon]} />

              ))
            }
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
