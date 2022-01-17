/**
 * 
 */

import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { BlogAction, BlogData, Data_AddBlog, Data_DelBlog, Data_isLoadingBlogs, Data_SetAllBlogsData, Data_SetBlogData } from '../types/blogTypes';

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