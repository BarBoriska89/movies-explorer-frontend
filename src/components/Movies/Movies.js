import React, { useEffect, useState } from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import Error from "../Error/Error";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SizeTracker from "../SizeTracker/SizeTracker";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";



function Movies({ onFilterMovies, addMovieToSaved , deleteMovieFromSaved, savedMovies}) {

    const searchMoviesPrevious = (JSON.parse(localStorage.getItem('filteredMovies'))) || [];
    const searchTextPrevious = localStorage.getItem('search-text') || '';
    const isShortMoviePrevious = JSON.parse(localStorage.getItem('isShortMovie')) || false;

    const [searchMovies, setSearchMovies] = useState(searchMoviesPrevious);
    const widthWindow = SizeTracker();
    const [isLoadedInfo, setIsLoadedInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    function handleSearchMovie({ inputValue, isShortMovie, isClickSearch, }) {

        setErrorMessage(null);
        setIsLoadedInfo(false);
        //error
        if (isClickSearch && inputValue === '') {

            setErrorMessage('Нужно ввести ключевое слово');
            setIsLoadedInfo(true);
            return;
        }


        moviesApi
            .getMovies()
            .then((movies) => {
                localStorage.setItem('allMovies', JSON.stringify(movies));
                localStorage.setItem('search-text', inputValue);
                localStorage.setItem('isShortMovie', isShortMovie);
                const filteredMovies = onFilterMovies({ movies, inputValue, isShortMovie });
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setSearchMovies(filteredMovies);
                setIsLoadedInfo(true);
            })
            .catch((error) => {
                setErrorMessage('Опаньки!');
                console.error(error);
            })
    }
    return (
        <main>
            <section className="movies" aria-label="Фильмы">
                <SearchForm
                    onSearchMovie={handleSearchMovie}
                    searchTextPrevious={searchTextPrevious}
                    isShortMoviePrevious={isShortMoviePrevious}
                />
                {
                    errorMessage ?
                        (<Error
                            errorMessage={errorMessage}
                        />)
                        :
                        isLoadedInfo ?

                            (<MoviesCardList
                                movies={searchMovies}
                                widthWindow={widthWindow}
                                addMovieToSaved={addMovieToSaved}
                                deleteMovieFromSaved={deleteMovieFromSaved}
                                savedMovies={savedMovies}
                            />)
                            :
                            (<Preloader />)
                }
            </section>
        </main>
    );
}

export default Movies;
