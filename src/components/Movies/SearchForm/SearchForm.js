import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm() {
    const [isCheckedBox, setIsCheckedBox] = useState(true);

    const handleChangeCheckbox = () => {
        setIsCheckedBox(!isCheckedBox);
    }

    return (
        <section className='search-form' aria-label='Форма поиска'>
            <form className='search-form__container'>
                <input id='movie-search' name='movie' className='search-form__input' type='text' placeholder='Фильм' required />
                <button className='search-form__button' type='submit' />
            </form>
            <FilterCheckbox
                isCheckedBox={isCheckedBox}
                onClick={handleChangeCheckbox}
            />
        </section>
    );
};

export default SearchForm;