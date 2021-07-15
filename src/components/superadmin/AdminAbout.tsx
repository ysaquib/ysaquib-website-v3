/**
 * File: AdminAbout.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AboutData } from '../../store/types/dataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getAboutData, setAboutData } from '../../store/actions/dataActions';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';

const schema = yup.object().shape(
{
    about_title : yup.string().required("is required."),
    about_description : yup.string().required("is required."),
});


const AdminAbout : FC = () =>
{
    const dispatch = useDispatch();
    const AboutData = useSelector((state: RootState) => state.about);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}} = useForm<AboutData>({mode:"all" ,resolver});
    const [about, setAbout] = useState<AboutData>(AboutData);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    /**
     * Get about data from database.
     */
    useEffect(() => 
    {
        dispatch(getAboutData(() => setError("Error getting About Data")));
    }, [dispatch]);

    useEffect(() => 
    {
        setAbout(AboutData);
        
        return () =>
        {
            setAbout(AboutData);
        }
    }, [AboutData]);

    /**
     * handle edit submission.
     */
    const onSubmit : SubmitHandler<AboutData> = (data) => 
    {
        setLoading(true);
        dispatch(setAboutData(data, (err) => {setError(err)}));
        setLoading(false);
        setMessage("Successfully updated about.");
    }

    return (
        <section id="admin_about" className="admin" >
            <form className="edit about" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="category_title">Edit About Information</h3>
                <TextField label="Title" 
                           name="about_title"
                           type="text"
                           classNameInner="elevated"
                           defaultValue={about.about_title}
                           message={errors.about_title?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextArea label="Description" 
                           name="about_description"
                           defaultValue={about.about_description}
                           message={errors.about_description?.message}
                           classNameInner="elevated"
                           className="about_desc"
                           rows={18}
                           register={register} 
                           registration={{required: true}} />

                {/* <div className="about_checkboxes">
                    <CheckBox label="Github"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />
                    <CheckBox label="LinkedIn"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />
                    <CheckBox label="StackOverflow"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />
                    <CheckBox label="BugCrowd"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />
                    <CheckBox label="LeetCode"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />
                    <CheckBox label="HackTheBox"
                                name="project_inProgress"
                                className="half"
                                disabled={about == null} 
                                />

                </div> */}

                <p className={`message ${error !== "" && !isLoading ? "error" : ""}`}>
                    {error !== "" && !isLoading ? error : message}
                </p>
                <Button text="Update About" className="confirmbtn" />
           </form>
        </section>
    );
}

export default AdminAbout