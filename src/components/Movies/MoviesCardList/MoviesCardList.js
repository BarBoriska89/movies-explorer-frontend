import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCardList({ movies }) {

    const location = useLocation();
    const [visibleMovies, setVisibleMovies] = useState(12);
    const visibleMovieSlice = movies.slice(0, visibleMovies);

    console.log(visibleMovies);

    const handleLoadMore = () => {
        setVisibleMovies(visibleMovies + 12);
    }

    return (
        <section className='movies-card-list' aria-label='Список фильмов'>
            <ul className='movies-card-list__container'>
                {visibleMovieSlice.map((movie) => (
                    <MoviesCard key={movie._id} movie={movie} />
                ))}
            </ul>

            < More location={location.pathname} onClick={handleLoadMore} visibleMovies={visibleMovies} movies={movies} />

        </section>
    );
};

export default MoviesCardList;