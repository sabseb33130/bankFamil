import { TCompte } from '../types/compte';

export const compteDefault: TCompte = [
    {
        id: 0,
        date: '10/10/2024',
        operation: '',
        montant: 0,
        type: 'Crédit',
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
];
