import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCardList({ movies, widthWindow }) {

    const location = useLocation();
    const smallScreen = widthWindow <= 767;
    const mediumScreen = widthWindow <=1279;
    const step = (mediumScreen ? (smallScreen? 5: 8) : 12);
    const [visibleMovies, setVisibleMovies] = useState(step);
    const visibleMovieSlice = movies.slice(0, visibleMovies);

    console.log(visibleMovies);

    const handleLoadMore = () => {
        setVisibleMovies(visibleMovies + step);
    }

    return (
        <section className='movies-card-list' aria-label='Список фильмов'>
            <ul className='movies-card-list__container'>
                {visibleMovieSlice.map((movie) => (
                    <MoviesCard key={movie._id} movie={movie} smallScreen={smallScreen} />
                ))}
            </ul>

            < More location={location.pathname} onClick={handleLoadMore} visibleMovies={visibleMovies} movies={movies} />

        </section>
    );
};

export default MoviesCardList;