import React from 'react';
// import styles from './layout.module.css';
import { Header } from './Header';
import { Login } from './Login';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AccountsList } from './AccountsList';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/reducers/reducers';
import { AccountDetails } from './AccountsList/Account/AccountDetails';
import { Currencies } from './Currencies';
import { MapBanks } from './MapBanks';


export function Layout() {
	const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)

  return (
    <div>
      <Header />
      <Switch>
        {
          token
            ? <Route exact path={'/'} render={() => <Redirect to={'/accounts'} />} />
            : <Route exact path={'/'} render={() => <Redirect to={'/login'} />} />
        }
        <Route path={'/account/:id'} render={() => <AccountDetails />} />
        <Route path={'/accounts'} render={() => <AccountsList />} />
        <Route path={'/banks'} render={() => <MapBanks />} />
        <Route path={'/currencies'} render={() => <Currencies />} />
        <Route path={'/login'} render={() => <Login />} />
        <Route path={'*'} render={() => <div>Страница не найдена</div>} />

      </Switch>
    </div>
  );
}
