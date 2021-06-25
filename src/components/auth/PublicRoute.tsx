import React, { FC } from 'react'
import { Route, RouteProps } from 'react-router-dom'



const PublicRoute: FC<RouteProps> = ({children, ...props}) => 
{
    return(
        <Route {...props} render={() => children} />  
    );
}

export default PublicRoute;