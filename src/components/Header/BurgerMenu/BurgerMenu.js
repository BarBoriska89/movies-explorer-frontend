import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import accountPicPath from '../../../images/icon__account.png';

function BurgerMenu({ handleClose }) {
    const location = useLocation();
    console.log(location);

    return (
        <div className='nav__burger-menu'>
            <button className='nav__burger-close' type="button" onClick={handleClose} />
            <nav className='nav__burger-links'>
                <ul className="nav__burger-links-list">
                    <li><Link to="/" className={`nav__burger-link ${location.pathname === '/' ? 'nav__burger-link_active' : ''}`} onClick={handleClose} >Главная</Link></li>
                    <li><Link to="/movies" className={`nav__burger-link ${location.pathname === '/movies' ? 'nav__burger-link_active' : ''}`} onClick={handleClose} >Фильмы</Link></li>
                    <li><Link to="/saved-movies" className={`nav__burger-link ${location.pathname === '/saved-movies' ? 'nav__burger-link_active' : ''}`} onClick={handleClose}>Сохранённые фильмы</Link></li>
                </ul>
                <Link to="/profile" className="nav__burger-link nav__burger-link-account">
                    <span className="nav__burger-account">Аккаунт</span>
                    <div className="nav__burger-account-pic-container">
                        <img src={accountPicPath} className="nav__burger-account-pic" alt="Значок аккаунт" />
                    </div>
                </Link>

            </nav>
        </div >
    );
}
export default BurgerMenu;