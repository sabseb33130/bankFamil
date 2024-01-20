import { useEffect, useState } from 'react';
import { TCompte } from '../../types/compte';
import { compteUrl } from '../../constant/generalConst';
import DeleteCompte from './deleteCompte';

export default function GetCompte(props: {
    setSommetot: React.Dispatch<React.SetStateAction<number>>;
    sommetot: number;
}) {
    const [compte, setCompte] = useState<TCompte>();

    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        fetch(`${compteUrl}`, options)
            .then((response) => response.json())
            .then((response) => {
                setCompte(response.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const affichDonnees = compte?.map((data, i) => {
        const valeur: string =
            data.type === 'Crédit'
                ? 'green'
                : data.type === 'Virement (dépense)'
                ? 'red'
                : data.type === 'Virement (crédit)'
                ? 'grey'
                : data.type === 'Dépense'
                ? 'orange'
                : '';

        return (
            <tr style={{ backgroundColor: valeur }} key={i}>
                <td className="border border-5">{data.date}</td>
                <td className="border border-5">{data.operation}</td>
                <td className="border border-5">{data.montant}</td>
                <td className="border border-5">{data.type}</td>
                <td className="border border-5">
                    <tr>
                        <DeleteCompte id={data.id} />
                    </tr>
                </td>
            </tr>
        );
    });

    const total = compte?.map((data) => data.montant);

    const somme =
        total != undefined
            ? total.reduce(
                  (total: number, valeur: number) => total + Number(valeur),
                  0,
              )
            : '';
    props.setSommetot(Number(somme));
    return (
        <div>
            <div className=" text-center ">Mes mouvements</div>

            <div>Compte courant: {somme}</div>
            <table className="border border-5  container">
                <thead
                    className="text-center"
                    style={{ backgroundColor: 'blueviolet', color: 'white' }}
                >
                    <tr>
                        <td className="border border-5">Date</td>
                        <td className="border border-5">Operation</td>
                        <td className="border border-5">Montant</td>
                        <td className="border border-5">Type d'opération</td>
                    </tr>
                </thead>
                <tbody className="text-center">{affichDonnees}</tbody>
            </table>
        </div>
    );
}
