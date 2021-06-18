/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';

import { Editor } from '@tinymce/tinymce-react'; 

interface BlogPageProps extends BlogData
{
    isLoading: boolean;
}
const BlogPage : FC<BlogPageProps> = ({isLoading, ...blogData}) =>
{
    const handleEditorChange = (e : any) => 
    {
        console.log('Content was updated:', e.target.getContent());
    }
    
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
    // else if (true)
    // {
        
    // }

    return (
        <section id="blog">
            <h1 className="blog_title">{blogData.blog_title}</h1>
            <Editor
            initialValue="<p>Initial content</p>"
            apiKey={process.env.REACT_APP_TINYMCE_KEY}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help'
            }}
            onChange={handleEditorChange} />
        </section>
    );
}

export default BlogPage;