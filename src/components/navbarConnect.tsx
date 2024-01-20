import Login from './connexion/login_logout/login';
import Logout from './connexion/login_logout/logout';

export default function Navbar(props: {
    token: string | null;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className=" container-fluid border border-0">
            <nav className="navbar navbar-expand-lg justify-content-end border border-0">
                <button
                    className="navbar-toggler text-end  "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <div className="d-flex justify-content-between text-center">
                        <div>MENU</div>
                        <div>
                            <i className="bi bi-person-circle ms-5"></i>
                        </div>
                    </div>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    <ul className="nav ">
                        {props.token ? (
                            <>
                                <li className="nav-item dropdown  mt-1">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Mon compte
                                    </a>
                                    <ul className="dropdown-menu component">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="./#"
                                                onClick={() => {
                                                    props.setPage('compte');
                                                }}
                                            >
                                                Accueil
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/#"
                                                onClick={() =>
                                                    props.setPage('compteope')
                                                }
                                            >
                                                Ajouter une opération
                                            </a>
                                        </li>{' '}
                                        <hr className="dropdown-divider" />
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/#"
                                                onClick={() => {
                                                    props.setPage(
                                                        'compteRecep',
                                                    );
                                                }}
                                            >
                                                Mes comptes
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            ''
                        )}
                        <li>
                            {props.token ? (
                                <>
                                    <Logout setPage={props.setPage} />
                                </>
                            ) : (
                                <>
                                    <li className="nav-item ">
                                        <Login setPage={props.setPage} />
                                    </li>
                                    <li>
                                        <button
                                            className="nav-item  btn btn-primary me-3 btn-sm rounded-pill"
                                            onClick={() =>
                                                props.setPage('register')
                                            }
                                        >
                                            S'enregistrer
                                        </button>
                                    </li>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
