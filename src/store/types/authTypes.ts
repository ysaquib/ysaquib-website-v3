/**
 * File: authTypes.ts
 * Author: Yusuf Saquib
 * 
 * Code modified from https://github.com/damirpristav/react-ts-redux-firebase-authentication
 */

export const User_SetUser = "User_SetUser";
export const User_SignedOut = "User_SignedOut";
export const User_NeedVerification = "User_ReqVerify";
export const User_SetLoading = "User_SetLoading";
export const User_SetWarning = "User_SetWarning";
export const User_SetSuccess = "User_SetSuccess";
export const User_SetError   = "User_SetError";
export const User_SetUserRoles = "User_SetRoles";

export enum UserRoles
{
    superadmin = "superadmin",
    admin = "admin",
    user = "user"
}

export interface User 
{
    email:      string;
    firstname:  string;
    lastname:   string;
    roles:      string[];
    id:         string;
    createdAt:  any;
}
export interface AuthState
{
    user:               User | null;
    userRoles:          string[];
    authenticated:      boolean;
    loading:            boolean;
    error:              string;
    warning:            string;
    needVerification:   boolean;
    success:            string;
    newMessages?:       number;
}

export interface SignUpData
{
    email:      string;
    firstname:  string;
    lastname:   string;
    password:   string;
}

export interface SignInData
{
    email:      string;
    password:   string;
}

export interface ErrorMessages
{
    [key : string] : string;
}

// Actions
interface SetUserAction
{
    type:       typeof User_SetUser;
    payload:    User;
}

interface SetUserRolesAction
{
    type: typeof User_SetUserRoles;
    payload: string[];
}

interface SetLoadingAction
{
    type:       typeof User_SetLoading;
    payload:    boolean;
}

interface SignOutAction
{
    type:       typeof User_SignedOut;
}

interface SetErrorAction
{
    type:       typeof User_SetError;
    payload:    string;
}

interface SetWarningAction
{
    type:       typeof User_SetWarning;
    payload:    string;
}

interface NeedVerificationAction
{
    type:       typeof User_NeedVerification;
}

interface SetSuccessAction
{
    type:       typeof User_SetSuccess;
    payload:    string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetWarningAction | NeedVerificationAction | SetSuccessAction | SetUserRolesAction;

