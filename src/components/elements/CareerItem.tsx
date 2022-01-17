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
            <div id={`js-${careerData.career_id}-details`} className={`career_item_details`}>
                <h2 className="career_item_title">Research Assistant</h2>
                <h2 className="career_item_location"><span className='svg_icon'>{IconAt}</span><span>Carnegie Mellon University</span></h2>
            </div>
            <div className="career_vert_line" />
            <div id={`js-${careerData.career_id}-description`} className={`career_item_description`}>
                <ul>
                    <li>
                        Did some stuff involving research in IoT device security and some other cool stuff
                    </li>

                </ul>
            </div>
        
        </div>
    );
}

export default CareerItem;