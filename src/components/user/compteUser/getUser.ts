import { baseUrl } from '../../../constant/generalConst';
import { TUser } from '../../../types/users';

export function getUser(user: TUser, onUserChange: (value: TUser) => void) {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${baseUrl}/comptePerso`, options)
        .then((response) => response.json())
        .then((response) => {
            onUserChange(response.data);
        })
        .catch((err) => console.error(err));
}
