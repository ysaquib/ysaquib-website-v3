/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';

interface BlogPageProps extends BlogData
{
    isLoading: boolean;
}

const BlogPage : FC<BlogPageProps> = ({isLoading, ...blogData}) =>
{


    if (isLoading)
    {
        return (
            <section id="blog_loader">
                <LoadingSkeleton type="rectangle" className="title_loader"/>
                <LoadingSkeleton type="rectangle" className="content_loader"/>
            </section>
        )
    }
    else if (blogData.blog_id == null)
    {
        return (
            <PageNotFound />
        )
    }
    return (
        <section id="blog">
            <h1 className="blog_title">{blogData.blog_title}</h1>
        </section>
    );
}

export default BlogPage;