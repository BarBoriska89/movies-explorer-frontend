import React from "react";
import './Promo.css';
import promoLogoPath from '../../../images/pic__COLOR_landing-logo.svg';

function Promo() {

    return (
        <section className="promo__wrapper" aria-label="Учебный проект">
            <div className="promo__container">
                <img src={promoLogoPath} className="promo__logo" alt="Логотип Яндекс Практикума" />
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            </div>
        </section>
    );
};

export default Promo;
