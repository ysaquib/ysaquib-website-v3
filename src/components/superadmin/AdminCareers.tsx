/**
 * File: AdminCareers.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import * as yup from 'yup';
import { format, parse } from "date-fns";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CareerData, CareerType } from '../../store/types/careerTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addNewCareer, deleteCareer, getCareerData, setCareerData, setCareersLoading } from '../../store/actions/careerActions';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import CheckBox from '../elements/Checkbox';
import DialogBox from '../elements/DialogBox';
import { IconAdd, IconChevronRight, IconGarbageDelete } from '../elements/Icons';

const schema = yup.object().shape(
{
    career_title : yup.string().required("is required."),
    career_description: yup.string().required("is required."),
    career_blog: yup.string().matches(/^([\w-]+)/gs, {message: "must be a valid blog URL.", excludeEmptyString: true}),
    career_isCurrent: yup.boolean(),
    career_isHidden: yup.boolean(),
    career_org: yup.string(),
    career_org_url: yup.string().url({message: "must be a valid URL."}),
    career_location: yup.string()
});

const AdminCareers : FC = () =>
{
    const dispatch = useDispatch();
    const {allCareers, isLoadingCareers} = useSelector((state: RootState) => state.careers);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}, setValue, setFocus} = useForm<CareerData>({mode:"onChange", resolver});
    const [careers, setCareers] = useState<CareerData[]>(allCareers);
    const [career, setCareer] = useState<CareerData>();

    const [error, setError] = useState(null);
    const [message, setMessage] = useState<string>("");

    const [careerType, setCareerType] = useState<CareerType>("other");
    const [isNewCareer, setNewCareer] = useState<boolean>(false);
    const [isNewCreated, setNewCreated] = useState<boolean>(false);
    const [isCurrent, setIsCurrent] = useState<boolean>(career?.career_isCurrent ?? false);
    const [isHidden, setIsHidden] = useState<boolean>(career?.career_isHidden ?? false);
    
    const dateNow = new Date(Date.now());
    const [startDate, setStartDate] = useState<string>(format(career?.career_startDate ?? dateNow, "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState<string>(format(career?.career_endDate ?? dateNow, "yyyy-MM-dd"));

    const [dialog, setDialog] = useState(<></>);
    
    /**
     * This useEffect sets the initial values of all the fields when a career
     * is selected (or when the current career is changed)
     */
    useEffect(() => 
    {
        if (career)
        {
            setValue("career_title", career.career_title);
            
            setIsHidden(career.career_isHidden ?? false);
            setIsCurrent(career.career_isCurrent ?? false);
            setStartDate(format(career.career_startDate, "yyyy-MM-dd"));
            setEndDate(format(career.career_endDate, "yyyy-MM-dd"));
            
            setMessage("");
            setIsCurrent(career.career_isCurrent ?? false);
            setFocus("career_title");
        }
        return () => 
        {
            setMessage("");
        }
    }, [career, setValue, setFocus, setStartDate]);

    /**
     * When the message is updated, we get the data again and set the list 
     * accordingly
     */
    useEffect(() => 
    {
        dispatch(getCareerData(undefined, () => {console.error("Error getting career data")}));
    }, [dispatch]);

    /**
     * When careers is updated or when we first get the CareerData, 
     * set the careers accordingly
     */
    useEffect(() => 
    {
        setCareers(allCareers);
        return () =>
        {
            setCareers([]);
        }
    }, [allCareers]);


    /**
     * This useEffect changes the currently selected career by removing the 
     * selected class from the previously selected career and adding it to the 
     * new one.
     */
    useEffect(() => {
        if(career)
        {
            const element = document.getElementById(career.career_id);
            element?.classList.add("selected");
        }
        return () => {
            if (career)
            {
                document.getElementById(career.career_id)?.classList.remove("selected");
                if(isNewCareer)
                {
                    setNewCareer(false);
                }
            }
        }
    }, [career, isNewCareer]);


    /**
     * Adds class based on InProgress state.
     */
    useEffect(() => {
        if (career)
        {
            const element = document.getElementById(career.career_id);
            if(isCurrent)
            {
                element?.classList.add("wip");
            }
            else
            {
                element?.classList.remove("wip");
            }
        }
    }, [isCurrent, career]);

    /**
     * Adds class based on isHidden state.
     */
    useEffect(() => {
        if (career)
        {
            const element = document.getElementById(career.career_id);
            if(isHidden)
            {
                element?.classList.add("hidden");
            }
            else
            {
                element?.classList.remove("hidden");
            }
        }
    }, [isHidden, career]);

    /**
     * This useEffect will cause the new career to be selected after it is
     * added to the career list.
     */
    useEffect(() => {
        if (isNewCreated === true)
        {
            setCareer(careers[careers.length - 1]);
            setNewCreated(false);
        }
    }, [isNewCreated, careers]);


    /**
     * createNewCareer will create an empty career and set it as the current
     * career such that when the form is submitted, the current career will
     * be created in the database
     */
    const createNewCareer = () =>
    {
        const new_career = 
        {
            career_title: "",
            career_id: "",
            career_type: "other",
            career_startDate: dateNow,
            career_endDate: dateNow
        } as CareerData;
        setNewCareer(true);
        setCareer(new_career);
    }

    /**
     * dispatches a career to be deleted from the database.
     */
    const delCareer = () =>
    {
        setDialog(<></>);
        if(career)
        {
            dispatch(deleteCareer(career, undefined, (err) => {setError(err)}));
        }
        setCareer(undefined);
        setMessage("Successfully Deleted");
    }

    /**
     * Open dialog when delete button is clicked
     */
    const handleDeleteDialog = () =>
    {
        if (career)
        {
            setDialog(
                <DialogBox 
                    title="Confirm Delete Career" 
                    message={`Are you sure you want to delete '${career?.career_title ?? "undefined" }' ?`}
                    messageError="Warning: this action cannot be undone."
                    optionReject="Delete Career"
                    onReject={delCareer}
                    optionClose="Keep Career"
                    onClose={() => {setDialog(<></>)}}/>
            );
        }
    }
    
    /**
     * Upon form submission, check if we are creating a new career or updating
     * an existing one. Perform the appropriate function.
     * 
     * We assume career is not null since we cannot submit the form if the 
     * career does not exist.
     */
    const onSubmit : SubmitHandler<CareerData> = (data) => 
    {
        dispatch(setCareersLoading(true));

        const car_id = career?.career_id ?? "";

        const {career_id, ...career_data} = data;
        const new_career = {
            ...career, 
            ...career_data,
            career_id: car_id,
            career_inProgress: isCurrent,
            career_isHidden: isHidden,
            career_startDate: parse(startDate, "yyyy-MM-dd", new Date()),
            career_endDate: parse(endDate, "yyyy-MM-dd", new Date()),
        };

        if(isNewCareer && career)
        {
            dispatch(addNewCareer(new_career, () => {setNewCreated(true); setNewCareer(false);}, (err) => {setError(err)}));
        }
        else if(!isNewCareer && career)
        {
            dispatch(setCareerData(new_career, undefined, (err) => {setError(err)}));
        }

        setMessage(`Successfully ${isNewCareer ? "created" : "updated"} '` + data.career_title +"'.");
    }
    
    /**
     * This could definitely be made a lot better but at this point it works
     * well and it could break things to separate the list and box into two
     * separate components so I will just leave it for now.
     * 
     * Either way, not much will change since realistically I can only separate
     * the list item, which isnt that much anyways, and the career details are
     * not that complicated.
     */
    return (
        <section id="admin_career" className="admin careers" >
            {dialog}
            <div id="admin_careers_list">
                <ul className="careers_list">
                    {careers && careers.map((car: CareerData, index: number) =>
                    {return (
                        <li
                            className={
                                "career_item " + 
                                (car.career_isHidden? "hidden " : "") + 
                                (car.career_isCurrent? "wip " : "") +
                                (car.career_id === career?.career_id ? "selected " : "")}
                            key={car.career_id} 
                            id={car.career_id}
                            onClick={() => setCareer(car)}>
                            
                            <h3 className="career_item_title">{car.career_title}</h3>
                            <span className="svg_icon chevron">{IconChevronRight}</span>
                        
                        </li>
                    );})}
                </ul>
                {/* $ Here are the career buttons to add and delete $ */}
                <div className="career_buttons">
                    {(isNewCareer || isNewCreated) && <li className="career_item new_career" key="newcar">
                        <h3 className="career_item_title">New Career</h3>
                        <span className="svg_icon chevron">{IconChevronRight}</span>
                    </li>}
                    <li className="career_item button_add" key="add" onClick={createNewCareer}><span className="svg_icon add">{IconAdd}</span></li>
                    <li className="career_item button_delete" key="delete" onClick={handleDeleteDialog}><span className="svg_icon add">{IconGarbageDelete}</span></li>
                </div>

            </div>
            <form className={`edit careers ${(isNewCareer || isNewCreated) ? "new" : ""}`} onSubmit={handleSubmit(onSubmit)}>
                <h3 className="category_title">{isNewCareer || isNewCreated ? "Set" : "Edit"} Career Information</h3>
                <TextField label="Title" 
                           name="career_title"
                           type="text"
                           classNameInner="elevated"
                           message={errors.career_title?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={career == null}
                           show_label />

                <TextField label="Organization" 
                           name="career_org"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           message={errors.career_title?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={career == null}
                           show_label />

                <TextField label="Organization URL" 
                           name="career_org_url"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           message={errors.career_organizationURL?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={career == null}
                           show_label />
                
                <TextField label="Location" 
                           name="career_location"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           message={errors.career_organizationURL?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={career == null}
                           show_label />

                <TextField label="Blog" 
                           name="career_blog"
                           type="text"
                           className="half"
                           classNameInner="elevated"
                           defaultValue={career?.career_blog}
                           message={errors.career_blog?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={career == null}
                           show_label />

                <TextArea label="Description" 
                           name="career_description"
                           classNameInner="elevated"
                           className="desc_textarea"
                           rows={5}
                           defaultValue={career?.career_description}
                           message={errors.career_description?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={career == null}
                           show_label />

                <TextField  label="Start Date"
                            type="date"
                            className="half"
                            classNameInner="elevated"
                            name="career_startDate"
                            value={startDate}
                            onChangeEvent={(e) => {
                                if (startDate === endDate)
                                    setEndDate(e.currentTarget.value);
                                setStartDate(e.currentTarget.value);
                            }}
                            message={errors.career_startDate?.message} 
                            disabled={career == null}
                            register={register} 
                            registration={{required: true}}
                            show_label  />
                
                <TextField  label="End Date"
                            type="date"
                            className="half"
                            classNameInner="elevated"
                            name="career_endDate"
                            value={endDate}
                            onChangeEvent={(e) => setEndDate(e.currentTarget.value)}
                            message={errors.career_endDate?.message} 
                            disabled={career == null}
                            register={register} 
                            registration={{required: true}}
                            show_label  />
                
                <div className="checkboxes">
                    <CheckBox label="Is Current Position?"
                            name="career_inProgress"
                            className="half"
                            register={register} 
                            registration={{required: false}} 
                            disabled={career == null} 
                            onChange={() => setIsCurrent(!isCurrent)}/>
                    
                    <CheckBox label="Is Hidden?"
                            name="career_isHidden"
                            className="half"
                            register={register} 
                            registration={{required: false}} 
                            disabled={career == null} 
                            onChange={() => setIsHidden(!isHidden)}/>
                </div>


                <p className={`message ${error != null && !isLoadingCareers ? "error" : ""}`}>
                    {error != null && !isLoadingCareers ? error : message}
                </p>
                <Button text={isNewCareer ? "Create Career" : "Update Career"} className="confirmbtn" />
            </form>
            
        </section>

    );
}

export default AdminCareers