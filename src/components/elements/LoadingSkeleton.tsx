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

/**
 * Simply a loading skeleton like the facebook one but easier to use (for me)
 */
const LoadingSkeleton: FC<SkeletonProps> = ({type, className=""}) => 
{
    return (
        <div className={`loading_skeleton ${type} ${className}`} />
    );
}

export default LoadingSkeleton;