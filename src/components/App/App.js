import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem('isLogged')));

  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [requestError, setRequestError] = useState('');


  useEffect(() => {
    setRequestError('');
    if (isLogged) {

      mainApi
        .getUser()
        .then((userData) => {
          setCurrentUser(userData);
        }
        )
        .catch((err) =>
          console.log("На сервере произошла ошибка. ", err));

      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })

        .catch((err) => console.log("На сервере произошла ошибка.", err));
    }
  }
    , [isLogged]);

  function resetRequestError() {
    setRequestError('');
  }

  function onLogin(user) {

    mainApi
      .authorize(user.email, user.password)
      .then((data) => {

        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLogged(true);
          localStorage.setItem('isLogged', true);
          navigate("/movies", { replace: true });
        }
      })
      .catch(err => {
        if (err === 'Ошибка: 401') {
          setRequestError('Вы ввели неправильный логин или пароль.');
        } else {
          setRequestError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
      })
  };



  async function handleRegister(user) {
    await mainApi
      .register(user.name, user.email, user.password)
      .then(() => {
        onLogin(user);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRequestError('Пользователь с таким email уже существует.');
        } else {
          setRequestError('При регистрации пользователя произошла ошибка.');
        }
      });
  }

  function onUpdateProfile(user) {

    mainApi
      .updateUser(user.name, user.email)
      .then((data) => {
        setCurrentUser(data);
        setRequestError('Редактирование данных пользователя завершено успешно');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRequestError('Пользователь с таким email уже существует.');
        } else {
          setRequestError('При обновлении профиля произошла ошибка.');
        }
      });
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
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteMovieFromSaved(movie) {
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
                requestError={requestError}
                resetRequestError={resetRequestError}
              />
            } />

            <Route path='/signup' element={
              <Register
                currentUser={currentUser}
                onRegister={handleRegister}
                requestError={requestError}
              />
            } />

            <Route path='/signin' element={
              <Login
                currentUser={currentUser}
                onLogin={onLogin}
                requestError={requestError}
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
