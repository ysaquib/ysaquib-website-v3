/**
 * 
 */

import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { Data_AddProject, Data_DelProject, Data_isLoadingProjects, Data_SetAllProjectsData, Data_SetProjectData, Data_UpdateAllProjects, ProjectAction, ProjectData } from '../types/projectTypes';

export const getProjectData = (onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const projects = await Firebase.firestore().collection("projects").orderBy("project_order").get();
            const project_items: ProjectData[] = [];
            projects.forEach((doc) => {
                project_items.push({
                    ...doc.data(), 
                    project_id: doc.id, 
                    project_startDate: doc.get("project_startDate").toDate(),
                    project_endDate: doc.get("project_endDate").toDate()
                } as ProjectData);
            });

            dispatch({type: Data_SetAllProjectsData, payload: project_items});
            dispatch(setProjectsLoading(false));
            onComplete && onComplete();

        }
        catch (error)
        {
            onError && onError();
            console.error(error);
            dispatch(setProjectsLoading(false));
        }
    }
}


export const setProjectData = (projectData: ProjectData, onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const {project_id, ...project} = projectData;
            const proj_startDate = firebase.firestore.Timestamp.fromDate(project.project_startDate);
            const proj_endDate = firebase.firestore.Timestamp.fromDate(project.project_endDate);

            await Firebase.firestore().collection("projects").doc(projectData.project_id).set({
                ...project, 
                project_startDate: proj_startDate, 
                project_endDate: proj_endDate
            });

            dispatch({
                type: Data_SetProjectData, 
                payload: projectData
            });

            onComplete && onComplete();

            dispatch(setProjectsLoading(false));

        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

const updateProjectsOrders = (allProjects: ProjectData[]) =>
{
    const promises: any[] = [] 
    for (var i = 0; i < allProjects.length; i++)
    {
        promises.push(Firebase.firestore().collection("projects").doc(allProjects[i].project_id).update({project_order: i}));
    }
    Promise.all(promises);
}

export const updateAllProjects = (allProjects: ProjectData[], onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            updateProjectsOrders(allProjects);

            dispatch({
                type: Data_UpdateAllProjects,
                payload: allProjects
            });
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}


export const addNewProject = (projectData: ProjectData, allProjects: ProjectData[], onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const {project_id, ...project} = {...projectData, project_order: allProjects.length};
            const proj_startDate = firebase.firestore.Timestamp.fromDate(project.project_startDate);
            const proj_endDate = firebase.firestore.Timestamp.fromDate(project.project_endDate);
            
            const storedProject = await Firebase.firestore().collection("projects").add({
                ...project, 
                project_startDate: proj_startDate, 
                project_endDate: proj_endDate
            });

            dispatch({
                type: Data_AddProject,
                payload: {...project, project_id: storedProject.id}
            });

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}


export const deleteProject = (projectData: ProjectData, allProjects: ProjectData[], onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try
        {
            await Firebase.firestore().collection("projects").doc(projectData.project_id).delete();

            updateProjectsOrders(allProjects.filter((proj) => {return proj.project_id !== projectData.project_id}));

            dispatch({
                type: Data_DelProject,
                payload: projectData
            });
            

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const setProjectsLoading = (isLoading: boolean) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_isLoadingProjects, 
            payload: isLoading
        });
    }
}