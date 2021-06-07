/**
 * File: LoadingSkeleton.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

interface SkeletonProps
{
    type: "rectangle" | "circle";
    className?: string;
}

const LoadingSkeleton: FC<SkeletonProps> = ({type, className=""}) => 
{
    return (
        <div className={`loading_skeleton ${type} ${className}`} />
    );
}

export default LoadingSkeleton;