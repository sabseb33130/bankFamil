import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { compteUrl } from '../../constant/generalConst';
import Popconfirm from 'antd/es/popconfirm';
import { message } from 'antd';
import { TUser } from '../../types/users';
import { TCompte } from '../../types/compte';
import { TCompteDelete } from '../../types/compteDelete';

export default function DeleteCompte(props: {
    user: TUser;
    onUserChange: (value: TUser) => void;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    id: number;
}) {
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
                const addope = (test: TCompteDelete) => {
                    const newModif = {
                        ...props.user.compte,

                        test,
                    };
                    const newUser = { ...props.user, newModif };
                    console.log(newModif);

                    props.onUserChange(newUser);
                    props.setPage('compte');
                };
                console.log(responseJson.data);

                addope(responseJson.data);
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
