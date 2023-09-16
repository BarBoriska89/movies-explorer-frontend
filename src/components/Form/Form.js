import './Form.css';
import { Link } from 'react-router-dom';
import logoPicPath from '../../images/logo.png';

function Form(props) {
/*
    function onSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(evt);
    }
*/
    return (
        <>
            <Link to="/" className="auth__logo">
                <img src={logoPicPath} className="auth__logo-pic" alt="Логотип сервиса" />
            </Link>
            <h2 className="auth__title">{props.greetings}</h2>
            <div className="auth__container">
                <form className="auth__form" id="loginForm" name="loginForm" noValidate onSubmit={props.onSubmit}>

                    {props.children}

                    <button className="auth__button" type="submit" aria-label={props.buttonText} >{props.buttonText}</button>
                </form>
                <div className="auth__link-container">
                    <p className="auth__link-title">{props.linkQuestion}</p>
                    <Link to={props.linkPath} className="auth__link">{props.linkTitle}</Link>
                </div>
            </div>
        </>

    );
};

export default Form;