import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { compteUrl } from '../../constant/generalConst';
import Popconfirm from 'antd/es/popconfirm';
import { message } from 'antd';
import { text } from 'stream/consumers';

export default function DeleteCompte(props: { id: number }) {
    const [supp, setSupp]: any = useState();
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
            const response = await fetch(
                `${compteUrl}/${props.id}`,
                optionsDelete,
            );
            if (response.status === 404) {
                return alert('Votre operation est déjà supprimé');
            }

            const responseJson = await response.json();
            setSupp(responseJson);
            if (supp) {
                return alert(`${responseJson.message}`);
            }
        }
        fetchData();
    };
    const text = `Êtes-vous sûr de vouloir suprimer votre compte ${props.id}?`;
    const confirm = () => {
        message.info(`L'opération ${props.id} est maintenant supprimé`);
        delett();
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
                <button>
                    <i className="bi bi-trash"></i>
                </button>
            </Popconfirm>
        </div>
    );
}
