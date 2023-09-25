import React from 'react';
import './BurgerMenuButton.css';

function BurgerMenuButton({ handleOpen }) {
    return (
        <div className='header__nav-burger'>
            <button className='button header__nav-burger-button' type="button" onClick={handleOpen} />
        </div>
    );
}
export default BurgerMenuButton;