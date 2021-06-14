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
import { ChevronRight } from '@material-ui/icons';
import CheckBox from '../elements/Checkbox';

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
        if (project)
        {
            document.getElementById("project_title_input")?.setAttribute("defaultValue", project!.project_title);
            console.log(project);
        }
        return () => {
        }
    }, [project]);

    useEffect(() => 
    {
        dispatch(getProjectData(() => {setLoading(false)}, () => {console.log("Error getting about data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setProjects(ProjectsData);
        
        return () =>
        {
            setProjects([]);
        }
    }, [ProjectsData]);

    function changeProject(id: string)
    {
        setProject(projects.find((proj) => {return proj.project_id === id}));
    }
    // export interface ProjectData
    // {
    //     project_languages: string[];
    //     project_order: number;
    //     project_inProgress: boolean;
    //     project_progress?: number;
    // }
    const onSubmit : SubmitHandler<ProjectData> = (data) => 
    {
        console.log(data);
        console.log(data);
        setLoading(true);
        // dispatch(setProjectData(data, (err) => {setError(err)}));
        setLoading(false);
        setMessage("Successfully updated project" + project?.project_id +".");
    }
    //
    return (
        <section id="admin_project" className="admin projects" >
            <div id="admin_projects_list">
                <ul className="projects_list">
                    {projects && projects.map((project: ProjectData) =>
                        <li className="project_item" key={project.project_id}
                            onClick={() => changeProject(project.project_id)}>
                            <h3 className="project_item_title">{project.project_title}</h3>
                            <ChevronRight className="chevron"/>
                        </li>
                    )}
                </ul>
            </div>
            <form className="edit projects" onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit Project Information</h3>
                <TextField label="Project Title" 
                           name="project_title"
                           type="text"
                           className="half"
                           defaultValue={project?.project_title}
                           message={errors.project_title?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />
                
                <TextField label="Project ID" 
                           name="project_id"
                           type="text"
                           className="half"
                           defaultValue={project?.project_id}
                           message={errors.project_id?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled show_label/>
                
                <TextField label="Github Repository URL" 
                           name="project_github"
                           type="text"
                           className="half"
                           defaultValue={project?.project_github}
                           message={errors.project_github?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />

                <TextField label="Project Demo URL" 
                           name="project_url"
                           type="text"
                           className="half"
                           defaultValue={project?.project_url}
                           message={errors.project_url?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />

                <TextField label="Image URL" 
                           name="project_image"
                           type="text"
                           defaultValue={project?.project_image}
                           message={errors.project_image?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />

                <TextArea label="Project Description" 
                           name="project_description"
                           className="desc_textarea"
                           rows={10}
                           defaultValue={project?.project_description}
                           message={errors.project_description?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />

                <TextField label="Progress" 
                           name="project_progress"
                           type="text"
                           className="half"
                           defaultValue={project?.project_progress}
                           message={errors.project_progress?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />
                
                <CheckBox label="Work In Progress"
                          name="project_inProgress"
                          className="half"
                          register={register} 
                          registration={{required: false}} 
                          disabled={project == null} />

                <TextField label="Languages" 
                           name="project_languages"
                           type="text"
                           className="half"
                           defaultValue={project?.project_languages}
                        //    message="undef"
                        //    message={errors.project_languages?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />

                <p className={`message ${error != null && !isLoading ? "error" : ""}`}>
                    {error != null && !isLoading ? error : message}
                </p>
                <Button text="Update About" className="confirmbtn" />
            </form>
        </section>

    );
}

export default AdminProjects