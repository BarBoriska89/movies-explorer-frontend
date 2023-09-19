import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';
import SizeTracker from '../SizeTracker/SizeTracker';

function SavedMovies({ movies, onSearchMovie }) {

    const widthWindow = SizeTracker();

    return (
        <main>
            <section className='saved-movies' aria-label='Сохраненные фильмы'>
                <SearchForm onSearchMovie={onSearchMovie} />
                <MoviesCardList
                    movies={movies}
                    widthWindow={widthWindow}
                />
            </section>
        </main>
    );
};

export default SavedMovies;