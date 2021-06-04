import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../../store';

interface PrivateRouteProps extends RouteProps
{
    component: any;
    authRoles: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({component : Component, ...props}) => 
{
    const { authenticated } = useSelector((state: RootState) => state.auth);
    return(
        <Route {...props} render={() => authenticated ? <Component /> : <Redirect to="/" />}></Route>  
    );
}

export default PrivateRoute;