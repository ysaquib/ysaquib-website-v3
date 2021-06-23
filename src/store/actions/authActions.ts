import { ThunkAction } from 'redux-thunk';

import { AuthAction, 
         SignInData, 
         SignUpData, 
         User, 
         User_SetUser, 
         User_SignedOut, 
         User_NeedVerification, 
         User_SetLoading, 
         User_SetWarning, 
         User_SetSuccess, 
         User_SetError, 
         ErrorMessages,
         User_SetUserRoles} from '../types/authTypes';
import { RootState } from '..';
import Firebase, { firebase } from '../../firebase/config';

export const userSignUp = (data : SignUpData, onError: () => void) : ThunkAction<void, RootState, null, AuthAction> =>
{
    return async dispatch =>
    {
        try
        {
            const response = await Firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if (response.user)
            {
                const userData : User = 
                {
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    roles: ['user'],
                    id: response.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }
                await Firebase.firestore().collection('/users').doc(response.user.uid).set(userData);
                await response.user.sendEmailVerification();
                dispatch({
                    type: User_NeedVerification
                });
                dispatch({
                    type: User_SetUser,
                    payload: userData
                });
                dispatch({
                    type: User_SetUserRoles,
                    payload: userData.roles
                });
            }
        }
        catch (error)
        {
            console.log(error);
            onError();
            dispatch({
                type: User_SetError,
                payload: error.message
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
            const user = await Firebase.firestore().collection('users').doc(id).get();
            if (user.exists)
            {
                const userData = user.data() as User;
                dispatch({
                    type: User_SetUser,
                    payload: userData
                });
                dispatch({
                    type: User_SetUserRoles,
                    payload: userData.roles
                });
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }
}

export const setLoading = (value: boolean) : ThunkAction<void, RootState, null, AuthAction> => 
{
    console.log("is loading: ", value);
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
            console.log("Signing In");
            await Firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            // console.log(userCred.user?.uid);
            // getUserById(userCred.user!.uid);
        }
        catch (error)
        {
            console.log(error);
            onError();
            dispatch(setError(error));
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
            await Firebase.auth().signOut();
            dispatch({
                type: User_SignedOut
            });
        }
        catch (error)
        {
            console.log(error);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (error: firebase.FirebaseError) : ThunkAction<void, RootState, null, AuthAction> =>
{
    const error_messages : ErrorMessages =
    {
        "auth/invalid-email" : "Invalid email address.",
        "auth/invalid-password" : "Invalid password.",
        "auth/invalid-password-hash" : "Invalid password.",
        "auth/invalid-password-salt" : "Invalid password.",
        "auth/user-not-found" : "Email address is not associated with any user."
    }
    return dispatch =>
    {
        const message = error_messages[error.code];
        dispatch({
            type: User_SetError,
            payload: message != null ? message : "An unexpected error occured. Please try again later."
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

export const setNeedVerification = () : ThunkAction<void, RootState, null, AuthAction> =>
{
    return dispatch =>
    {
        dispatch({
            type: User_NeedVerification,
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
            await Firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMessage));
        }
        catch (error)
        {
            console.log(error);
            dispatch(setError(error));
        }
    }
}
