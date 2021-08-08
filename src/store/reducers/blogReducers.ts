import { BlogAction, BlogState, Data_AddBlog, Data_DelBlog, Data_isLoadingBlogs, Data_SetAllBlogsData, Data_SetBlogData } from "../types/blogTypes";

const initialBlogsState: BlogState =
{
    allBlogs: [],
    isLoadingBlogs: true,
}
export const blogReducer = (state = initialBlogsState, action: BlogAction) : BlogState =>
{
    switch (action.type)
    {
        case Data_SetAllBlogsData:
            return {...state, allBlogs: action.payload};

        case Data_SetBlogData:
            const allBlogs = state.allBlogs;
            const indexToSet = allBlogs.findIndex((blogItem) => {return blogItem.blog_id === action.payload.blog_id});
            allBlogs[indexToSet] = action.payload;
            return {...state, allBlogs};

        case Data_DelBlog:
            const newAllBlogs = state.allBlogs.filter((blog) => {return blog.blog_id !== action.payload.blog_id});
            return {...state, allBlogs: newAllBlogs};

        case Data_AddBlog:
            const allBlogsAdd = state.allBlogs;
            allBlogsAdd.unshift(action.payload);
            return {...state, allBlogs: allBlogsAdd};

        case Data_isLoadingBlogs:
            return {...state, isLoadingBlogs: action.payload};

        default:
            return state;
    }
}