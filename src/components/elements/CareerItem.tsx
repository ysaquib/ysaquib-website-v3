/**
 * File: CareerItem.tsx
 * Author: Yusuf Saquib
 */

import { format } from 'date-fns';
import React, {FC} from 'react';
import { CareerData } from '../../store/types/careerTypes';
import Anchor from './Anchor';
import { IconAt, IconMapPin } from './Icons';

interface CareerProps extends CareerData
{
    className?: string;
}

const CareerItem : FC<CareerProps> = ({className, ...careerData}) => 
{
    const currentYear = (new Date(Date.now())).getFullYear();
    const isSameYear = careerData.career_startDate.getFullYear() === careerData.career_endDate.getFullYear();
    
    const start = format(careerData.career_startDate, "MMM yyyy");
    const start_month = format(careerData.career_startDate, "MMM");
    const end = format(careerData.career_endDate, "MMM yyyy");
    
    const careerDate = () =>
    {
        if (careerData.career_isCurrent)
        {
            if (careerData.career_startDate.getFullYear() === currentYear)
                return `${start_month} — Present`;
            return `${start} — Present`;
        }
        if (end === start)
            return end;
        else
        {
            if (isSameYear)
                return `${start_month} — ${end}`;
            return `${start} — ${end}`;
        }
        
    }

    return (
        <div id={`js-${careerData.career_id}`} className={`career_item_wrapper`}>
            <div id={`js-${careerData.career_id}-details`} className={`career_item_details ${careerData.career_isCurrent && "career_featured"}`}>
                <h2 className="career_item_title">{careerData.career_title}</h2>
                
                <h2 className="career_item_organization">
                    <span className='svg_icon'>{IconAt}</span>
                    {
                        careerData.career_organizationURL 
                        ?
                        <a href={careerData.career_organizationURL} className="career_orgurl">
                            {careerData.career_organization}
                            </a>
                        :
                        <span>{careerData.career_organization}</span>
                    }
                </h2>
                
                {careerData.career_subtitle &&
                <h2 className="career_item_subtitle">{careerData.career_subtitle}</h2>}

                <h2 className="career_item_location">
                    {/* <span className='svg_icon'>{IconMapPin}</span> */}
                    <span>
                        {careerData.career_city && `${careerData.career_city}`}
                        {careerData.career_state && `, ${careerData.career_state}`}
                        {careerData.career_country && `, ${careerData.career_country} `}
                    </span>
                </h2>

                <h2 className="career_item_date">
                        {careerDate()}
                </h2>
            </div>
            
            {careerData.career_description &&
            <div className="career_vert_line" />}

            {careerData.career_description &&
            <ul id={`js-${careerData.career_id}-desc`} className="career_item_desc">
                {careerData.career_description.split("\n").map((item, index) => {
                    if (item.length > 0) return (
                        <li id={`item-${index}`}>
                            {item}
                        </li>
                    );
                })}
                
            </ul>}
               
        
        </div>
    );
}

export default CareerItem;