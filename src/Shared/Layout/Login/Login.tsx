import React, { FC, useEffect } from 'react';
import styles from './login.module.css';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenThunk } from '../../../store/reducers/tokenReducer';
import { RootStateType } from '../../../store/reducers/reducers';

type InitialValuesType = {
	login: string;
	password: string
}

type SignupFormType = {
	handleSubmit: (values: InitialValuesType) => void;
}


export const Login = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const token = useSelector<RootStateType, string>(state => state.tokenReducer.token)
	
	useEffect(() => {
		if (token) {
			history.push('/accounts')
		} 
	}, [history, token])

	const onSubmit = ({ login, password }: InitialValuesType) => {	
		dispatch<any>(getTokenThunk(login, password))
	}
	return (
		<div className={styles.loginContainer}>
			<h2 className={styles.loginTitle}>
				Вход в аккаунт
			</h2>
			<SignupForm handleSubmit={onSubmit} />
		</div>

	);
}


const SignupForm: FC<SignupFormType> = ({ handleSubmit }) => {

	const formik = useFormik({
		initialValues: {
			login: 'developer',
			password: 'skillbox',
		},
		onSubmit: (values, { resetForm }) => {
			
			handleSubmit(values)
			resetForm({ values : { login: '', password: '' } })
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<label className={styles.loginlabel}>
				Логин
				<input
					id="login"
					name="login"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.login}
					className={styles.loginInput}
				/>
			</label>
			<label className={styles.loginlabel}>
				Пароль
				<input
					id="password"
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
					className={styles.loginInput}
				/>
			</label>
			<button  type='submit' className={styles.loginBtn}>
		
				Войти
			
			</button>
		</form>
	);
};

