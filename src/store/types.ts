export const User_SetUser = 'User_SetUser';
export const User_SignedOut = 'User_SignedOut';
export const User_ReqVerify = 'User_ReqVerify';
export const User_SetLoading = 'User_SetLoading';
export const User_SetWarning = 'User_SetWarning';
export const User_SetSuccess = 'User_SetSuccess';
export const User_SetError   = 'User_SetError';

export enum UserRoles
{
    superadmin = 'superadmin',
    admin = 'admin',
    user = 'user'
}

export interface User 
{
    username: string;
    email: string;
    role: string;
    id: string;
    createdAt: any;
}
export interface AuthState
{
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    warning: string;
    needVerification: boolean;
    success: string;
}

export interface SignUpData
{
    username: string;
    email: string;
    password: string;
}

export interface SignInData
{
    username: string;
    email: string;
    password: string;
}

// Actions
interface SetUserAction
{
    type: typeof User_SetUser;
    payload: User;
}

interface SetLoadingAction
{
    type: typeof User_SetLoading;
    payload: boolean;
}

interface SignOutAction
{
    type: typeof User_SignedOut;
}

interface SetErrorAction
{
    type: typeof User_SetError;
    payload: string;
}

interface SetWarningAction
{
    type: typeof User_SetWarning;
    payload: string;
}

interface NeedVerificationAction
{
    type: typeof User_ReqVerify;
}

interface SetSuccessAction
{
    type: typeof User_SetSuccess;
    payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetWarningAction | NeedVerificationAction | SetSuccessAction;
