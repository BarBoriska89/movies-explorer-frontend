import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';
import useFormAndValidation from '../../../hooks/useFormAndValidation';

function SearchForm({ onSearchMovie }) {

    const [isShortMovie, setIsShortMovie] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isClickSearch, setIsClickSearch] = useState(false);


    const handleChangeCheckbox = () => {
        setIsShortMovie(!isShortMovie);
    }

    const handleChange = (evt) => {
        setInputValue(evt.target.value);
    }


    const onSubmit = (evt) => {
        evt.preventDefault();
        setIsClickSearch(true);
        console.log(inputValue);
        //onSearchMovie({ inputValue, isShortMovie,isClickSearch });
    }

    useEffect(() => {
        console.log(isShortMovie);
        onSearchMovie({ inputValue, isShortMovie,isClickSearch });
    }, [ isShortMovie, isClickSearch]);

    return (
        <section className='search' aria-label='Форма поиска'>
            <form className='search__container' onSubmit={onSubmit}>
                <div className='search__form'>
                    <input id='movie-search' name='movie' className='search__input' type='text' value={inputValue || ''}
                        placeholder='Фильм' onChange={handleChange} autoComplete='off' />
                    <button className='button search__button' type='submit' />
                </div>
                <FilterCheckbox
                    isShortMovie={isShortMovie}
                    onClick={handleChangeCheckbox}
                />
            </form>
        </section>
    );
};

export default SearchForm;