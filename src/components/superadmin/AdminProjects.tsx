/**
 * File: About.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectData } from '../../store/types/dataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getProjectData } from '../../store/actions/dataActions';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';

const schema = yup.object().shape(
{
    project_title : yup.string().required("is required."),
    project_description : yup.string().required("is required."),
});

const AdminProjects : FC = () =>
{
    const dispatch = useDispatch();
    const ProjectsData = useSelector((state: RootState) => state.projects);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}} = useForm<ProjectData>({mode:"all" ,resolver});
    const [projects, setProjects] = useState<ProjectData[]>(ProjectsData);
    const [project, setProject] = useState<ProjectData>();

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    
    useEffect(() => 
    {
        dispatch(getProjectData(() => {console.log("Error getting about data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setProjects(ProjectsData);
        
        return () =>
        {
            setProjects(ProjectsData);
        }
    }, [ProjectsData]);

    const onSubmit : SubmitHandler<ProjectData> = (data) => 
    {
        console.log(data);
        setLoading(true);
        // dispatch(setProjectData(data, (err) => {setError(err)}));
        setLoading(false);
        setMessage("Successfully updated about.");
    }
    //onSubmit={handleSubmit(onSubmit)}>
    return (
        <section id="admin_project" className="admin projects" >
            <div id="admin_projects_list">
                <h1>Admin Projects List</h1>
            </div>
            <form className="edit projects">
                <h3>Edit Project Information</h3>

                <p className={`message ${error != null && !isLoading ? "error" : ""}`}>
                    {error != null && !isLoading ? error : message}
                </p>
                <Button text="Update About" className="confirmbtn" />
            </form>
        </section>

    );
}

export default AdminProjects