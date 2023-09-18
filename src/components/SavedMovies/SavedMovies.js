import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies }) {

    return (
        <main>
            <section className='saved-movies' aria-label='Сохраненные фильмы'>
                <SearchForm />
                <MoviesCardList movies={movies} />
            </section>
        </main>
    );
};

export default SavedMovies;