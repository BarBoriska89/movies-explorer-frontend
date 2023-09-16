import './BurgerMenuButton.css';

function BurgerMenuButton({ handleOpen }) {
    return (
        <div className='nav__burger'>
            <button className='nav__burger-button' type="button" onClick={handleOpen} />
        </div>
    );
}
export default BurgerMenuButton;