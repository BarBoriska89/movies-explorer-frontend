import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSavedMovies } from '../../../contexts/SavedMoviesContext';
import { URL_BFM } from '../../../utils/constants';

function MoviesCard({ movie, smallScreen }) {

    console.log(movie);
    console.log(movie.nameRU);
    console.log(movie.nameEN);
    console.log(movie.duration);
    console.log(movie.trailerLink);
    console.log(movie.image.url);
    const [isLiked, setIsLiked] = useState(false);
    const { addMovieToSaved, deleteMovieFromSaved } = useSavedMovies();

    const location = useLocation();
    console.log(location.pathname);

    const durationMovie = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}мин`;

    const handleCardLike = () => {
        setIsLiked(!isLiked);

        if (!isLiked) {
            addMovieToSaved(movie);
        } else {
            deleteMovieFromSaved(movie);
        }
    };

    const handleDeleteMovie = () => {
        deleteMovieFromSaved(movie);
    };

    const likeButtonClass = (`button movies-card__like ${isLiked && 'movies-card__like_active'}`);

    return (
        <li className='movies-card'>
            <a href={movie.trailerLink} className='movie-card__link' target='_blank' rel="noreferrer">
                <img className='movies-card__img' src={`${URL_BFM}/${movie.image.url}`} alt={movie.nameRU} />
            </a>
            <div className='movies-card__caption'>
                <div className='movies-card__info'>
                    <h2 className='movies-card__text movies-card__text-overflow'>{movie.nameRU}</h2>
                    <p className='movies-card__duration'>{durationMovie}</p>
                </div>
                {location.pathname === '/movies' ?
                    <button className={likeButtonClass} type='button' aria-label='Нравится' onClick={handleCardLike} />
                    :
                    <div className='movies-card__delete-container'>
                        <button className={`button movies-card__delete ${smallScreen ? 'movies-card__delete_visible' : ''}`} type='button' aria-label='Удалить из сохраненных' onClick={handleDeleteMovie} />
                    </div>
                }
            </div>
        </li>


    );
};

export default MoviesCard;