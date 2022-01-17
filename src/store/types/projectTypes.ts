export const Data_SetProjectData = "Data_SetProjectData";
export const Data_SetAllProjectsData = "Data_SetAllProjectsData";
export const Data_AddProject = "Data_AddProject";
export const Data_DelProject = "Data_DelProject";
export const Data_UpdateAllProjects = "Data_UpdateAllProjects";
export const Data_isLoadingProjects = "Data_isLoadingProjects";

export interface ProjectData
{
    project_id: string;
    project_title: string;
    project_description: string;
    project_tags: string;
    project_order: number;
    project_startDate: Date;
    project_endDate: Date;
    project_blog?: string;
    project_github?: string;
    project_url?: string;
    project_inProgress?: boolean;
    project_progress?: number;
    project_isHidden?: boolean;
}

interface SetAllProjectsDataAction
{
    type: typeof Data_SetAllProjectsData;
    payload: ProjectData[];
}

interface SetProjectDataAction
{
    type: typeof Data_SetProjectData;
    payload: ProjectData;
}

interface AddProjectAction
{
    type: typeof Data_AddProject;
    payload: ProjectData;
}

interface DelProjectAction
{
    type: typeof Data_DelProject;
    payload: ProjectData;
}

interface UpdateAllProjectsAction
{
    type: typeof Data_UpdateAllProjects;
    payload: ProjectData[];
}

interface SetLoadingProjectsAction
{
    type: typeof Data_isLoadingProjects;
    payload: boolean;
}

export interface ProjectState
{
    allProjects: ProjectData[];
    isLoadingProjects: boolean;
}

export type ProjectAction = SetProjectDataAction | SetLoadingProjectsAction | SetAllProjectsDataAction | AddProjectAction | DelProjectAction | UpdateAllProjectsAction;
