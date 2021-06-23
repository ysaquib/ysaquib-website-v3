import React, { FC } from 'react'
import { useHistory } from 'react-router';
import { BlogData } from '../../store/types/dataTypes';
import LoadingSkeleton from '../elements/LoadingSkeleton';

interface BlogsListProps
{
    isLoading: boolean;
    blogs: BlogData[];
}

const BlogsList : FC<BlogsListProps> = ({isLoading, blogs}) =>
{
    const history = useHistory();
    

    if (isLoading)
    {
        return(
            <section id="blogslist" className="">
                <h1 className="admin_title blogs_title">Blog</h1>
                <div className="blogs_list_wrapper">
                    <ul className="blogs_list">
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section id="blogslist" className="">
            <h1 className="admin_title blogs_title">Blog</h1>
            <div className="blogs_list_wrapper">
                <ul className="blogs_list">
                    {blogs && (blogs
                    .filter((blog) => {return (!blog.blog_isHidden) ?? true})
                    .map((blog) =>{return (
                        <li className="blogs_list_item"
                            id={blog.blog_id} 
                            key={blog.blog_id}
                            onClick={() => history.push(`/blog/${blog.blog_url}`)}>
                            <h1 className="blogs_list_title">
                                {blog.blog_title}
                            </h1>
                            <p className="blogs_list_date">
                                {blog.blog_createdAt.toLocaleDateString(undefined , {year: 'numeric', month: 'long', day: 'numeric'})}
                            </p>
                        </li>
                    );}))}
                </ul>
            </div>
        </section>
    );
}

export default BlogsList