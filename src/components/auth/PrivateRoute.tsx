import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../../store';

interface PrivateRouteProps extends RouteProps
{
    component: any;
    authRoles?: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({component : Component, authRoles=['user'], ...props}) => 
{
    const { authenticated, userRoles} = useSelector((state: RootState) => state.auth);
    const commonroles = authRoles.filter(role => userRoles.includes(role));
    const hasRole = commonroles.length >= 1;

    return(
        <Route {...props} 
            render={comprops => (authenticated && hasRole) ? 
                <Component {...comprops} /> : 
                <Redirect to="/" />} />
    );
}

export default PrivateRoute;