import './Login.css';
import Form from '../Form/Form';
import InputForm from '../InputForm/InputForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Login({ currentUser, onLogin, requestError }) {

    const { values, handleChange, errors, isValid, } = useFormAndValidation({});

    function onSubmit(evt) {
        evt.preventDefault();
        onLogin({
            email: values.email,
            password: values.password
        });
    }

    return (
        <main className='main'>
            <div className='auth'>
                <section className='auth__login' aria-label='Регистрация и авторизация'>
                    <Form
                        formName='login'
                        greetings='Рады видеть!'
                        buttonText='Войти'
                        linkQuestion='Ещё не зарегистрированы?'
                        linkTitle='Регистрация'
                        linkPath='/signup'
                        onSubmit={onSubmit}
                        isValid={isValid}
                        error={requestError}
                    >

                        <InputForm
                            id="email"
                            name="email"
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
                            id="password"
                            name="password"
                            title="Пароль"
                            type="password"
                            placeholder="Пароль"
                            minLength="6"
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

export default Login;