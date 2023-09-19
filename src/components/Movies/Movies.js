import React from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SizeTracker from "../SizeTracker/SizeTracker";



function Movies({ movies, onSearchMovie }) {

    const widthWindow=SizeTracker();


    return (
        <main>
            <section className="movies" aria-label="Фильмы">
                <SearchForm onSearchMovie={onSearchMovie} />
                <MoviesCardList
                    movies={movies}
                    widthWindow={widthWindow}
                />
            </section>
        </main>
    );
}

export default Movies;
