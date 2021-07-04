/**
 * File: BlogsPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';

import BlogsList from '../components/modules/BlogsList';
import { Route, Router, useHistory, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { BlogData } from '../store/types/dataTypes';
import { getBlogData } from '../store/actions/dataActions';
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


    useEffect(() => 
    {
        dispatch(getBlogData(() => setLoading(false), () => {console.log("Error getting Blog data.")}));
        return () => {}
    }, [dispatch]);
    
    useEffect(() => 
    {
        setBlogs(allBlogs);
        // return () => 
        // {
        //     setBlogs([]);
        // }
    }, [allBlogs]);

    const new_blog: BlogData = 
    {
        blog_id: "",
        blog_url: "", 
        blog_title: "", 
        blog_content: "", 
        blog_isHidden: false,
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