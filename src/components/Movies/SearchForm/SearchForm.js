import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm() {
    const [isCheckedBox, setIsCheckedBox] = useState(true);

    const handleChangeCheckbox = () => {
        setIsCheckedBox(!isCheckedBox);
    }

    return (
        <section className='search' aria-label='Форма поиска'>
            <form className='search__container'>
                <div className='search__form'>
                <input id='movie-search' name='movie' className='search__input' type='text' placeholder='Фильм' required />
                <button className='search__button' type='submit' />
                </div>
                <FilterCheckbox
                    isCheckedBox={isCheckedBox}
                    onClick={handleChangeCheckbox}
                />
            </form>
        </section>
    );
};

export default SearchForm;