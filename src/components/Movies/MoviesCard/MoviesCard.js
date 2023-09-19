import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSavedMovies } from '../../../contexts/SavedMoviesContext';

function MoviesCard({ movie , smallScreen}) {

    const [isLiked, setIsLiked] = useState(false);
    const {addMovieToSaved, deleteMovieFromSaved} = useSavedMovies();

    const location = useLocation();
    console.log(location.pathname);

    const handleCardLike = () => {
        setIsLiked(!isLiked);

        if(!isLiked) {
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
            <img className='movies-card__img' src={movie.image} alt={movie.title} />

            <div className='movies-card__caption'>
                <div className='movies-card__info'>
                    <h2 className='movies-card__text movies-card__text-overflow'>{movie.title}</h2>
                    <p className='movies-card__duration'>{movie.duration}</p>
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