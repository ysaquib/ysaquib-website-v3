/**
 * File: BlogPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useState } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';
import Editor from '../components/elements/MarkdownEditor';
import TextField from '../components/elements/TextField';
import { useForm } from 'react-hook-form';
import Markdown from 'markdown-to-jsx';

interface BlogPageProps extends BlogData
{
    isLoading: boolean;
}

const BlogPage : FC<BlogPageProps> = ({isLoading, ...blogData}) =>
{

    const [blogTitle, setBlogTitle] = useState<string>("");
    const [blogContent, setBlogContent] = useState<string>("");
    console.log(blogContent);

    const ImageEnv = ({...props}) => (<div className="blog_image"><img {...props} /></div>)

    const {register, handleSubmit, formState: {errors}} = useForm<BlogPageProps>({mode:"all"});
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
        <section id="edit_blog">
            <h1 className="blog_title">{blogData.blog_title}</h1>
            <TextField label="Blog Title" 
                           name="blog_title"
                           type="text"
                           classNameInner="blog_title_field"
                           register={register} 
                           registration={{required: true}} />

            <Editor name="blog_editor" setContent={setBlogContent}/>
            <Markdown id="blog"
                      options={{overrides: {img: ImageEnv}}}
                      >
                {blogContent}
            </Markdown>
        </section>
    );
}

export default BlogPage;