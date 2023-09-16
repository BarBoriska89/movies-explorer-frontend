import { createContext, useContext, useState } from "react";

const SavedMoviesContext = createContext();

export const useSavedMovies = () =>{
    return useContext(SavedMoviesContext);
};

export const SavedMoviesProvider = ({children}) => {
    const [savedMovies, setSavedMovies] = useState([]);

    const addMovieToSaved = (movie) => {
        setSavedMovies([...savedMovies, movie]);
    };

    const deleteMovieFromSaved = (movie) => {
        const newMoviesList = savedMovies.filter((item) => item._id !== movie._id);
        setSavedMovies(newMoviesList);
    };

    return (
        <SavedMoviesContext.Provider value={{ savedMovies, addMovieToSaved, deleteMovieFromSaved }}>
          {children}
        </SavedMoviesContext.Provider>
      );
}