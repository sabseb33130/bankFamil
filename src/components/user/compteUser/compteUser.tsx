import { useContext } from 'react';
import DeleteUser from '../delete_update/deleteUser';
import EditUser from '../delete_update/editUser';

import { baseUrl } from '../../../constant/generalConst';
import { UserContext } from '../../../contexts/userContext';

export function CompteUser(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');
    console.log(user);

    return (
        <div className="container-fluid d-flex justify-content-around flex-wrap mt-5">
            <div>
                <div className="card-body  text-center mb-5">
                    <h1 className="card-title">{user!.pseudo}</h1>
                    <div>Nom: {user.nom}</div>
                    <div>Prénom: {user.prenom}</div>

                    <div className="mt-4 d-flex justify-content-evenly">
                        <EditUser setPage={props.setPage} />

                        <DeleteUser setPage={props.setPage} />
                    </div>
                </div>
            </div>
            <div className=" text-center ">Mes mouvements</div>
            <table className="border border-5 text-center">
                <thead>
                    <tr>
                        <td className="border border-5">Date</td>
                        <td className="border border-5">Operation</td>
                        <td className="border border-5">Montant</td>
                        <td className="border border-5">Type d'opération</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-5">18/11/2024</td>
                        <td className="border border-5">Salaire</td>
                        <td className="border border-5">2500</td>
                        <td className="border border-5">Virement</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
