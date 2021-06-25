/**
 * File: BlogsPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import BlogsList from '../components/sections/BlogsList';
import { Route, Router, useHistory, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { BlogData } from '../store/types/dataTypes';
import { getBlogData } from '../store/actions/dataActions';
import BlogPage from './BlogPage';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';
 
const BlogsPage : FC = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const BlogData = useSelector((state: RootState) => state.blogs);
    
    const [blogs, setBlogs] = useState<BlogData[]>(BlogData);
    const [isLoading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        dispatch(getBlogData(() => setLoading(false), () => {console.log("Error getting Blog data.")}));
        return () => {}
    }, [dispatch]);
    
    useEffect(() => {
        setBlogs(BlogData);
        return () => {
            setBlogs([]);
        }
    }, [BlogData]);

    const Loader: JSX.Element = (
        <section id="blog_loader">
                <LoadingSkeleton type="rectangle" className="title_loader"/>
                <LoadingSkeleton type="rectangle" className="content_loader"/>
        </section>);

    return (
        <Router history={history}>
            <Container>
                <Switch>
                    <Route exact path="/blog">
                        <BlogsList isLoadingInitial={isLoading} allBlogs={blogs} />
                    </Route>

                    <Route path="/blog/:blogurl" children={
                        ({match}) => {
                            if (isLoading)
                            {
                                return Loader;
                            }
                            else
                            {
                                return (
                                    <BlogPage {...(blogs.find((blog) => {return blog.blog_url === match?.params.blogurl}) as BlogData)} allBlogs={blogs}/>
                                );
                            }
                        }} 
                    />
                        
                </Switch>
            </Container>
        </Router>
    );
}

export default BlogsPage;