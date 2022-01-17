export const Data_SetBlogData = "Data_SetBlogData";
export const Data_SetAllBlogsData = "Data_SetAllBlogData";
export const Data_AddBlog = "Data_AddBlog";
export const Data_DelBlog = "Data_DelBlog";
export const Data_isLoadingBlogs = "Data_isLoadingBlogs";

export type BlogVisibility = "public" | "unlisted" | "private";

export interface BlogData
{
    blog_id: string;
    blog_url: string;
    blog_title: string;
    blog_content: string;
    blog_createdAt: Date;
    blog_updatedAt?: Date;
    blog_tags?: string;
    blog_visibility: BlogVisibility;
    blog_inProgress?: boolean;
    blog_isFeatured?: boolean;
}

interface SetAllBlogsAction
{
    type: typeof Data_SetAllBlogsData;
    payload: BlogData[];
}

interface SetBlogDataAction
{
    type: typeof Data_SetBlogData;
    payload: BlogData;
}

interface AddBlogAction
{
    type: typeof Data_AddBlog;
    payload: BlogData;
}

interface DelBlogAction
{
    type: typeof Data_DelBlog;
    payload: BlogData;
}

interface SetLoadingBlogsAction
{
    type: typeof Data_isLoadingBlogs;
    payload: boolean;
}

export interface BlogState
{
    allBlogs: BlogData[];
    isLoadingBlogs: boolean;
}

export type BlogAction = SetBlogDataAction | SetAllBlogsAction | AddBlogAction | DelBlogAction | SetLoadingBlogsAction;
