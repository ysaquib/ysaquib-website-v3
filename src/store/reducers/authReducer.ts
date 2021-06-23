import { AuthAction, AuthState , User_SetUser, User_SignedOut, User_NeedVerification, User_SetLoading, User_SetWarning, User_SetSuccess, User_SetError, User_SetUserRoles } from '../types/authTypes';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  userRoles: [''],
  loading: true,
  error: '',
  warning: '',
  needVerification: false,
  success: ''
}

const AuthFn = (state = initialState, action: AuthAction) => {
    switch(action.type) 
    {
        case User_SetUser:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        
        case User_SetUserRoles:
            return {
                ...state,
                userRoles: action.payload
            }

        case User_SetLoading:
            return {
                ...state,
                loading: action.payload
            };
            
        case User_SignedOut:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            };

        case User_SetError:
            return {
                ...state,
                error: action.payload
            };
        
        case User_SetWarning:
            return {
                ...state,
                warning: action.payload
            };

        case User_NeedVerification:
            return {
                ...state,
                needVerification: true
            };

        case User_SetSuccess:
            return {
                ...state,
                success: action.payload
            };

        default: 
            return state;
    }
}

export default AuthFn;