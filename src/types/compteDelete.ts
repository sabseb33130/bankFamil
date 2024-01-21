import { TUser } from './users';

export type TCompteDelete = {
    id: number;
    date: string;
    operation: string;
    montant: number;
    type: string;
    user: TUser;
};
