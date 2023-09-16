import './Login.css';
import Form from '../../Form/Form';
import InputForm from '../../InputForm/InputForm';
import useFormAndValidation from '../../../hooks/useFormAndValidation';

function Login({ currentUser, onLogin }) {

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
            <section className='auth__login' aria-label='Регистрация и авторизация'>
                <Form
                    greetings='Рады видеть!'
                    buttonText='Войти'
                    linkQuestion='Ещё не зарегистрированы?'
                    linkTitle='Регистрация'
                    linkPath='/sign-up'
                    onSubmit={onSubmit}
                >

                    <InputForm
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
                        name="password"
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
        </main>
    );
};

export default Login;