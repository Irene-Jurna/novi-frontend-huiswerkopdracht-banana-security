import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {
        // DOOR CONTEXT:
        // - Token opslaan in de localStorage
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT, '/profile');
    }

        function logout() {
            localStorage.clear();
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            console.log('Gebruiker is uitgelogd');
            history.push('/');
        }

        //  -Indien nodig, nieuwe data opvragen van gebruiker
        // Async function (get request) nodig om specifieke gegevens van gebruiker op te halen

    async function fetchUserData(id, token, redirectUrl) {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: result.data.username,
                        email: result.data.email,
                        id: result.data.id,
                    },
                    status: 'done',
                });
                if (redirectUrl) {
                    history.push(redirectUrl);
                }
            } catch (e) {
                console.error(e);
                toggleIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        }

        // - Zorgen dat die gegevens worden opgeslagen in Context
        const contextData = {
            isAuth: isAuth.isAuth,
            user: isAuth.user,
            login: login,
            logout: logout,
        };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;