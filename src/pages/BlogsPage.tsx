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

    return (
        <Router history={history}>
            <Container>
                <Switch>
                    <Route exact path="/blog">
                        <BlogsList isLoading={isLoading} blogs={blogs} />
                    </Route>

                    <Route path="/blog/:blogurl" children={
                        ({match}) => (
                        <BlogPage isLoading={isLoading} {...(blogs.find((blog) => {return blog.blog_url === match?.params.blogurl}) as BlogData)}/>
                        )} 
                    />
                        
                </Switch>
            </Container>
        </Router>
    );
}

export default BlogsPage;