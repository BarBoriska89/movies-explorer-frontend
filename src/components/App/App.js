import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Auth/Profile/Profile';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { movies } from '../../utils/constants';

import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem('isLogged')));

  //const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')));
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteMovie, setDeleteMovie] = useState(false);
  //console.log(savedMovies);

  useEffect(() => {

    if (isLogged) {

      mainApi
        .getUser()
        .then((userData) => {
          setCurrentUser(userData);
        }
        )
        .catch((err) => console.log("Ошибка запроса данных о пользователе ", err));

      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })

        .catch((err) => console.log("Ошибка запроса сохраненных фильмов ", err));
    }
  }
    , [isLogged]);



  function onLogin(user) {

    mainApi
      .authorize(user.email, user.password)
      .then((data) => {

        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLogged(true);
          localStorage.setItem('isLogged', true);
          navigate("/", { replace: true });
        }
      })
      .then(() => console.log(isLogged))
      .catch(err => console.log(err));

  }

  async function handleRegister(user) {
    await mainApi
      .register(user.name, user.email, user.password)
      .then(() => {
        onLogin(user);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onUpdateProfile(user) {

    mainApi
      .updateUser(user.name, user.email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function onSignOut() {
    setIsLogged(false);
    setCurrentUser({});
    localStorage.removeItem('isLogged');
    localStorage.removeItem('jwt');
    localStorage.removeItem('search-text');
    localStorage.removeItem('isShortMovie');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('allMovies');
    navigate('/');
  }


  function handleAddMovieToSaved(movie) {

    mainApi
      .addMovie(
        movie.country,
        movie.director,
        movie.duration,
        movie.year,
        movie.description,
        movie.image,
        movie.trailerLink,
        movie.id,
        movie.nameRU,
        movie.nameEN,
      )
      .then((newSavedMovie) => {
        console.log(newSavedMovie);
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteMovieFromSaved(movie) {
    console.log(movie);
    console.log(movie.id);
    let movieForDelete;
    if (location.pathname === '/saved-movies') {
      movieForDelete = movie;
    } else {
      movieForDelete = savedMovies.find(({ movieId }) => movieId === movie.id);
    }
    mainApi
      .deleteMovie(
        movieForDelete._id
      )
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.movieId !== movieForDelete.movieId);
        setSavedMovies(updatedSavedMovies);
        setDeleteMovie(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleFilterMovies({ movies, inputValue, isShortMovie }) {

    let filterOnInputValue = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())
        || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase());
    });

    let filterShortMovies = [];

    if (isShortMovie) {
      filterShortMovies = filterOnInputValue.filter((movie) => {
        return movie.duration <= 52;
      });
    }
    if (isShortMovie) {
      return filterShortMovies;
    }
    else {
      return filterOnInputValue;
    }
  }




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <div className="App">
          <Header
            isLogged={isLogged}
          />
          <Routes>
            <Route path='/' element={
              <Main />
            } />

            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                isLogged={isLogged}
                onFilterMovies={handleFilterMovies}
                addMovieToSaved={handleAddMovieToSaved}
                deleteMovieFromSaved={handleDeleteMovieFromSaved}
                savedMovies={savedMovies}
              />
            } />

            <Route path='/saved-movies' element={
              <ProtectedRoute
                element={SavedMovies}
                movies={savedMovies}
                isLogged={isLogged}
                onFilterMovies={handleFilterMovies}
                deleteMovieFromSaved={handleDeleteMovieFromSaved}
                deleteMovie={deleteMovie}
              />
            } />

            <Route path='/profile' element={
              <ProtectedRoute
                element={Profile}
                isLogged={isLogged}
                currentUser={currentUser}
                onUpdate={onUpdateProfile}
                onSignOut={onSignOut}
              />
            } />

            <Route path='/signup' element={
              <Register
                currentUser={currentUser}
                onRegister={handleRegister}
              />
            } />

            <Route path='/signin' element={
              <Login
                currentUser={currentUser}
                onLogin={onLogin}
              />
            } />

            <Route path='*' element={
              <NotFound />
            } />
          </Routes>
          <Footer />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

document.documentElement.lang = 'ru';
document.title = 'Movies Explorer';

export default App;
