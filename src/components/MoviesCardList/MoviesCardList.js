import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    BIG_SCREEN_STEP_ADD_CARD, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, SMALL_SCREEN_STEP_ADD_CARD,
    SMALL_SCREEN_START_VISIBLE_CARD, MEDIUM_SCREEN_START_VISIBLE_CARD, BIG_SCREEN_START_VISIBLE_CARD
} from '../../utils/constants';

function MoviesCardList({ movies, widthWindow, addMovieToSaved, deleteMovieFromSaved, savedMovies }) {

    const location = useLocation();

    const smallScreen = widthWindow <= SMALL_SCREEN_MAX_WIDTH;
    const mediumScreen = widthWindow <= MEDIUM_SCREEN_MAX_WIDTH;

    const step = (mediumScreen ? SMALL_SCREEN_STEP_ADD_CARD : BIG_SCREEN_STEP_ADD_CARD);
    const [visibleMovies, setVisibleMovies] = useState((mediumScreen ? (smallScreen ? SMALL_SCREEN_START_VISIBLE_CARD : MEDIUM_SCREEN_START_VISIBLE_CARD) : BIG_SCREEN_START_VISIBLE_CARD));

    const visibleMoviesData = movies.slice(0, visibleMovies);

    const handleLoadMore = () => {
        setVisibleMovies(visibleMovies + step);
    }

    return (
        <section className='movies-card-list' aria-label='Список фильмов'>
            <ul className='movies-card-list__container'>
                {location.pathname === '/movies' ?
                    visibleMoviesData.map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            smallScreen={smallScreen}
                            addMovieToSaved={addMovieToSaved}
                            deleteMovieFromSaved={deleteMovieFromSaved}
                            savedMovies={savedMovies}
                        />
                    ))
                    :
                    location.pathname === '/saved-movies' ?
                        movies.map((movie) => (
                            <MoviesCard
                                key={movie._id}
                                movie={movie}
                                smallScreen={smallScreen}
                                addMovieToSaved={addMovieToSaved}
                                deleteMovieFromSaved={deleteMovieFromSaved}
                                savedMovies={savedMovies}
                            />
                        )) :
                        null
                }
            </ul>
            {location.pathname === '/movies' ?
                visibleMovies < movies.length &&
                < More location={location.pathname} onClick={handleLoadMore} visibleMovies={visibleMovies} movies={movies} />
                :
                null
            }
        </section>
    );
};

export default MoviesCardList;