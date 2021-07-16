/**
 * File: PrivateRoute.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../../store';

interface PrivateRouteProps extends RouteProps
{
    authRoles?: string[];
    redirect?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children, redirect="", authRoles=['user'], ...props}) => 
{
    const { authenticated, userRoles} = useSelector((state: RootState) => state.auth);
    const commonroles = authRoles.filter(role => userRoles.includes(role));
    const hasRole = commonroles.length >= 1;

    return(
        <Route {...props}
            render={comprops => (authenticated && hasRole) ? 
                children : 
                <Redirect to={redirect} />} />
    );
}

export default PrivateRoute;