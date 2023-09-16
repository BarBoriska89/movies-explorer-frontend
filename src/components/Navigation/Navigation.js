import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import accountPicPath from '../../images/icon__account.png';
import '../Header/Header.css';
import SizeTracker from "../SizeTracker/SizeTracker";
import BurgerMenuButton from "../Header/BurgerMenu/BurgerMenuButton/BurgerMenuButton";
import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";

function Navigation({ isLogged, widthWindow }) {
    console.log(widthWindow);

    const isSmallScreen = widthWindow <= 900;
    console.log(isSmallScreen);
    console.log(isLogged);

    const location = useLocation();

    const [isOpened, setIsOpened] = useState(false);

    console.log(isOpened);

    function handleOpen() {
        setIsOpened(!isOpened);
    }

    return (
        <>
            {isLogged === true && !isSmallScreen ?

                <nav className="nav">
                    <ul className="nav__movies">
                        <li><Link to="/movies" className="nav__link" >Фильмы</Link></li>
                        <li><Link to="/saved-movies" className="nav__link" >Сохранённые фильмы</Link></li>
                    </ul>

                    <Link to="/profile" className={`nav__link nav__link-account ${location.pathname === '/' ? "" : "nav__link-account_dark"}`}>
                        <span className="nav__account">Аккаунт</span>
                        <div className={`nav__account-pic-container  ${location.pathname === '/' ? "" : "nav__account-pic-container_dark"}`}>
                            <img src={accountPicPath} className="nav__account-pic" alt="Значок аккаунт" />
                        </div>
                    </Link>
                </nav>
                :
                <>
                    {isLogged && isSmallScreen ?
                        <>  {
                            isOpened ?
                                <BurgerMenu handleClose={handleOpen} />
                                :
                                <BurgerMenuButton handleOpen={handleOpen} isOpened={isOpened} />
                        }
                        </>
                        :
                        <nav className="nav__auth">
                            <Link to="/sign-up" className="nav__link" >Регистрация</Link>
                            <Link to="/sign-in" className="nav__button" >Войти</Link>
                        </nav>}

                </>
            }


        </>
    );
};


export default Navigation;