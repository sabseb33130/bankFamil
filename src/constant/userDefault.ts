import { TUser } from '../types/users';

export const userDefault: TUser = {
    id: 0,
    prenom: '',
    nom: '',
    pseudo: '',

    password: '',
    passwordConfirmed: '',

    access_token: '',
    compte: [
        {
            id: 0,
            date: '10/10/2024',
            operation: '',
            montant: 0,
            type: '',
            user: {
                id: 0,
                prenom: '',
                nom: '',
                pseudo: '',

                password: '',
                passwordConfirmed: '',

                access_token: '',
                compte: [],
            },
        },
    ],
};
