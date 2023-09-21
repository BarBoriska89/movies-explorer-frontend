import React from 'react';
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
import { useSavedMovies } from '../../contexts/SavedMoviesContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function App() {

  const navigate = useNavigate();

  const [isLogged, setIsLogged] = React.useState(true);
  const { savedMovies } = useSavedMovies();
  const { currentUser, handleSignUp, handleSignIn, handleUpdateProfile, handleSignOut } = useCurrentUser();
  console.log(savedMovies);

  function onLogin(user) {
    console.log(user);
    mainApi
      .authorize(user.email, user.password)
      .then((data) => {
        console.log(isLogged);
        console.log(data);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          console.log(isLogged);
          setIsLogged(true);
          //          setIsLogged(handleSignIn(user));
          console.log(isLogged);
          navigate("/", { replace: true });
        }
      })
      .then(() => console.log(isLogged))
      .catch(err => console.log(err));

  }

  async function handleRegister(user) {
    console.log(user);
   await mainApi
      .register(user.name, user.email, user.password)
      .then(() => {
      
        // onLogin(user);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onUpdateProfile(user) {
    handleUpdateProfile(user);
    navigate('/', { replace: true });
  }

  function onSignOut() {
    handleSignOut();
    navigate('/', { replace: true });
  }

  function handleFilterMovies({ movies, inputValue, isShortMovie }) {

    console.log(isShortMovie);
    console.log(inputValue);

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
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <Header
              isLogged={isLogged}
            />
            <Main />
            <Footer />
          </>
        } />

        <Route path='/movies' element={
          <>
            <Header
              isLogged={isLogged}
            />
            <Movies
              //  movies={movies}
              onFilterMovies={handleFilterMovies}
            />
            <Footer />
          </>
        } />

        <Route path='/saved-movies' element={
          <>
            <Header
              isLogged={isLogged}
            />
            <SavedMovies
              movies={savedMovies}
            />
            <Footer />
          </>
        } />

        <Route path='/profile' element={
          <>
            <Header
              isLogged={isLogged}
            />
            <Profile
              currentUser={currentUser}
              onUpdate={onUpdateProfile}
              onSignOut={onSignOut}
            />
          </>
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
    </div>
  );
}

document.documentElement.lang = 'ru';
document.title = 'Movies Explorer';

export default App;
