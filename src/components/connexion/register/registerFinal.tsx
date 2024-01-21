import { useState } from 'react';
import { baseUrl } from '../../../constant/generalConst';
import { userDefault } from '../../../constant/userDefault';
import { TUser } from '../../../types/users';

export function RegisterFinal(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    //Affichage ou non du password et du confirmedPassword
    let [view, setView] = useState<boolean>();
    let [view1, setView1] = useState<boolean>();
    const type = view ? 'text' : 'password';
    const type1 = view1 ? 'text' : 'password';
    function changeInput() {
        if (view === true) {
            setView(false);
        } else {
            setView(true);
        }
    }
    function changeInput1() {
        if (view1 === true) {
            setView1(false);
        } else {
            setView1(true);
        }
    }

    const [newUser, setNewUser] = useState<TUser>(userDefault);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setNewUser((lastNewUser) => {
            return { ...lastNewUser, [name]: e.target.value };
        });
    };

    const reponse = () => {
        props.setPage('login');
        alert(
            'Félicitation vous êtes maintenant incrit et vous pouvez partager des souvenirs. Pour cela, veuillez vous connectez',
        );
    };
    const register = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (newUser.password !== newUser.passwordConfirmed) {
            return alert('Merci de vérifier votre mot de passe !!');
        }
        fetchData();
    };

    async function fetchData() {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        const responseJson = await response.json();
        responseJson.message !== 'Utilisateur enregistré'
            ? alert(responseJson.message)
            : reponse();
    }

    return (
        <div className="container">
            <button
                type="button"
                className="btn-close "
                aria-label="Close"
                onClick={() => {
                    props.setPage('accueil');
                }}
            ></button>
            <form className=" needs-validation " noValidate>
                <div>
                    <div>
                        <label
                            htmlFor="validationCustom01"
                            className="form-label"
                        >
                            Prénom
                        </label>
                        <input
                            onChange={(e) => inputChange(e)}
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            name="prenom"
                            required
                        />
                    </div>
                    <div className="valid-feedback">Looks good!</div>

                    <div>
                        <label
                            htmlFor="validationCustom02"
                            className="form-label"
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            name="nom"
                            onChange={(e) => inputChange(e)}
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                </div>

                <div>
                    <div>
                        <label
                            htmlFor="validationCustom09"
                            className="form-label"
                        >
                            Pseudo
                        </label>
                        <input
                            onChange={(e) => inputChange(e)}
                            name="pseudo"
                            type="text"
                            placeholder="Veuillez saisir 5 caractères minimum"
                            className="form-control "
                            id="validationCustom09"
                            required
                        />
                        <div className="invalid-feedback">
                            Renseignez un pseudo valide, svp.
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="validationCustom10"
                            className="form-label"
                        >
                            Mot de passe
                        </label>
                        <div className="input-group mt-1">
                            <input
                                name="password"
                                type={type}
                                className="form-control"
                                placeholder="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32} "
                                onChange={(e) => inputChange(e)}
                                required
                                id="validationCustom10"
                                aria-label="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                                aria-describedby="validationCustom10"
                            />
                            <button
                                className="btn btn-primary rounded-end"
                                type="button"
                                id="validationCustom10"
                                onClick={() => changeInput()}
                            >
                                {view ? (
                                    <i className="bi bi-eye" />
                                ) : (
                                    <i className="bi bi-eye-slash" />
                                )}
                            </button>
                            <div className="invalid-feedback">
                                Renseignez un mot de passe correct, svp.
                            </div>{' '}
                        </div>
                    </div>
                    <label htmlFor="validationCustom11" className="form-label">
                        Vérification du mot de passe
                    </label>
                    <div className="input-group mb-3  ">
                        <input
                            placeholder="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                            name="passwordConfirmed"
                            pattern=" /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).*$/ "
                            type={type1}
                            className="form-control"
                            id="validationCustom11"
                            onChange={(e) => inputChange(e)}
                            required
                            aria-label="8 caractères minimum,contenant un majuscule, un caractère spécial et 2 nombres minumum !!"
                            aria-describedby="validationCustom11"
                        />
                        <button
                            className="btn btn-primary rounded-end"
                            type="button"
                            id="validationCustom11"
                            onClick={() => changeInput1()}
                        >
                            {view1 ? (
                                <i className="bi bi-eye" />
                            ) : (
                                <i className="bi bi-eye-slash" />
                            )}
                        </button>
                        <div className="invalid-feedback">
                            Renseignez un mot de passe correct, svp.
                        </div>
                    </div>
                    <div>
                        <button
                            aria-label="enregistrer"
                            className="btn btn-primary mt-3"
                            type="submit"
                            onClick={(e) => register(e)}
                        >
                            Valider
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
