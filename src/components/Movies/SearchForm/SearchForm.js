import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';
import useFormAndValidation from '../../../hooks/useFormAndValidation';

function SearchForm({ onSearchMovie }) {

    const [isCheckedBox, setIsCheckedBox] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const handleChangeCheckbox = () => {
        setIsCheckedBox(!isCheckedBox);
        if (inputValue) {
            onSearchMovie({ inputValue, isCheckedBox });
        }
        else {
            console.log('Нужно ввести ключевое слово');
        }
    }

    const handleChange = (evt) => {
        setInputValue(evt.target.value);
    }


    const onSubmit = (evt) => {
        evt.preventDefault();
        if (inputValue) {
            onSearchMovie({ inputValue, isCheckedBox });
        }
        else {
            console.log('Нужно ввести ключевое слово');
        }
    }

    return (
        <section className='search' aria-label='Форма поиска'>
            <form className='search__container' onSubmit={onSubmit}>
                <div className='search__form'>
                    <input id='movie-search' name='movie' className='search__input' type='text' value={inputValue || ''}
                        placeholder='Фильм' required onChange={handleChange} />
                    <button className='button search__button' type='submit' />
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