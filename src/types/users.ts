import { TCompte } from './compte';

export type TUser = {
    id: number;
    prenom: string;
    nom: string;
    pseudo: string;
    password: string;
    passwordConfirmed: string;
    access_token: string;
    compte: TCompte;
};
