import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({movies}) {

    return(
        <section className='saved-movies' aria-label='Сохраненные фильмы'>
            <SearchForm />
            <MoviesCardList movies={movies}/>
          
        </section>
    );
};

export default SavedMovies;