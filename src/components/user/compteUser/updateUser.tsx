import { useState, useContext } from 'react';

import { baseUrl } from '../../../constant/generalConst';
import { UserContext } from '../../../contexts/userContext';

export default function UpdateUsers(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    token: string | null;
}) {
    const { user, onUserChange } = useContext(UserContext);

    const { access_token, ...newUSer } = user;
    const [userUpdated, setUserUpdated] = useState(newUSer);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setUserUpdated((userUpdate) => {
            return { ...userUpdate, [name]: e.target.value };
        });
    };

    const update = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        const jsonUser = JSON.stringify(userUpdated);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${props.token}`,
            },
            body: jsonUser,
        };

        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => onUserChange(donnee.data.userUpdate))
            .catch((erreur) => `${erreur}`);
    };

    return (
        <div className="container-fluid">
            {' '}
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                    props.setPage('compte');
                }}
            ></button>
            <form className="row g-3 needs-validation" noValidate>
                <br />
                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                        Prénom
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="prenom"
                        defaultValue={user?.prenom}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="nom"
                        defaultValue={user?.nom}
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-6">
                    <label
                        htmlFor="validationCustomUsername"
                        className="form-label"
                    >
                        Email
                    </label>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom09" className="form-label">
                        Pseudo
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        name="pseudo"
                        defaultValue={user.pseudo}
                        type="text"
                        placeholder="Veuillez saisir 5 caractères minimum"
                        className="form-control"
                        id="validationCustom09"
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez un pseudo valide, svp.
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                            update(e);
                            props.setPage('compte');
                        }}
                    >
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
}
