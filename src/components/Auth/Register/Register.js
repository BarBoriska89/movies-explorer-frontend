import './Register.css';
import { Link } from 'react-router-dom';
import logoPicPath from '../../../images/logo.png';
import InputForm from '../../InputForm/InputForm';
import Form from '../../Form/Form';
import useFormAndValidation from '../../../hooks/useFormAndValidation';

function Register({ currentUser, onRegister }) {

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
                        greetings='Добро пожаловать!'
                        buttonText='Зарегистрироваться'
                        linkQuestion='Уже зарегистрированы?'
                        linkTitle='Войти'
                        linkPath='/signin'
                        onSubmit={onSubmit}
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
                            minLength="8"
                            maxLength="20"
                            onChange={handleChange}
                            value={values.password}
                            errors={errors.password}
                            user={currentUser}
                        />
                    </Form>
                </section>
            </div>
        </main>
    );
};

export default Register;