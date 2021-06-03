import React, { FC } from 'react'
import { Route, RouteProps } from 'react-router'

interface PrivateRouteProps extends RouteProps
{
    component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({component : Component, ...props}) => 
{
    return(
        <Route {...props} render={() => <Component />}></Route>  
    );
}

export default PrivateRoute;