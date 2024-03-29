import { TUser } from './users';

export type TCompte = {
    id: number;
    date: string;
    operation: string;
    montant: number;
    type: string;
    user: TUser;
}[];
