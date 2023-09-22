import { useEffect, useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import Error from '../Error/Error';
import './SavedMovies.css';
import SizeTracker from '../SizeTracker/SizeTracker';
import mainApi from '../../utils/MainApi';


function SavedMovies({ movies, onFilterMovies, deleteMovieFromSaved, deleteMovie }) {

    const widthWindow = SizeTracker();
    const searchTextPrevious = null;
    const isShortMoviePrevious = false;
    console.log(movies);
    const [isLoadedInfo, setIsLoadedInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchMovies, setSearchMovies] = useState(movies);
    const [isSearch, setIsSearch] = useState(false);

    //deleteMovie ? setIsSearch(false) : setIsSearch(true);
    console.log(isSearch);
    function handleSearchSavedMovie({ inputValue, isShortMovie, isClickSearch, }) {
        setErrorMessage(null);
        setIsLoadedInfo(false);
        setIsSearch(true);
        //error
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
        <main>
            <section className='saved-movies' aria-label='Сохраненные фильмы'>

                <SearchForm
                    onSearchMovie={handleSearchSavedMovie}
                    searchTextPrevious={searchTextPrevious}
                    isShortMoviePrevious={isShortMoviePrevious}
                />
                {
                    errorMessage ?
                        (<Error
                            errorMessage={errorMessage}
                        />)
                        :
                        (<MoviesCardList
                            movies={deleteMovie ? movies : searchMovies}
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