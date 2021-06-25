import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { BannerData, Data_SetBannerData, BannerAction, AboutData, AboutAction, Data_SetAboutData, ProjectData, Data_SetProjectData, ProjectAction, BlogAction, Data_SetBlogData, BlogData } from '../types/dataTypes';

export const getBannerData = (onError: () => void) : ThunkAction<void, RootState, null, BannerAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const bannerInfo = await Firebase.firestore().collection("basic_info").doc("banner_info").get();
            if (bannerInfo.exists)
            {
                const bannerData = bannerInfo.data() as BannerData;
                dispatch({type: Data_SetBannerData, payload: bannerData});
            }
        }
        catch (error)
        {
            onError();
            console.log(error);
        }
    }
}

export const setBannerData = (bannerData: BannerData, onError: (msg: any) => void) : ThunkAction<void, RootState, null, BannerAction> =>
{
    return async dispatch =>
    {
        try 
        {
            await Firebase.firestore().collection("basic_info").doc("banner_info").set(bannerData);
            dispatch({type: Data_SetBannerData, payload: bannerData});
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}

export const getAboutData = (onError: () => void) : ThunkAction<void, RootState, null, AboutAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const aboutInfo = await Firebase.firestore().collection("basic_info").doc("about_info").get();
            if (aboutInfo.exists)
            {
                const aboutData = aboutInfo.data() as AboutData;
                dispatch({type: Data_SetAboutData, payload: aboutData});
            }
        }
        catch (error)
        {
            onError();
            console.log(error);
        }
    }
}

export const setAboutData = (aboutData: AboutData, onError: (msg: any) => void) : ThunkAction<void, RootState, null, AboutAction> =>
{
    return async dispatch =>
    {
        try 
        {
            await Firebase.firestore().collection("basic_info").doc("about_info").set(aboutData);
            dispatch({type: Data_SetAboutData, payload: aboutData});
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}

export const getProjectData = (onComplete: () => void, onError: () => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const projects = await Firebase.firestore().collection("projects").orderBy("project_order").get();
            const project_items: ProjectData[] = [];
            projects.forEach((doc) => {
                project_items.push({...doc.data(), project_id: doc.id} as ProjectData);
            })
            console.log(project_items);
            dispatch({type: Data_SetProjectData, payload: project_items});
            onComplete();
        }
        catch (error)
        {
            onError();
            console.log(error);
        }
    }
}


export const setProjectData = (projectData: ProjectData, allProjects: ProjectData[], onError: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const {project_id, ...project} = projectData;
            
            const project_index = allProjects.findIndex((proj) => {return proj.project_id === projectData.project_id});
            allProjects[project_index] = projectData;
            await Firebase.firestore().collection("projects").doc(projectData.project_id).set(project as ProjectData);
            dispatch({
                type: Data_SetProjectData, 
                payload: allProjects
            });
            console.log("Success");
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}

export const updateProjectsOrder = (allProjects: ProjectData[]) =>
{
    return allProjects.forEach((project, index) => {project.project_order = index});
}

export const updateAllProjects = (allProjects: ProjectData[], onError?: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            for (var i = 0; i < allProjects.length; i++)
            {
                const {project_id, ...project} = allProjects[i];
                await Firebase.firestore().collection("projects").doc(allProjects[i].project_id).set(project as ProjectData);
            }
            dispatch({
                type: Data_SetProjectData, 
                payload: allProjects
            });
        }
        catch (error)
        {
            onError && onError(error);
            console.log(error);
        }
    }
}


export const addNewProject = (projectData: ProjectData, allProjects: ProjectData[], onError: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const {project_id, project_order, ...project} = projectData;
            
            const newProject = {...project, project_order: allProjects.length};
            const storedProject = await Firebase.firestore().collection("projects").add(newProject as ProjectData);
            allProjects.push({...newProject, project_id: storedProject.id});
            updateProjectsOrder(allProjects);
            updateAllProjects(allProjects)
            console.log("Success");
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}


