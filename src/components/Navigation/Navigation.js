import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import accountPicPath from '../../images/icon__account.svg';
import '../Header/Header.css';
import BurgerMenuButton from "../Header/BurgerMenu/BurgerMenuButton/BurgerMenuButton";
import BurgerMenu from "../Header/BurgerMenu/BurgerMenu";

function Navigation({ isLogged, widthWindow }) {
    const isSmallScreen = widthWindow <= 900;

    const location = useLocation();

    const [isOpened, setIsOpened] = useState(false);

    function handleOpen() {
        setIsOpened(!isOpened);
    }

    return (
        <>
            {isLogged === true && !isSmallScreen ?

                <nav className="header__nav">
                    <ul className="header__nav-movies">
                        <li><NavLink to="/movies" className="link header__nav-link" >Фильмы</NavLink></li>
                        <li><NavLink to="/saved-movies" className="link header__nav-link" >Сохранённые фильмы</NavLink></li>
                    </ul>

                    <NavLink to="/profile" className={`link header__nav-link header__nav-link-account ${location.pathname === '/' ? "" : "header__nav-link-account_dark"}`}>
                        <span className="header__nav-account">Аккаунт</span>
                        <div className={`header__nav-account-pic-container  ${location.pathname === '/' ? "" : "header__nav-account-pic-container_dark"}`}>
                            <img src={accountPicPath} className="header__nav-account-pic" alt="Значок аккаунт" />
                        </div>
                    </NavLink>
                </nav>
                :
                <>
                    {isLogged && isSmallScreen ?
                        <>  {
                            isOpened ?
                                <BurgerMenu handleClose={handleOpen} isOpened={isOpened} />
                                :
                                <BurgerMenuButton handleOpen={handleOpen} isOpened={isOpened} />
                        }
                        </>
                        :
                        <nav className="header__nav-auth">
                            <NavLink to="/signup" className="link header__nav-link" >Регистрация</NavLink>
                            <NavLink to="/signin" className="link header__nav-button" >Войти</NavLink>
                        </nav>}

                </>
            }


        </>
    );
};


export default Navigation;