/**
 * File: Research.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getCareerData } from '../../store/actions/careerActions';
import { CareerData } from '../../store/types/careerTypes';
import Button from '../elements/Button';
import CareerItem from '../elements/CareerItem';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Section from '../elements/Section';

interface ResearchProps
{
    showButton?: boolean;
    getData?: boolean;
    itemLimit?: number;
}

const Research : FC<ResearchProps> = ({showButton = false, getData = false, itemLimit}) =>
{
    const {allCareers, isLoadingCareers, isError} = useSelector((state: RootState) => state.careers);
    const allCareers_filtered = allCareers.filter((car) => car.career_type === "research" && car.career_isHidden === false)
    const dispatch = useDispatch()
    const [research, setResearch] = useState<CareerData[]>(allCareers_filtered);

    useEffect(() => {
        const items = allCareers.filter((car) => (car.career_type === "research" && car.career_isHidden === false));
        setResearch(items.splice(0, itemLimit ?? items.length))
        return () => {}
    }, [allCareers, itemLimit])
    
    useEffect(() => 
    {
        if(getData === true)
        {
            dispatch(getCareerData( undefined, () => {console.error("Error getting Career data.")}));
        }
        return () => {}
    }, [dispatch, getData]);

    if (allCareers_filtered.length === 0)
    {
        return (
            <></>
        )
    }

    if (isLoadingCareers)
    {
        return (

            <Section id="research" className="career_section" title="Research">
                <div className="careers_wrapper">
                    <LoadingSkeleton type="rectangle" className="loading_career_card" />
                </div>
            </Section>
        )
    }

    if (isError)
    {
        return (

            <Section id="research" className="career_section" title="Research">
                <div className="careers_wrapper">
                    <div className="career_item_error">Error Retrieving Data.</div>
                </div>
            </Section>
        )
    }

    return (
        <Section id="research" className="career_section" title="Research">
            <div className="careers_wrapper">
                {
                    research.map((car) => {
                        return (
                            <CareerItem key={car.career_id} {...car} />
                    )})
                }
            </div>
            {showButton && <div className="career_button">
                    <Link to="/experience"><Button text="See All Research" onClick={() => window.scrollTo(0,0)}/></Link>
                </div>
                }
        </Section>
    );
}

export default Research;