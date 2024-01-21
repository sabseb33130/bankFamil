import { useContext, useEffect, useState } from 'react';
import DeleteUser from '../delete_update/deleteUser';
import EditUser from '../delete_update/editUser';

import { UserContext } from '../../../contexts/userContext';
import DeleteCompte from '../../compte/deleteCompte';
import PostCompte from '../../compte/postCompte';

export function CompteUser(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [sommetot, setSommetot] = useState(0);
    const { user, onUserChange } = useContext(UserContext);
    const token = localStorage.getItem('token');

    const affichDonnees = user.compte?.map((data, i) => {
        const valeur: string =
            data.type === 'Crédit'
                ? '#b6d7a8'
                : data.type === 'Virement (dépense)'
                ? '#ffd966'
                : data.type === 'Virement (crédit)'
                ? '#bcbcbc'
                : data.type === 'Dépense'
                ? '#e06666'
                : '';

        return (
            <tr style={{ backgroundColor: valeur }} key={i}>
                <td className="border border-5">{data.date}</td>
                <td className="border border-5">{data.operation}</td>
                <td className="border border-5">{data.montant}</td>
                <td className="border border-5">{data.type}</td>
                <td className="border border-5">
                    <tr>
                        <DeleteCompte
                            id={data.id}
                            user={user}
                            onUserChange={onUserChange}
                            setPage={props.setPage}
                        />
                    </tr>
                </td>
            </tr>
        );
    });
    useEffect(() => {
        const total = user.compte?.map((data) => data.montant);

        const somme =
            total != undefined
                ? total.reduce(
                      (total: number, valeur: number) => total + Number(valeur),
                      0,
                  )
                : '';

        setSommetot(Number(somme));
    }, [user.compte]);

    return (
        <div className="container-fluid d-flex justify-content-between flex-wrap mt-5">
            <div className="col-2">
                <div className="card-body  text-center mb-5">
                    <h1 className="card-title">{user!.pseudo}</h1>
                    <div>Nom: {user.nom}</div>
                    <div>Prénom: {user.prenom}</div>
                    <div>Solde du compte: {sommetot}</div>
                    <div className="mt-4 d-flex justify-content-evenly">
                        <EditUser setPage={props.setPage} />
                        <DeleteUser setPage={props.setPage} />{' '}
                        <div>
                            <PostCompte
                                user={user}
                                onUserChange={onUserChange}
                                setPage={props.setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-10">
                <table className="border border-5  container">
                    <thead
                        className="text-center"
                        style={{
                            backgroundColor: '#4258A8',
                            color: 'white',
                        }}
                    >
                        <tr>
                            <td className="border border-5">Date</td>
                            <td className="border border-5">Operation</td>
                            <td className="border border-5">Montant</td>
                            <td className="border border-5">
                                Type d'opération
                            </td>
                        </tr>
                    </thead>
                    <tbody className="text-center">{affichDonnees}</tbody>
                </table>
            </div>
        </div>
    );
}
