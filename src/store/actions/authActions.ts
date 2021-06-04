import { ThunkAction } from 'redux-thunk';

import { AuthAction, AuthState, SignInData, SignUpData, User, User_SetUser, User_SignedOut, User_ReqVerify, User_SetLoading, User_SetWarning, User_SetSuccess, User_SetError } from '../types';
import { RootState } from '..';
import Firebase, { firebase } from '../../firebase/config';

export const userSignUp = (data : SignUpData, onError: () => void) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return async dispatch =>
    {
        try
        {
            const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if (response.user)
            {
                const userData : User = 
                {
                    email: data.email,
                    username: data.username,
                    role: 'user',
                    id: response.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }
                await firebase.firestore().collection('/users').doc(response.user.uid).set(userData);
                await response.user.sendEmailVerification();
                dispatch({
                    type: User_ReqVerify
                });
                dispatch({
                    type: User_SetUser,
                    payload: userData
                });
            }
        }
        catch (err)
        {
            console.log(err);
            dispatch({
                type: User_SetError,
                payload: err.message
            });
        }
    }
}

export const getUserById = (id: string) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return async dispatch =>
    {
        try
        {
            const user = await firebase.firestore().collection('users').doc(id).get();
            if (user.exists)
            {
                const userData = user.data() as User;
                dispatch({
                    type: User_SetUser,
                    payload: userData
                });
            }
        }
        catch (err)
        {
            console.log(err);
        }
    }
}

export const setLoading = (value: boolean) : ThunkAction<void, RootState, null, AuthAction> => 
{
    return dispatch => 
    {
        dispatch({
            type: User_SetLoading,
            payload: value
        });
    }
}

export const userSignIn = (data: SignInData, onError: () => void) : ThunkAction<void, RootState, null, AuthAction> => 
{
    return async dispatch =>
    {
        try
        {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        }
        catch (err)
        {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

export const userSignOut = () : ThunkAction<void, RootState, null, AuthAction> => 
{
    return async dispatch =>
    {
        try
        {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: User_SignedOut
            });
        }
        catch (err)
        {
            console.log(err);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (message: string) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return dispatch =>
    {
        dispatch({
            type: User_SetError,
            payload: message
        });
    }
}

export const setWarning = (message: string) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return dispatch =>
    {
        dispatch({
            type: User_SetWarning,
            payload: message
        });
    }
}

export const setReqVerify = () : ThunkAction<void, RootState, null, AuthAction> =>
{
    return dispatch =>
    {
        dispatch({
            type: User_ReqVerify,
        });
    }
}  

export const setSuccess = (message: string) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return dispatch =>
    {
        dispatch({
            type: User_SetSuccess,
            payload: message
        });
    }
}

export const sendPasswordResetEmail = (email: string, successMessage: string) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return async dispatch => 
    {
        try
        {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMessage));
        }
        catch (err)
        {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}
