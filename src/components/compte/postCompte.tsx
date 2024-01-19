import { useEffect, useState } from 'react';
import { TCompte } from '../../types/compte';
import { compteUrl } from '../../constant/generalConst';
import { setPriority } from 'os';

export default function PostCompte() {
    const [recup, setRecup] = useState<TCompte>();
    const token = localStorage.getItem('token');
    const [operation, setOperation] = useState('');
    const [date, setDate] = useState('');
    const [montant, setMontant] = useState(0);
    const [type, setType] = useState('');
    const [test, setTest] = useState('testa');
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

    const bodyObject = {
        operation: operation,
        date: date,
        montant: Number(montant),
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
                setRecup(data.data);
            })
            .catch((err) => console.error(err));
    }, [test]);

    return (
        <div className="container-fluid">
            <form method="submit" className="d-flex flex-column container">
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
                        <option value="Crédit">Crédit</option>
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
            {recup?.operation}
        </div>
    );
}
