import React from "react";
import './Footer.css';
import { useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    return (
        location.pathname !== '/signup' && location.pathname !== '/signin' && location.pathname !== '/profile'
            ?
            <footer className="footer">
                <h2 className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className="footer__wrapper">
                    <p className="footer__copyright">&copy;2023</p>
                    <ul className="footer__links">
                        <li><a href='https://practicum.yandex.ru/' className="link footer__link" target='_blank' rel="noreferrer">Яндекс.Практикум</a></li>
                        <li><a href='https://github.com/' className="link footer__link" target='_blank' rel="noreferrer">Github</a></li>
                    </ul>
                </div>
            </footer>
            :
            null
    );
}

export default Header;
