import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    });

    const handleSignUp = (user) => {
        setCurrentUser({
            name: user.name,
            email: user.email,
            password: user.password
        });
        console.log(currentUser);
    }

    const handleSignIn = (user) => {
        console.log(user);
        console.log(currentUser);
        if (currentUser.email === user.email && currentUser.password === user.password){
            return true;
        } else{
            return false;
        }
/*        setCurrentUser({
            email: user.email,
            password: user.password
        });
    */  }

    const handleUpdateProfile = (user) => {
        setCurrentUser({
            name: user.name,
            email: user.email
        });
    }

    const handleSignOut = () => {
        setCurrentUser(null);
    }


    return (
        <CurrentUserContext.Provider value={{ currentUser, handleSignUp, handleSignIn, handleUpdateProfile, handleSignOut }}>
            {children}
        </CurrentUserContext.Provider>
    );

};
