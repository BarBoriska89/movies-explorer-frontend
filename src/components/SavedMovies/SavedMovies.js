import React from 'react';
import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Error from '../Error/Error';
import './SavedMovies.css';
import SizeTracker from '../SizeTracker/SizeTracker';

function SavedMovies({ movies, onFilterMovies, deleteMovieFromSaved, deleteMovie }) {

    const widthWindow = SizeTracker();
    const searchTextPrevious = null;
    const isShortMoviePrevious = false;

    const [isLoadedInfo, setIsLoadedInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchMovies, setSearchMovies] = useState(movies);
    const [isSearch, setIsSearch] = useState(false);


    function handleSearchSavedMovie({ inputValue, isShortMovie, isClickSearch, }) {
        setErrorMessage(null);
        setIsLoadedInfo(false);
        setIsSearch(true);

        if (isClickSearch && inputValue === '') {

            setErrorMessage('Нужно ввести ключевое слово');
            setIsLoadedInfo(true);
            return;
        }

        const filteredMovies = onFilterMovies({ movies, inputValue, isShortMovie });
        setSearchMovies(filteredMovies);
        setIsLoadedInfo(true);
    }

    return (
        <main className='main'>
            <section className='saved-movies' aria-label='Сохраненные фильмы'>

                <SearchForm
                    onSearchMovie={handleSearchSavedMovie}
                    searchTextPrevious={searchTextPrevious}
                    isShortMoviePrevious={isShortMoviePrevious}
                    movies={movies}
                />
                {
                    errorMessage ?
                        (<Error
                            errorMessage={errorMessage}
                        />)
                        :
                        (<MoviesCardList
                            movies={searchMovies}
                            widthWindow={widthWindow}
                            savedMovies={movies}
                            deleteMovieFromSaved={deleteMovieFromSaved}
                        />)

                }
            </section>
        </main>
    );
};

export default SavedMovies;