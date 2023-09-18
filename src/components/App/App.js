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

function App() {

  const navigate = useNavigate();

  const [isLogged, setIsLogged] = React.useState(false);
  const { savedMovies } = useSavedMovies();
  const { currentUser, handleSignUp, handleSignIn, handleUpdateProfile, handleSignOut } = useCurrentUser();
  console.log(savedMovies);

  function onLogin(user) {
      setIsLogged(handleSignIn(user));
    console.log(isLogged);
    navigate('/', { replace: true });
  }

  function onRegister(user) {
    handleSignUp(user);
    console.log(currentUser);
    navigate('/signin', { replace: true });
  }

  function onUpdateProfile(user) {
    handleUpdateProfile(user);
    navigate('/', { replace: true });
  }

  function onSignOut() {
    handleSignOut();
    navigate('/', { replace: true });
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
              movies={movies}
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
            onRegister={onRegister}
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

export default App;