export const deleteProject = (project : ProjectData, allProjects: ProjectData[], onError: (msg: any) => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const newAllProjects = allProjects.filter((proj) => {return proj.project_id !== project.project_id});
            await Firebase.firestore().collection("projects").doc(project.project_id).delete()
            updateProjectsOrder(newAllProjects);
            updateAllProjects(allProjects)
            console.log(newAllProjects);
            console.log("Successfully Deleted");
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}


export const getBlogData = (onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const blogs = await Firebase.firestore().collection("blogs").orderBy("blog_createdAt", "desc").get();
            const blog_items: BlogData[] = [];
            blogs.forEach((doc) => {
                if (doc.get("blog_updatedAt") != null)
                {
                    blog_items.push({...doc.data(), blog_id: doc.id, blog_createdAt: doc.get("blog_createdAt").toDate(), blog_updatedAt: doc.get("blog_updatedAt").toDate()} as BlogData);
                }
                else
                {
                    blog_items.push({...doc.data(), blog_id: doc.id, blog_createdAt: doc.get("blog_createdAt").toDate()} as BlogData);
                }
            })
            console.log(blog_items);
            dispatch({type: Data_SetBlogData, payload: blog_items});
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError();
            console.log(error);
        }
    }
}

export const setBlogData = (blogData: BlogData, allBlogs: BlogData[], update?: boolean, onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            const currentTime = new Date(Date.now());
            const updatedAt = firebase.firestore.Timestamp.fromDate(currentTime);
            const {blog_id, ...blog} = blogData;

            console.log(blogData);

            if (update)
            {
                blogData.blog_updatedAt = currentTime;
                await Firebase.firestore().collection("blogs").doc(blogData.blog_id).set({...blog, blog_updatedAt: updatedAt});
            }
            else 
            {
                await Firebase.firestore().collection("blogs").doc(blogData.blog_id).set(blog as BlogData);
            }
            
            const index = allBlogs.findIndex((blogItem) => {return blogItem.blog_id === blogData.blog_id});
            allBlogs[index] = blogData;
            
            onComplete && onComplete();
            
            dispatch({
                type: Data_SetBlogData, 
                payload: allBlogs
            });
            console.log("Success");
        }
        catch (error)
        {
            onError && onError();
            console.log(error);
        }
    }
}

export const hideBlog = (blogData: BlogData, allBlogs: BlogData[], onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            const isHidden = blogData.blog_isHidden ?? false;
            console.log(blogData);
            dispatch(setBlogData({...blogData, blog_isHidden: !isHidden}, allBlogs, false, onComplete, onError));
            console.log("Success");
        }
        catch (error)
        {
            onError && onError();
            console.log(error);
        }
    }
}

export const addNewBlog = (blogData: BlogData, allBlogs: BlogData[], onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            const currentTime = new Date(Date.now());
            const createdAt = firebase.firestore.Timestamp.fromDate(currentTime);

            blogData.blog_createdAt = currentTime;
            const {blog_id, ...blog} = blogData;
            await Firebase.firestore().collection("blogs").add({...blog, blog_createdAt: createdAt});
            
            allBlogs.push(blogData);
            
            onComplete && onComplete();

            dispatch({
                type: Data_SetBlogData, 
                payload: allBlogs
            });
            console.log("Success");
        }
        catch (error)
        {
            onError && onError();
            console.log(error);
        }
    }
}


export const deleteBlog = (blogData: BlogData, allBlogs: BlogData[], onError: (msg: any) => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            const newAllBlogs = allBlogs.filter((blog) => {return blog.blog_id !== blogData.blog_id});
            await Firebase.firestore().collection("blogs").doc(blogData.blog_id).delete();
            
            dispatch({
                type: Data_SetBlogData, 
                payload: newAllBlogs
            });
            console.log("Successfully deleted Blog");
            console.log(newAllBlogs);
        }
        catch (error)
        {
            onError(error);
            console.log(error);
        }
    }
}

