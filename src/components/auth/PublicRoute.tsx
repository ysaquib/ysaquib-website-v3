import React, { FC } from 'react'
import { Route, RouteProps } from 'react-router'

interface PublicRouteProps extends RouteProps
{
    component: any;
}

const PublicRoute: FC<PublicRouteProps> = ({component : Component, ...props}) => 
{
    return(
        <Route {...props} render={() => <Component />}></Route>  
    );
}

export default PublicRoute;