/**
 * File: CareerItem.tsx
 * Author: Yusuf Saquib
 */

import { format } from 'date-fns';
import React, {FC} from 'react';
import { CareerData } from '../../store/types/careerTypes';
import { IconAt } from './Icons';


interface CareerProps extends CareerData
{
    className?: string;
}

const CareerItem : FC<CareerProps> = ({className, ...careerData}) => 
{
    
    return (
        <div id={`js-${careerData.career_id}`} className={`career_item_wrapper`}>
            <h2 className="career_item_title">Software Engineer</h2>
            <h2 className="career_item_location svg_icon">{IconAt}</h2>
            <h2 className="career_item_location">Apple</h2>
        
        </div>
    );
}

export default CareerItem;