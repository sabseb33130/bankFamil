import { useContext, useState } from 'react';

import { baseUrl } from '../../../constant/generalConst';
import Popconfirm from 'antd/es/popconfirm';
import { message } from 'antd';
import { UserContext } from '../../../contexts/userContext';
export default function DeleteUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const [supp, setSupp]: any = useState([]);
    const token = localStorage.getItem('token');
    const optionsDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const delett = () => {
        async function fetchData() {
            const response = await fetch(baseUrl, optionsDelete);
            if (response.status === 404) {
                return alert('Votre compte est déjà supprimé');
            }

            const responseJson = await response.json();
            setSupp(responseJson);
            if (supp) {
                return alert(`${responseJson.message}`);
            }
        }
        fetchData();
    };
    const text = `Êtes-vous sûr de vouloir suprimer votre compte ${user.pseudo}?`;

    const confirm = () => {
        message.info(`Le compte de ${user.pseudo} est maintenant supprimé`);
        delett();
        props.setPage('accueil');
        localStorage.removeItem('token');
    };
    return (
        <div>
            <Popconfirm
                placement="bottom"
                title={text}
                onConfirm={confirm}
                okText="Oui"
                cancelText="Non"
            >
                <button className="btn btn-danger border border-2 border-dark rounded-pill ms-2">
                    Supprimer
                </button>
            </Popconfirm>
        </div>
    );
}
