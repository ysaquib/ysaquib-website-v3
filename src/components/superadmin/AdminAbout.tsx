/**
 * File: About.tsx
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
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    
    useEffect(() => 
    {
        dispatch(getAboutData(() => {console.log("Error getting about data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setAbout(AboutData);
        
        return () =>
        {
            setAbout(AboutData);
        }
    }, [AboutData]);

    const onSubmit : SubmitHandler<AboutData> = (data) => 
    {
        console.log(data);
        setLoading(true);
        dispatch(setAboutData(data, (err) => {setError(err)}));
        setLoading(false);
        setMessage("Successfully updated about.");
    }

    return (
        <section id="admin_about" className="admin" >
            <form className="edit about" onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit About Information</h3>
                <TextField label="Title" 
                           name="about_title"
                           type="text"
                           defaultValue={about.about_title}
                           message={errors.about_title?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextArea label="Description" 
                           name="about_description"
                           defaultValue={about.about_description}
                           message={errors.about_description?.message}
                           className="about_desc"
                           rows={15}
                           register={register} 
                           registration={{required: true}} />

                <p className={`message ${error != null && !isLoading ? "error" : ""}`}>
                    {error != null && !isLoading ? error : message}
                </p>
                <Button text="Update About" className="confirmbtn" />
           </form>
        </section>
    );
}

export default AdminAbout