import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

function Header() {

    return (
        <footer className="footer">
            <h2 className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__wrapper">
                <p className="footer__copyright">&copy;2023</p>
                <div className="footer__links">
                    <a href='https://practicum.yandex.ru/' className="footer__link" target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                    <a href='https://github.com/' className="footer__link" target='_blank' rel="noreferrer">Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Header;
