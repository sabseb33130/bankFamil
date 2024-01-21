import { useEffect, useState } from 'react';
import { TCompte } from '../../types/compte';
import { compteUrl } from '../../constant/generalConst';
import { TUser } from '../../types/users';

export default function PostCompte(props: {
    user: TUser;
    onUserChange: (value: TUser) => void;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const token = localStorage.getItem('token');
    const [operation, setOperation] = useState('');
    const [date, setDate] = useState('');
    const [montant, setMontant] = useState(0);
    const [type, setType] = useState('');
    const [test, setTest] = useState('testa');
    const [visible, setVisible] = useState(false);
    const visi = visible === false ? 'd-none' : 'd-block';
    const visi1 = visible === true ? 'd-none' : 'd-block';

    const inputOperation = (e: React.BaseSyntheticEvent) => {
        setOperation(e.target.value);
    };
    const inputDate = (e: React.BaseSyntheticEvent) => {
        setDate(e.target.value.toString());
    };
    const inputMontant = (e: React.BaseSyntheticEvent) => {
        setMontant(e.target.value);
    };
    const inputType = (e: React.BaseSyntheticEvent) => {
        setType(e.target.value);
    };
    const value: number = (() => {
        switch (type) {
            case 'Crédit':
                return montant;
            case 'Virement (crédit)':
                return montant;
            case 'Dépense':
                return -montant;
            case 'Virement (Dépense)':
                return -montant;
            default:
                return -montant;
        }
    })();
    const bodyObject = {
        operation: operation,
        date: date,
        montant: Number(value),
        type: type,
    };

    const bodyPost = JSON.stringify(bodyObject);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: bodyPost,
    };

    useEffect(() => {
        fetch(compteUrl, options)
            .then((response) => response.json())

            .then((data) => {
                const addope = (value: TCompte) => {
                    const newModif = { ...props.user };
                    props.setPage('compte');
                    props.onUserChange(newModif);
                };
                addope(data.data);
            })
            .catch((err) => console.error(err));
    }, [test]);

    return (
        <div className="container-fluid">
            <button
                className={`btn btn-success  rounded-pill border border-2 border-dark ${visi1} mb-5`}
                onClick={() => setVisible(true)}
            >
                creer une opération
            </button>
            <button
                className={`btn btn-info  rounded-pill border border-2 border-dark ${visi} mb-5`}
                onClick={() => setVisible(false)}
            >
                fermer la création d'opération
            </button>
            <form
                method="submit"
                className={`d-flex flex-column container ${visi}`}
            >
                <div className="text-center">
                    {' '}
                    <label className="me-5 mt-2">Opération</label>
                    <input
                        className=""
                        type="text"
                        name="operation"
                        onChange={(e) => inputOperation(e)}
                    />
                </div>
                <div className="text-center">
                    <label className="me-5 mt-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        onChange={(e) => inputDate(e)}
                    />
                </div>
                <div className="text-center">
                    <label className="me-5 mt-2">Montant</label>
                    <input
                        type="number"
                        name="montant"
                        onChange={(e) => inputMontant(e)}
                    />
                </div>
                <div className="text-center">
                    <label className="me-5 mt-2">Type</label>
                    <select name="type" onChange={(e) => inputType(e)}>
                        <option></option>
                        <option>Crédit</option>
                        <option>Dépense</option>
                        <option>Virement (crédit)</option>
                        <option>Virement (dépense)</option>
                    </select>
                </div>{' '}
                <div>
                    {' '}
                    <button
                        className="btn btn-success mt-5"
                        onClick={() => {
                            setTest('test');
                        }}
                    >
                        valider
                    </button>
                </div>
            </form>
        </div>
    );
}
