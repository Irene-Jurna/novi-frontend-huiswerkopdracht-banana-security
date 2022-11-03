import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    function login(token) {
        console.log(token);
        // DOOR CONTEXT:
        // - Token opslaan in de localStorage
        localStorage.setItem('token', token);
        // Token decoden om te kijken wat er allemaal te vinden is
        const decodedToken = jwtDecode(token);
        console.log('decoded token:', decodedToken);

        //  -Indien nodig, nieuwe data opvragen van gebruiker
        // Async function (get request) nodig om specifieke gegevens van gebruiker op te halen


        // - Zorgen dat die gegevens worden opgeslagen in Context
        // - Authentication naar true

        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                // Gebruikersnaam nog doen?
                id: decodedToken.sub,
            }
        });
        history.push('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd');
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth,
        loginFunction: login,
        logoutFunction: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;