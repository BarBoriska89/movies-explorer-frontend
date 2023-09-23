import React from 'react';
import './Form.css';
import { Link } from 'react-router-dom';

function Form(props) {

    return (
        <>
            <h1 className="auth__title">{props.greetings}</h1>
            <div className="auth__container">
                <form className="auth__form" id="loginForm" name={props.formName} noValidate onSubmit={props.onSubmit}>

                    {props.children}
                    <span className='auth__error auth__error-submit'>{props.error}</span>
                    <button className="button auth__button" type="submit" disabled={!props.isValid} aria-label={props.buttonText} >{props.buttonText}</button>
                </form>
                <div className="auth__link-container">
                    <p className="auth__link-title">{props.linkQuestion}</p>
                    <Link to={props.linkPath} className="link auth__link">{props.linkTitle}</Link>
                </div>
            </div>
        </>

    );
};

export default Form;