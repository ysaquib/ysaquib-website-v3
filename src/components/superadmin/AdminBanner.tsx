/**
 * File: About.tsx
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
import { getBannerData } from '../../store/actions/dataActions';
import Button from '../elements/Button';

const schema = yup.object().shape(
{
    prefix : yup.string().required("is required."),
    name : yup.string().required("is required."),
    title : yup.string().required("is required."),
    resume_url : yup.string().url("must be a valid URL.").required("is required."),
});


const AdminBanner : FC = () =>
{
    const dispatch = useDispatch();
    const BannerData = useSelector((state: RootState) => state.banner);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}} = useForm<BannerData>({mode:"all" ,resolver});
    const [banner, setBanner] = useState<BannerData>(BannerData);
    
    useEffect(() => 
    {
        dispatch(getBannerData(() => {console.log("Error getting banner data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setBanner(BannerData);

        return () =>
        {
            setBanner(BannerData);
        }
    }, [BannerData]);

    const onSubmit : SubmitHandler<BannerData> = (data) => 
    {
        console.log(data);
    }

    return (
        <section id="admin_banner" >
            <Banner />
            <form className="edit_banner" onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit Banner</h3>
                <TextField label="Prefix Title" 
                           name="prefix"
                           type="text"
                           defaultValue={banner.prefix}
                           message={errors.prefix?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Name" 
                           name="name"
                           type="text"
                           defaultValue={banner.name}
                           message={errors.name?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Title" 
                           name="title"
                           type="text"
                           defaultValue={banner.title}
                           message={errors.title?.message} 
                           register={register} 
                           registration={{required: true}} />

                <TextField label="Resume URL" 
                           name="resume_url"
                           type="text"
                           defaultValue={banner.resume_url}
                           message={errors.resume_url?.message} 
                           register={register} 
                           registration={{required: true}} />

                <Button text="Update Banner" className="confirmbtn" />
           </form>
        </section>
    );
}

export default AdminBanner