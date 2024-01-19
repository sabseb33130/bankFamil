import { useEffect, useState } from 'react';
import { TCompte } from '../../types/compte';
import { compteUrl } from '../../constant/generalConst';

export default function GetCompte() {
    const [compte, setCompte] = useState<TCompte>();
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${compteUrl}`, options)
        .then((response) => response.json())
        .then((response) => {
            console.log('test', response);

            setCompte(response.data);
        })
        .catch((err) => console.error(err));
    console.log(compte);

    return <div>{compte?.montant}</div>;
}
