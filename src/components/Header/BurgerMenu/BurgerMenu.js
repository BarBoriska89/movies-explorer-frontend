import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import accountPicPath from '../../../images/icon__account.svg';

function BurgerMenu({ handleClose }) {
    const location = useLocation();
    console.log(location);

    return (
        <div className='header__nav-burger-menu'>
            <button className='button header__nav-burger-close' type="button" onClick={handleClose} />
            <nav className='header__nav-burger-links'>
                <ul className="header__nav-burger-links-list">
                    <li><Link to="/" className={`link header__nav-burger-link ${location.pathname === '/' ? 'header__nav-burger-link_active' : ''}`}
                    >Главная</Link></li>
                    <li><Link to="/movies" className={`link header__nav-burger-link ${location.pathname === '/movies' ? 'header__nav-burger-link_active' : ''}`}
                    >Фильмы</Link></li>
                    <li><Link to="/saved-movies" className={`link header__nav-burger-link ${location.pathname === '/saved-movies' ? 'header__nav-burger-link_active' : ''}`}
                    >Сохранённые фильмы</Link></li>
                </ul>
                <Link to="/profile" className="link header__nav-burger-link header__nav-burger-link-account">
                    <span className="header__nav-burger-account">Аккаунт</span>
                    <div className="header__nav-burger-account-pic-container">
                        <img src={accountPicPath} className="header__nav-burger-account-pic" alt="Значок аккаунт" />
                    </div>
                </Link>

            </nav>
        </div >
    );
}
export default BurgerMenu;