import { Data_AddProject, Data_DelProject, Data_isLoadingProjects, Data_SetAllProjectsData, Data_SetProjectData, Data_UpdateAllProjects, ProjectAction, ProjectState } from "../types/projectTypes";

const initialProjectsState: ProjectState =
{
    allProjects: [],
    isLoadingProjects: true,
}
export const projectReducer = (state = initialProjectsState, action: ProjectAction) : ProjectState =>
{
    switch (action.type)
    {
        case Data_SetAllProjectsData:
            return {...state, allProjects: action.payload};

        case Data_SetProjectData:
            const newProjects = state.allProjects;
            const project_index = newProjects.findIndex((proj) => {return proj.project_id === action.payload.project_id});
            newProjects[project_index] = action.payload;
            return {...state, allProjects: newProjects};
            
        case Data_AddProject:
            const allProjects = state.allProjects;
            allProjects.push(action.payload);
            return {...state, allProjects: allProjects};

        case Data_UpdateAllProjects:
            action.payload.forEach((project, index) => {project.project_order = index});
            return {...state, allProjects: action.payload};
        
        case Data_DelProject:
            const newAllProjects = state.allProjects.filter((proj) => {return proj.project_id !== action.payload.project_id});
            newAllProjects.forEach((project, index) => {project.project_order = index});
            return {...state, allProjects: newAllProjects};
        
        case Data_isLoadingProjects:
            return {...state, isLoadingProjects: action.payload};
            
        default:
            return state;
    }
}