/**
 * File: dataActions.ts
 * Author: Yusuf Saquib
 * 
 * functions are pretty self-explanatory.
 */

import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { BannerData, Data_SetBannerData, BannerAction, AboutData, AboutAction, Data_SetAboutData, ProjectData, Data_SetProjectData, ProjectAction, BlogAction, Data_SetBlogData, BlogData, MessageData, MessageAction, Data_AddMessageData, Data_IncrementNew, Data_DelMessageData, Data_SeenMessageData, Data_DecrementNew, Data_SetAllBlogsData, Data_DelBlog, Data_AddBlog, Data_SetAllProjectsData, Data_AddProject, Data_DelProject, Data_UpdateAllProjects, Data_isLoadingBlogs, Data_isLoadingProjects, Data_isLoadingMessages, Data_SetAllMessagesData, Data_SetNewMessagesCount } from '../types/dataTypes';

export const getBannerData = (onError?: () => void) : ThunkAction<void, RootState, null, BannerAction> =>
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
            onError && onError();
            console.error(error);
        }
    }
}

export const setBannerData = (bannerData: BannerData, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, BannerAction> =>
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
            onError && onError(error);
            console.error(error);
        }
    }
}

export const getAboutData = (onError?: () => void) : ThunkAction<void, RootState, null, AboutAction> =>
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
            onError && onError();
            console.error(error);
        }
    }
}

export const setAboutData = (aboutData: AboutData, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, AboutAction> =>
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
            onError && onError(error);
            console.error(error);
        }
    }
}

//  $
//  $   Project Data Actions ==================================================
//  $

export const getProjectData = (onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, ProjectAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const projects = await Firebase.firestore().collection("projects").orderBy("project_order").get();
            const project_items: ProjectData[] = [];
            projects.forEach((doc) => {
                project_items.push({...doc.data(), project_id: doc.id, project_createdAt: doc.get("project_createdAt").toDate()} as ProjectData);
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
            const proj_createdAt = firebase.firestore.Timestamp.fromDate(project.project_createdAt)

            await Firebase.firestore().collection("projects").doc(projectData.project_id).set({...project, project_createdAt: proj_createdAt});

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
            const proj_createdAt = firebase.firestore.Timestamp.fromDate(project.project_createdAt)
            
            const storedProject = await Firebase.firestore().collection("projects").add({...project, project_createdAt: proj_createdAt});

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

//  $
//  $   Blog Data Actions =====================================================
//  $

export const getBlogData = (onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try 
        {
            const blogs = await Firebase.firestore().collection("blogs").orderBy("blog_createdAt", "desc").get();
            const blog_items: BlogData[] = [];
            blogs.forEach((doc) => {
                const blog_updatedAt = doc.get("blog_updatedAt");
                if (blog_updatedAt != null)
                {
                    blog_items.push({...doc.data(), blog_id: doc.id, blog_createdAt: doc.get("blog_createdAt").toDate(), blog_updatedAt: doc.get("blog_updatedAt").toDate()} as BlogData);
                }
                else
                {
                    blog_items.push({...doc.data(), blog_id: doc.id, blog_createdAt: doc.get("blog_createdAt").toDate()} as BlogData);
                }
            })

            dispatch({
                type: Data_SetAllBlogsData, 
                payload: blog_items
            });
            dispatch(setBlogsLoading(false));
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError();
            console.error(error);
            dispatch(setBlogsLoading(false));
        }
    }
}

export const setBlogData = (blogData: BlogData, onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            console.error(blogData);
            const {blog_id, ...blog} = blogData;
            const createdAt = firebase.firestore.Timestamp.fromDate(blogData.blog_createdAt);
            

            if (blogData.blog_updatedAt)
            {
                const updatedAt = firebase.firestore.Timestamp.fromDate(blogData.blog_updatedAt);
                await Firebase.firestore().collection("blogs").doc(blogData.blog_id).set({...blog, blog_createdAt: createdAt, blog_updatedAt: updatedAt});
            }
            else 
            {
                await Firebase.firestore().collection("blogs").doc(blogData.blog_id).set({...blog, blog_createdAt: createdAt});
            }
            
            
            dispatch({
                type: Data_SetBlogData, 
                payload: blogData
            });

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError();
            console.error(error);
        }
    }
}

export const addNewBlog = (blogData: BlogData, onComplete?: () => void, onError?: () => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            const createdAt = firebase.firestore.Timestamp.fromDate(blogData.blog_createdAt);

            const {blog_id, blog_updatedAt, ...blog} = blogData;
            const DocRef = await Firebase.firestore().collection("blogs").add({...blog, blog_createdAt: createdAt});
                        
            
            dispatch({
                type: Data_AddBlog, 
                payload: {...blogData, blog_id: DocRef.id}
            });
            
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError();
            console.error(error);
        }
    }
}


export const deleteBlog = (blogData: BlogData, onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        try
        {
            await Firebase.firestore().collection("blogs").doc(blogData.blog_id).delete();
            
            dispatch({
                type: Data_DelBlog, 
                payload: blogData
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

export const setBlogsLoading = (isLoading: boolean) : ThunkAction<void, RootState, null, BlogAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_isLoadingBlogs, 
            payload: isLoading
        });
    }
}

//  $
//  $   Message Data Actions ==================================================
//  $

export const getMessages = (onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            const messages = await Firebase.firestore().collection("messages").orderBy("msg_sentAt", "desc").get();
            const message_items: MessageData[] = [];
            let newMessages = 0;
            messages.forEach((doc) => {
                message_items.push({...doc.data(), msg_id: doc.id, msg_sentAt: doc.get("msg_sentAt").toDate()} as MessageData);
                if (doc.get("msg_seen") === false)
                {
                    newMessages++;
                }
            })
            
            if(newMessages > 0)
            {
                dispatch({
                    type: Data_SetNewMessagesCount,
                    payload: newMessages
                });
            }
            dispatch({
                type: Data_SetAllMessagesData, 
                payload: message_items
            });
            dispatch(setMessagesLoading(false));
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
            dispatch(setMessagesLoading(false));
        }
    }
}

export const addNewMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            const currentTime = new Date(Date.now());
            const createdAt = firebase.firestore.Timestamp.fromDate(currentTime);
            const {msg_id, ...message} = messageData;
            await Firebase.firestore().collection("messages").add({...message, msg_sentAt: createdAt});
            dispatch({type: Data_AddMessageData, payload: messageData});
            dispatch({type: Data_IncrementNew});
            onComplete && onComplete();
            
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const deleteMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            dispatch({type: Data_DelMessageData, payload: messageData});
            await Firebase.firestore().collection("messages").doc(messageData.msg_id).delete();
            
            /**
             * Not strictly necessary but may need it later if I ever decide 
             * to move the delete button somewhere that does not require seeing
             * the message in order to delete it
             */
            if(!messageData.msg_seen)
            {
                dispatch({type: Data_DecrementNew});
            }
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const seenMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            await Firebase.firestore().collection("messages").doc(messageData.msg_id).update({msg_seen: true});
            dispatch({type: Data_SeenMessageData, payload: messageData});
            dispatch({type: Data_DecrementNew});
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const setMessagesLoading = (isLoading: boolean) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_isLoadingMessages, 
            payload: isLoading
        });
    }
}