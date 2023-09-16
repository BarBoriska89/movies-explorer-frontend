import React from "react";
import logoPicPath from '../../images/logo.png';
import Navigation from '../Navigation/Navigation';
import accountPicPath from '../../images/icon__account.png';
import './Header.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SizeTracker from "../SizeTracker/SizeTracker";

function Header(props) {

    let location = useLocation();
    const widthWindow = SizeTracker();

        console.log(location.pathname);

    return (
        <header className={`header ${(location.pathname === '/') ? '' : 'header_dark' }`}>
            <Link to="/" className="header__logo">
                <img src={logoPicPath} className="header__logo-pic" alt="Логотип сервиса" />
            </Link>

            <Navigation 
            isLogged={props.isLogged}
            widthWindow={widthWindow}
            />

        </header>
    );
}

export default Header;
