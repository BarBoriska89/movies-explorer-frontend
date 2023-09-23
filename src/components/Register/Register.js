import React from 'react';
import './Register.css';
import InputForm from '../InputForm/InputForm';
import Form from '../Form/Form';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Register({ currentUser, onRegister, requestError }) {

    const { values, handleChange, errors, isValid, } = useFormAndValidation({});

    const onSubmit = (evt) => {
        evt.preventDefault();
        onRegister({
            name: values.user,
            email: values.email,
            password: values.password
        });
    }

    return (
        <main className='main'>
            <div className='auth'>
                <section className='auth__register' aria-label='Регистрация и авторизация'>
                    <Form
                        formName='register'
                        greetings='Добро пожаловать!'
                        buttonText='Зарегистрироваться'
                        linkQuestion='Уже зарегистрированы?'
                        linkTitle='Войти'
                        linkPath='/signin'
                        onSubmit={onSubmit}
                        isValid={isValid}
                        error={requestError}
                    >
                        <InputForm
                            name="user"
                            id="user"
                            title="Имя"
                            type="text"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            value={values.user}
                            errors={errors.user}
                            isValid={isValid}
                            user={currentUser}
                        />

                        <InputForm
                            name="email"
                            id="email"
                            title="E-mail"
                            type="email"
                            placeholder="E-mail"
                            minLength="8"
                            maxLength="30"
                            onChange={handleChange}
                            value={values.email}
                            errors={errors.email}
                            isValid={isValid}
                            user={currentUser}
                        />

                        <InputForm
                            name="password"
                            id="password"
                            title="Пароль"
                            type="password"
                            placeholder="Пароль"
                            minLength="6"
                            maxLength="20"
                            onChange={handleChange}
                            value={values.password}
                            errors={errors.password}
                            isValid={isValid}
                            user={currentUser}
                        />
                    </Form>
                </section>
            </div>
        </main >
    );
};

export default Register;