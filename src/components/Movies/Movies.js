import React, { useState } from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import Error from "../Error/Error";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SizeTracker from "../SizeTracker/SizeTracker";
import moviesApi from "../../utils/MoviesApi";



function Movies({ onFilterMovies }) {

    const [searchMovies, setSearchMovies] = useState([]);
    const widthWindow = SizeTracker();
    const [isLoadedInfo, setIsLoadedInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    function handleSearchMovie({ inputValue, isShortMovie, isClickSearch }) {
       
        setErrorMessage(null);
        //error
        if (isClickSearch) {
            setIsLoadedInfo(false);
            if (inputValue === '') {
                setErrorMessage('Нужно ввести ключевое слово');
                setIsLoadedInfo(true);
                return;
            } else {
                setErrorMessage(null);
                moviesApi
                    .getMovies()
                    .then((movies) => {
                        localStorage.setItem('allMovies', JSON.stringify(movies));

                        const filteredMovies = onFilterMovies({ movies, inputValue, isShortMovie });
                        console.log(filteredMovies);
                        setSearchMovies(filteredMovies);
                        setIsLoadedInfo(true);

                    })
                    .catch((error) => {
                        setErrorMessage('Опаньки!');
                        console.error(error);
                    })
            }
        }

    }


    return (
        <main>
            <section className="movies" aria-label="Фильмы">
                <SearchForm onSearchMovie={handleSearchMovie} />
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
                            />)
                            :
                            (<Preloader />)
                }
            </section>
        </main>
    );
}

export default Movies;
