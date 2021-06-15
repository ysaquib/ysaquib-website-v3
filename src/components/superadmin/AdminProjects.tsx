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
import { addNewProject, deleteProject, getProjectData, setProjectData, updateAllProjects, updateProjectsOrder } from '../../store/actions/dataActions';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import { Add, ChevronRight } from '@material-ui/icons';
import CheckBox from '../elements/Checkbox';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const schema = yup.object().shape(
{
    project_title : yup.string().required("is required."),
    project_description: yup.string().required("is required."),
    project_id: yup.string(),
    project_languages: yup.string().required("is required."),
    project_image: yup.string().url("must be a valid URL"),
    project_github: yup.string().url("must be a valid URL"),
    project_url: yup.string().url("must be a valid URL"),
    project_inProgress: yup.boolean(),
    project_progress: yup.number().typeError("must be a valid number.")
                         .when('project_inProgress', {
                             is: true, 
                             then: yup.number()
                                      .typeError("must be a valid number.")
                                      .min(0, "must be at least 0")
                                      .max(100, "must be at most 100.")
                                      .required("is required.")})
});

const AdminProjects : FC = () =>
{
    const dispatch = useDispatch();
    const ProjectsData = useSelector((state: RootState) => state.projects);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<ProjectData>({mode:"onChange", resolver});
    const [projects, setProjects] = useState<ProjectData[]>(ProjectsData);
    const [project, setProject] = useState<ProjectData>();

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState<string>("");

    const [isNewProject, setNewProject] = useState<boolean>(false);
    const [isInProgress, setInProgress] = useState<boolean>(project?.project_inProgress ?? false);
    
    /**
     * This useEffect sets the initial values of all the fields when a project
     * is selected (or when the current project is changed)
     */
    useEffect(() => 
    {
        if (project)
        {
            setValue("project_title", project.project_title);
            setValue("project_description", project.project_description);
            setValue("project_id", project.project_id);
            setValue("project_languages", project.project_languages);
            setValue("project_image", project.project_image);
            setValue("project_github", project.project_github);
            setValue("project_url", project.project_url);
            setValue("project_inProgress", project.project_inProgress);
            setValue("project_progress", project.project_progress);
            
            setMessage("");
        }
        return () => {}
    }, [project]);

    /**
     * When the message is updated, we get the data again and set the list 
     * accordingly
     */
    useEffect(() => 
    {
        dispatch(getProjectData(() => {
            setLoading(false)
        }, () => {
            console.log("Error getting about data")}
        ));
    }, [dispatch, message]);


    /**
     * When projects is updated or when we first get the ProjectData, 
     * set the projects accordingly
     */
    useEffect(() => 
    {
        setProjects(ProjectsData);
        
        return () =>
        {
            setProjects([]);
        }
    }, [ProjectsData]);

    /**
     * This function takes an id of a project and sets the current selected 
     * projects for visual purposes and removes the selected class from any
     * previously selected projects.
     * 
     * Also it makes sure that if a new project was being created before, it
     * cancels its creation.
     */
    function changeProject(id: string)
    {
        setNewProject(false);
        const collection = document.getElementsByClassName("project_item");

        for (var i = 0; i < collection.length; i++)
        {
            collection.item(i)?.classList.remove("selected");
        }

        document.getElementById(id)?.classList.add("selected");
        setProject(projects.find((proj) => {return proj.project_id === id})); 
    }

    /**
     * createNewProject will create an empty project and set it as the current
     * project such that when the form is submitted, the current project will
     * be created in the database
     */
    const createNewProject = () =>
    {
        const new_project = 
        {
            project_description: "", 
            project_title: "",
            project_id: "",
            project_order: -1,
            project_languages: "",
            project_progress: 0
        }
        setNewProject(true);
        setProject(new_project);
    }

    /**
     * dispatches a project to be deleted from the database.
     */
    const delProject = () =>
    {
        if(project)
            dispatch(deleteProject(project, projects, (err) => {setError(err)}));
        setProject(projects[0]);
        setMessage("Successfully Deleted");
    }

    function handleOnDragEnd (result: any)
    {
        if (!result.destination) return;

        const reorderedProjects = Array.from(projects);
        const [reorderedItem] = reorderedProjects.splice(result.source.index, 1);
        reorderedProjects.splice(result.destination.index, 0, reorderedItem);

        updateProjectsOrder(reorderedProjects);
        setProjects(reorderedProjects);
        dispatch(updateAllProjects(reorderedProjects, () => {}));
    }
    
    /**
     * Upon form submission, check if we are creating a new project or updating
     * an existing one. Perform the appropriate function.
     * 
     * We assume project is not null since we cannot submit the form if the 
     * project does not exist.
     */
    const onSubmit : SubmitHandler<ProjectData> = (data) => 
    {
        console.log("TEST");
        setLoading(true);
        const new_project = {...project, ...data};
        if(isNewProject && project)
        {
            dispatch(addNewProject(new_project, projects, (err) => {setError(err)}));
        }
        else if(project)
        {
            dispatch(setProjectData(new_project, projects, (err) => {setError(err)}));
        }
        setLoading(false);
        setNewProject(false);

        setMessage("Successfully updated '" + data.project_title +"'.");
    }
    

    return (
        <section id="admin_project" className="admin projects" >
            <div id="admin_projects_list">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="projects_list">
                {
                    (provided) => (
                    <ul className="projects_list" {...provided.droppableProps} ref={provided.innerRef}>
                        {projects && projects.map((project: ProjectData, index: number) =>
                        {return (
                            <Draggable key={project.project_id} draggableId={project.project_id} index={index} >
                                {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                            className="project_item"
                                            key={project.project_id} 
                                            id={project.project_id}
                                            onClick={() => changeProject(project.project_id)}>
                                            
                                            <h3 className="project_item_title">{project.project_title}</h3>
                                            <ChevronRight className="chevron"/>
                                        
                                        </li>
                                    )
                                }
                            </Draggable>
                        );})}
                        {provided.placeholder}
                    </ul>

                )}
                </Droppable>
                </DragDropContext>                

                <li className="project_item add" key="add" onClick={createNewProject}><Add className="add"/></li>
                <li className="project_item delete" key="delete" onClick={delProject}>Delete Project</li>
            </div>
            <form className="edit projects" onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit Project Information</h3>
                <TextField label="Project Title" 
                           name="project_title"
                           type="text"
                           className="half"
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
                           disabled={!isInProgress}
                           show_label />
                
                <CheckBox label="Work In Progress"
                          name="project_inProgress"
                          className="half"
                          register={register} 
                          registration={{required: false}} 
                          disabled={project == null} 
                          onChange={() => setInProgress(!isInProgress)}/>

                <TextField label="Languages" 
                           name="project_languages"
                           type="text"
                           defaultValue={project?.project_languages}
                           message={errors.project_languages?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />

                <p className={`message ${error != null && !isLoading ? "error" : ""}`}>
                    {error != null && !isLoading ? error : message}
                </p>
                <Button text="Update Project" className="confirmbtn" />
            </form>
            
        </section>

    );
}

export default AdminProjects