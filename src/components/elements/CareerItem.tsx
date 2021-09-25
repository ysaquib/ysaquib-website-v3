/**
 * File: CareerItem.tsx
 * Author: Yusuf Saquib
 */

import { format } from 'date-fns';
import React, {FC} from 'react';
import { CareerData } from '../../store/types/careerTypes';


interface CareerProps extends CareerData
{
    className?: string;
}

const CareerItem : FC<CareerProps> = ({className, ...careerData}) => 
{
    
    return (
        <div>
        </div>
    );
}

export default CareerItem;