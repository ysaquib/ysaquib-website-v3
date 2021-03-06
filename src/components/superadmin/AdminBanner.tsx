/**
 * File: AdminBanner.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import Banner from '../sections/Banner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BannerData } from '../../store/types/dataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getBannerData, setBannerData } from '../../store/actions/dataActions';
import Button from '../elements/Button';

const schema = yup.object().shape(
{
    banner_prefix : yup.string().required("is required."),
    banner_name : yup.string().required("is required."),
    banner_title : yup.string().required("is required."),
    banner_resume_url : yup.string().matches(/^(.+)\/([^/]+)$/gs, {message: "must be a valid file path.", excludeEmptyString: true}).required("is required."),
});


const AdminBanner : FC = () =>
{
    const dispatch = useDispatch();
    const BannerData = useSelector((state: RootState) => state.banner);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}} = useForm<BannerData>({mode:"all" ,resolver});
    const [banner, setBanner] = useState<BannerData>(BannerData);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    /**
     * Get banner data from the database.
     */
    useEffect(() => 
    {
        dispatch(getBannerData(() => setError("Error getting Banner Data")));
    }, [dispatch]);

    useEffect(() => 
    {
        setBanner(BannerData);
        
        return () =>
        {
            setBanner(BannerData);
        }
    }, [BannerData]);


    /**
     * Handle edit submission.
     */
    const onSubmit : SubmitHandler<BannerData> = (data) => 
    {
        setLoading(true);
        dispatch(setBannerData(data, (err) => {setError(err)}));
        setLoading(false);
        setMessage("Successfully updated banner.");
    }

    return (
        <section id="admin_banner" className="admin">
            <Banner />
            <form className="edit banner" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="category_title">Edit Banner</h3>
                <TextField label="Prefix Title" 
                           name="banner_prefix"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           defaultValue={banner.banner_prefix}
                           message={errors.banner_prefix?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Name" 
                           name="banner_name"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           defaultValue={banner.banner_name}
                           message={errors.banner_name?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Title" 
                           name="banner_title"
                           classNameInner="elevated"
                           type="text"
                           defaultValue={banner.banner_title}
                           message={errors.banner_title?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Resume Path" 
                           name="banner_resume_url"
                           classNameInner="elevated"
                           type="text"
                           defaultValue={banner.banner_resume_url}
                           message={errors.banner_resume_url?.message} 
                           register={register} 
                           registration={{required: true}} />

                <p className={`message ${error !== "" && !isLoading ? "error" : ""}`}>
                    {error !== "" && !isLoading ? error : message}
                </p>
                <Button text="Update Banner" className="confirmbtn" />
           </form>
        </section>
    );
}

export default AdminBanner