/**
 * File: BlogsPage.tsx
 * Author: Yusuf Saquib
 * 
 * Manages all the blog logic based on the URL.
 * :: If the URL is "/blog" followed by an optional page query, show BlogsList.
 * :: If there is a blog selected, namely "/blog/<BLOG URL>" then show the Blog
 * :: Otherwise, show the Error page.
 */

import React, { FC, useEffect, useState } from 'react';

import BlogsList from '../components/modules/BlogsList';
import { Route, Router, useHistory, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { BlogData } from '../store/types/blogTypes';
import { getBlogData } from '../store/actions/blogActions';
import BlogPage from './BlogPage';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';
import PrivateRoute from '../components/auth/PrivateRoute';
import PublicRoute from '../components/auth/PublicRoute';
import PageNotFound from '../components/layout/PageNotFound';
import Head from '../components/layout/Head';
 
const BlogsPage : FC = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const {allBlogs} = useSelector((state: RootState) => state.blogs);

    const [blogs, setBlogs] = useState<BlogData[]>(allBlogs);
    const [isLoading, setLoading] = useState<boolean>(true);

    /**
     * Get all the blogs from the database and set that as allBlogs. This is 
     * used solely to pass to children components.
     */
    useEffect(() => 
    {
        dispatch(getBlogData(() => setLoading(false), () => {console.error("Error getting Blog data.")}));
        return () => {}
    }, [dispatch]);
    
    useEffect(() => 
    {
        setBlogs(allBlogs);
    }, [allBlogs]);

    const new_blog: BlogData = 
    {
        blog_id: "",
        blog_url: "", 
        blog_title: "", 
        blog_content: "", 
        blog_visibility: "public",
        blog_inProgress: false,
        blog_createdAt: new Date(Date.now()),
    }

    const Loader: JSX.Element = (
        <section id="blog_loader">
                <LoadingSkeleton type="rectangle" className="title_loader"/>
                <LoadingSkeleton type="rectangle" className="content_loader"/>
        </section>);

    return (
        <Router history={history}>
            <Head title="All Blogs" />

            <Switch>
                <PublicRoute exact path="/blog">
                    <BlogsList />
                </PublicRoute>

                <PrivateRoute exact path="/blog/create_new" authRoles={["superadmin"]}> 
                    <BlogPage {...new_blog} allBlogs={blogs} isNewBlog={true} isEditing={true}/>
                </PrivateRoute>

                <Route path="/blog/:blogurl" children={
                    ({match}) => {
                        if (isLoading)
                        {
                            return Loader;
                        }
                        else
                        {
                            const requestedBlog = blogs.find((blog) => {return blog.blog_url === match?.params.blogurl}) as BlogData
                            
                            if (requestedBlog === undefined)
                            {
                                return (<PageNotFound />);
                            }
                            return (
                                <BlogPage {...requestedBlog} allBlogs={blogs}/>
                            );
                        }
                    }} 
                />
                    
            </Switch>
        </Router>
    );
}

export default BlogsPage;