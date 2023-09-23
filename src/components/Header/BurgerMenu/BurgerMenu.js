import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import accountPicPath from '../../../images/icon__account.svg';

function BurgerMenu({ handleClose, isOpened }) {
    const location = useLocation();

    return (
        <div className={`header__nav-burger-menu ${isOpened ? 'header__nav-burger-menu_opened' : ''}`}>
            <div className='header__nav-burger-container'>
                <button className='button header__nav-burger-close' type="button" onClick={handleClose} />
                <nav className='header__nav-burger-links'>
                    <ul className="header__nav-burger-links-list">
                        <li><Link to="/" className={`link header__nav-burger-link ${location.pathname === '/' ? 'header__nav-burger-link_active' : ''}`} onClick={handleClose}
                        >Главная</Link></li>
                        <li><Link to="/movies" className={`link header__nav-burger-link ${location.pathname === '/movies' ? 'header__nav-burger-link_active' : ''}`} onClick={handleClose}
                        >Фильмы</Link></li>
                        <li><Link to="/saved-movies" className={`link header__nav-burger-link ${location.pathname === '/saved-movies' ? 'header__nav-burger-link_active' : ''}`} onClick={handleClose}
                        >Сохранённые фильмы</Link></li>
                    </ul>
                    <Link to="/profile" className="link header__nav-burger-link header__nav-burger-link-account" onClick={handleClose}>
                        <span className="header__nav-burger-account">Аккаунт</span>
                        <div className="header__nav-burger-account-pic-container">
                            <img src={accountPicPath} className="header__nav-burger-account-pic" alt="Значок аккаунт" />
                        </div>
                    </Link>
                </nav>
            </div>
        </div >
    );
}
export default BurgerMenu;