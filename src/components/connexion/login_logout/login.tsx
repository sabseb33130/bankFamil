import React, { useState, useContext } from 'react';

import { loginDefault } from '../../../constant/loginDefault';
import { urlLogin } from '../../../constant/generalConst';
import { UserContext } from '../../../contexts/userContext';

export default function Login(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { onUserChange } = useContext(UserContext);
    const [dataInput, setDataInput] = useState(loginDefault);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name, value } = e.target;
        setDataInput({ ...dataInput, [name]: value });
    };

    let [view, setView] = useState<boolean>();
    const type = view ? 'text' : 'password';
    function changeInput() {
        if (view === true) {
            setView(false);
        } else {
            setView(true);
        }
    }
    const login = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        fetchData();
    };

    async function fetchData() {
        const response = await fetch(urlLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataInput),
        });

        const responseJson = await response.json();
        if (responseJson.statusCode === 401) {
            return props.setPage('erreur401');
        }
        props.setPage('compte');
        localStorage.setItem('token', responseJson.data.access_token);
        onUserChange(responseJson.data);
    }

    return (
        <div className="">
            <a
                href="/#"
                type="button"
                className="nav-item  btn btn-success btn-sm mb-3 rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => props.setPage('accueil')}
            >
                Connexion
            </a>
            <form>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="container text-center">
                                    <label>
                                        <input
                                            onChange={(e) => inputChange(e)}
                                            type="text"
                                            name="pseudo"
                                            placeholder="pseudo"
                                        />
                                    </label>

                                    <br />
                                    <a href="/#">Pseudo oublié</a>
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <input
                                                className="ms-3"
                                                onChange={(e) => inputChange(e)}
                                                type={type}
                                                name="password"
                                                placeholder="password"
                                            />
                                        </div>
                                        <div
                                            className="bg-primary rounded-end text-light border border-0"
                                            style={{ height: 31, width: 35 }}
                                            onClick={() => changeInput()}
                                        >
                                            {view ? (
                                                <i className="bi bi-eye text-light" />
                                            ) : (
                                                <i className="bi bi-eye-slash" />
                                            )}
                                        </div>
                                    </div>

                                    <br />
                                    <a href="/#">Mot de passe oublié</a>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fermer
                                </button>
                                <button
                                    onClick={(e) => login(e)}
                                    type="submit"
                                    id="boutonLogin"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
