import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const {isAuth, loginFunction} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        loginFunction();
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