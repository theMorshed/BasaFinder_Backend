export type TUserRole = 'admin' | 'landlord' | 'tenant';

export interface IUser {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
}