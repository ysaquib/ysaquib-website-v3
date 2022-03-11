/**
 * File: Education.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CareerData } from '../../store/types/careerTypes';
import CareerItem from '../elements/CareerItem';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Section from '../elements/Section';

const Education : FC = () =>
{
    const {allCareers, isLoadingCareers, isError} = useSelector((state: RootState) => state.careers);
    const allCareers_filtered = allCareers.filter((car) => car.career_type === "education" && car.career_isHidden === false)
    
    const [education, setEducation] = useState<CareerData[]>(allCareers_filtered);

    useEffect(() => {
      setEducation(allCareers.filter((car) => (car.career_type === "education" && car.career_isHidden === false)))
      return () => {}
    }, [allCareers])
    

    if (isLoadingCareers)
    {
        return (

            <Section id="education" title="Education">
                <div className="careers_wrapper">
                    <LoadingSkeleton type="rectangle" className="loading_career_card" />
                </div>
            </Section>
        )
    }

    if (isError)
    {
        return (

            <Section id="education" title="Education">
                <div className="careers_wrapper">
                    <div className="career_item_error">Error Retrieving Data.</div>
                </div>
            </Section>
        )
    }

    return (
        <Section id="education" title="Education">
            <div className="careers_wrapper">
                {
                    education.map((car) => {
                        return (
                            <CareerItem key={car.career_id} {...car} />
                    )})
                }
            </div>
        </Section>
    );
}

export default Education;