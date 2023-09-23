import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';

function SearchForm({ onSearchMovie, searchTextPrevious, isShortMoviePrevious, movies }) {

    const [isShortMovie, setIsShortMovie] = useState(isShortMoviePrevious);
    const [inputValue, setInputValue] = useState(searchTextPrevious || '');
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
        onSearchMovie({ inputValue, isShortMovie, isClickSearch });
    }

    useEffect(() => {

        onSearchMovie({ inputValue, isShortMovie, isClickSearch });
    }, [isShortMovie, movies, isClickSearch]);

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