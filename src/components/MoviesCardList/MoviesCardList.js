import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCardList({ movies, widthWindow, addMovieToSaved, deleteMovieFromSaved, savedMovies }) {

    const location = useLocation();

    const smallScreen = widthWindow <= 767;
    const mediumScreen = widthWindow <= 1279;

    const step = (mediumScreen ? (smallScreen ? 1 : 2) : 3);
    const [visibleMovies, setVisibleMovies] = useState((mediumScreen ? (smallScreen ? 5 : 8) : 12));

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
                        visibleMoviesData.map((movie) => (
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
            {visibleMovies < movies.length &&
                < More location={location.pathname} onClick={handleLoadMore} visibleMovies={visibleMovies} movies={movies} />
            }
        </section>
    );
};

export default MoviesCardList;