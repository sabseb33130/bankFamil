import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/userContext';
import { getUser } from './components/user/compteUser/getUser';
import { CompteUser } from './components/user/compteUser/compteUser';
import UpdateUsers from './components/user/compteUser/updateUser';
import Login from './components/connexion/login_logout/login';
import { RegisterFinal } from './components/connexion/register/registerFinal';
import Accueil from './components/accueil';
import Header from './components/header';

function App() {
    const token: string | null = localStorage.getItem('token');
    const { user, onUserChange } = useContext(UserContext);
    // const verifConnect = token ? 'compte' : 'accueil';
    const [page, setPage] = useState('Accueil');

    useEffect(() => {
        getUser(user, onUserChange);
        // eslint-disable-next-line
    }, [token]);

    return (
        <div className="App back mb-5">
            {' '}
            <Header token={token} setPage={setPage} page={page} />
            {page === 'accueil' && token === null && <Accueil />}
            {page === 'compte' && (
                <CompteUser token={token} setPage={setPage} />
            )}
            {page === 'login' && <Login setPage={setPage} />}
            {page === 'register' && <RegisterFinal setPage={setPage} />}
            {page === 'update' && (
                <UpdateUsers token={token} setPage={setPage} />
            )}
            {page === 'erreur401' && (
                <div
                    className="container mx-auto alert alert-warning m-auto alert-dismissible fade show"
                    role="alert"
                >
                    <strong>ERREUR!</strong> Compte inexistant !?!
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setPage('accueil')}
                    ></button>
                </div>
            )}
        </div>
    );
}

export default App;
