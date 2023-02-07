import React from 'react';
import logo from '../../../assets/img/logo.svg'
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../store/reducers/reducers';
import { getToken } from '../../../store/reducers/tokenReducer';

export function Header() {
    const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
    const dispatch = useDispatch()
    const buttonAction = () => {
        dispatch(getToken(''))
    } 

    return (
        <header className={styles.header}>
            <img src={logo} alt="Логотип" />
            {token &&
                <nav className={styles.headerButtons}>
                    <NavLink to={'/banks'} className={styles.button}>
                        Банкоматы
                    </NavLink>
                    <NavLink to={'/accounts'} className={styles.button}>
                        Счета
                    </NavLink>
                    <NavLink to={'/currencies'} className={styles.button}>
                        Валюта
                    </NavLink>
                    <NavLink to={'/login'} className={styles.button} onClick={buttonAction}>
                        Выйти
                    </NavLink>
                </nav>
            }
        </header>
    );
}
