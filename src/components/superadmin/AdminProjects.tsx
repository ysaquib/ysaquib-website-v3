/**
 * File: AdminProjects.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import * as yup from 'yup';
import { format, parse } from "date-fns";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectData } from '../../store/types/dataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addNewProject, deleteProject, getProjectData, setProjectData, setProjectsLoading, updateAllProjects } from '../../store/actions/dataActions';
import Button from '../elements/Button';
import TextArea from '../elements/TextArea';
import CheckBox from '../elements/Checkbox';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import DialogBox from '../elements/DialogBox';
import { IconAdd, IconChevronRight, IconGarbageDelete } from '../elements/Icons';

const schema = yup.object().shape(
{
    project_title : yup.string().required("is required."),
    project_description: yup.string().required("is required."),
    project_tags: yup.string().required("is required."),
    project_blog: yup.string().url("must be a valid URL"),
    project_github: yup.string().url("must be a valid URL"),
    project_url: yup.string().url("must be a valid URL"),
    project_inProgress: yup.boolean(),
    project_isHidden: yup.boolean(),
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
    const {allProjects, isLoadingProjects} = useSelector((state: RootState) => state.projects);
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}, setValue, setFocus} = useForm<ProjectData>({mode:"onChange", resolver});
    const [projects, setProjects] = useState<ProjectData[]>(allProjects);
    const [project, setProject] = useState<ProjectData>();

    const [error, setError] = useState(null);
    const [message, setMessage] = useState<string>("");

    const [isNewProject, setNewProject] = useState<boolean>(false);
    const [isInProgress, setInProgress] = useState<boolean>(project?.project_inProgress ?? false);
    const [isHidden, setIsHidden] = useState<boolean>(project?.project_isHidden ?? false);
    const [currentDate, setCurrentDate] = useState<string>(format(project?.project_createdAt ?? new Date(Date.now()), "yyyy-MM-dd"));

    const [dialog, setDialog] = useState(<></>);
    
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
            setValue("project_tags", project.project_tags);
            setValue("project_blog", project.project_blog ?? "");
            setValue("project_github", project.project_github ?? "");
            setValue("project_url", project.project_url ?? "");
            setValue("project_inProgress", project.project_inProgress ?? false);
            setValue("project_isHidden", project.project_isHidden ?? false);
            setValue("project_progress", project.project_progress ?? 0);
            setCurrentDate(format(project.project_createdAt, "yyyy-MM-dd"));
            
            setMessage("");
            setInProgress(project.project_inProgress ?? false);
            setFocus("project_title");
        }
        return () => 
        {
            setMessage("");
        }
    }, [project, setValue, setFocus, setCurrentDate]);

    /**
     * When the message is updated, we get the data again and set the list 
     * accordingly
     */
    useEffect(() => 
    {
        dispatch(getProjectData(undefined, () => {console.log("Error getting project data")}));
    }, [dispatch]);


    /**
     * When projects is updated or when we first get the ProjectData, 
     * set the projects accordingly
     */
    useEffect(() => 
    {
        setProjects(allProjects);
        return () =>
        {
            setProjects([]);
        }
    }, [allProjects]);

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
            project_tags: "",
            project_progress: 0,
            project_createdAt: new Date(Date.now()),
        }
        setNewProject(true);
        setProject(new_project);
    }

    /**
     * dispatches a project to be deleted from the database.
     */
    const delProject = () =>
    {
        setDialog(<></>);
        if(project)
        {
            dispatch(deleteProject(project, projects, undefined, (err) => {setError(err)}));
        }
        setProject(undefined);
        setMessage("Successfully Deleted");
    }

    /**
     * Open dialog when delete button is clicked
     */
    const handleDeleteDialog = () =>
    {
        if (project)
        {
            setDialog(
                <DialogBox 
                    title="Confirm Delete Project" 
                    message={`Are you sure you want to delete '${project?.project_title ?? "undefined" }' ?`}
                    messageError="Warning: this action cannot be undone."
                    optionReject="Delete Project"
                    onReject={delProject}
                    optionClose="Keep Project"
                    onClose={() => {setDialog(<></>)}}/>
            );
        }
    }

    /**
     * handleOnDragEnd handles the result when the project list is reordered 
     * using drag and drop features. In this case, the orders of all projects
     * are updated by index in the array and the dispatch is sent to update
     * the projects in the database. 
     */
    function handleOnDragEnd (result: any)
    {
        if (!result.destination) return;

        const reorderedProjects = Array.from(projects);
        const [reorderedItem] = reorderedProjects.splice(result.source.index, 1);
        reorderedProjects.splice(result.destination.index, 0, reorderedItem);

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
        dispatch(setProjectsLoading(true));

        const proj_id = project?.project_id ?? "";
        const proj_prog = data.project_progress ?? project?.project_progress ?? 0;

        const {project_id, ...project_data} = data;
        const new_project = {
            ...project, 
            ...project_data,
            project_id: proj_id,
            project_progress: proj_prog,
            project_inProgress: isInProgress,
            project_createdAt: parse(currentDate, "yyyy-MM-dd", new Date())
        };

        if(isNewProject && project)
        {
            dispatch(addNewProject(new_project, projects, undefined, (err) => {setError(err)}));
        }
        else if(!isNewProject && project)
        {
            dispatch(setProjectData(new_project, undefined, (err) => {setError(err)}));
        }
        
        setNewProject(false);

        setMessage(`Successfully ${isNewProject ? "created" : "updated"} '` + data.project_title +"'.");
    }
    
    /**
     * TODO: Add isHidden checkbox to dashboard
     * TODO: Improve the CSS
     */

    /**
     * This could definitely be made a lot better but at this point it works
     * well and it could break things to separate the list and box into two
     * separate components so I will just leave it for now.
     * 
     * Either way, not much will change since realistically I can only separate
     * the list item, which isnt that much anyways, and the project details are
     * not that complicated.
     */
    return (
        <section id="admin_project" className="admin projects" >
            {dialog}
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
                                            <span className="svg_icon chevron">{IconChevronRight}</span>
                                        
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

                {/* $ Here are the project buttons to add and delete $ */}
                <div className="project_buttons">
                    <li className="project_item button_add" key="add" onClick={createNewProject}><span className="svg_icon add">{IconAdd}</span></li>
                    <li className="project_item button_delete" key="delete" onClick={handleDeleteDialog}><span className="svg_icon add">{IconGarbageDelete}</span></li>
                </div>

            </div>
            <form className="edit projects" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="category_title">Edit Project Information</h3>
                <TextField label="Project Title" 
                           name="project_title"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           message={errors.project_title?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />

                <TextField label="Blog URL" 
                           name="project_blog"
                           type="text"
                           className="half"
                           classNameInner="elevated"
                           defaultValue={project?.project_blog}
                           message={errors.project_blog?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />
                                
                <TextField label="Github Repository URL" 
                           name="project_github"
                           type="text"
                           classNameInner="elevated"
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
                           classNameInner="elevated"
                           className="half"
                           defaultValue={project?.project_url}
                           message={errors.project_url?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={project == null}
                           show_label />

                <TextArea label="Project Description" 
                           name="project_description"
                           classNameInner="elevated"
                           className="desc_textarea"
                           rows={5}
                           defaultValue={project?.project_description}
                           message={errors.project_description?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />

                <TextField label="Tags" 
                           name="project_tags"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           defaultValue={project?.project_tags}
                           message={errors.project_tags?.message} 
                           register={register} 
                           registration={{required: true}} 
                           disabled={project == null}
                           show_label />

                <TextField  label="Creation Date"
                            type="date"
                            className="half"
                            classNameInner="elevated"
                            name="project_createdAt"
                            value={currentDate}
                            onChangeEvent={(e) => setCurrentDate(e.currentTarget.value)}
                            message={errors.project_createdAt?.message} 
                            disabled={project == null}
                            register={register} 
                            registration={{required: true}}
                            show_label  />

                <div className="checkboxes">
                    <CheckBox label="In Progress?"
                            name="project_inProgress"
                            className="half"
                            register={register} 
                            registration={{required: false}} 
                            disabled={project == null} 
                            onChange={() => setInProgress(!isInProgress)}/>
                    
                    <CheckBox label="Is Hidden?"
                            name="project_isHidden"
                            className="half"
                            register={register} 
                            registration={{required: false}} 
                            disabled={project == null} 
                            onChange={() => setIsHidden(!isHidden)}/>
                </div>

                <TextField label="Progress" 
                           name="project_progress"
                           type="text"
                           classNameInner="elevated"
                           className="half"
                           defaultValue={project?.project_progress}
                           message={errors.project_progress?.message} 
                           register={register} 
                           registration={{required: false}} 
                           disabled={!isInProgress}
                           show_label />


                <p className={`message ${error != null && !isLoadingProjects ? "error" : ""}`}>
                    {error != null && !isLoadingProjects ? error : message}
                </p>
                <Button text={isNewProject ? "Create Project" : "Update Project"} className="confirmbtn" />
            </form>
            
        </section>

    );
}

export default AdminProjects