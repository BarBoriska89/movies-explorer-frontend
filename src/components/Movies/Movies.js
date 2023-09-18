import React from "react";
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';



function Movies({ movies }) {

    return (
        <main>
        <section className="movies" aria-label="Фильмы">
            <SearchForm />
            <MoviesCardList
                movies={movies}
            />
        </section>
        </main>
    );
}

export default Movies;
