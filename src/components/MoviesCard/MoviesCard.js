import React from 'react';
import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { URL_BFM } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, smallScreen, addMovieToSaved, deleteMovieFromSaved, savedMovies, }) {

    const location = useLocation();
    let imagePath;

    location.pathname === '/movies' ? imagePath = `${URL_BFM}/${movie.image.url}` : imagePath = movie.image;

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const isThisMovieSaved = savedMovies.some(({ movieId }) => movieId === movie.id);
        setIsLiked(isThisMovieSaved);
    }, [savedMovies, movie]);

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
                <img className='movies-card__img' src={imagePath} alt={movie.nameRU} />
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
                        <button className={`button movies-card__delete ${smallScreen ? 'movies-card__delete_visible' : ''}`} type='button' aria-label='Удалить из сохраненных'
                            onClick={handleDeleteMovie} />
                    </div>
                }
            </div>
        </li>


    );
};

export default MoviesCard;