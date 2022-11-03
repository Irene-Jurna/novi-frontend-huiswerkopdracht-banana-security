import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from 'axios';

function SignIn() {
    const {isAuth, loginFunction} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // 1. Het eindpoint wordt: http://localhost:3000/login
            // 2. We moeten de keys 'email' en 'password' meesturen
            const response = await axios.post('http://localhost:3000/users', {
                email: 'esther.jurna@novi.nl',
                password: '234567',
            });
            // We krijgen een token terug
            // console.log(response.data.accessToken);
            loginFunction(response.data.accessToken);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>
            {isAuth.isAuth === false &&
                <form onSubmit={handleSubmit}>
                    <p>*invoervelden*</p>
                    <button
                        type="submit"
                    >Inloggen
                    </button>
                    <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
                </form>
            }
        </>
    );
}

export default SignIn;