export type TUserRole = 'admin' | 'landlord' | 'tenant';

export interface IUser {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
}