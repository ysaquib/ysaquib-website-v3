/**
 * File: BlogPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useReducer, useState } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import LoadingSkeleton from '../components/elements/LoadingSkeleton';
import Editor from '../components/elements/MarkdownEditor';
import { useForm } from 'react-hook-form';
import Markdown from 'markdown-to-jsx';
import Button from '../components/elements/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IconEditBox } from '../components/elements/Icons';

interface BlogPageProps extends BlogData
{
    isNewBlog?: boolean;
    allBlogs?: BlogData[];
}

const BlogPage : FC<BlogPageProps> = ({isNewBlog=false, ...blogData}) =>
{
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    
    /** User Auth and Role Check to ensure that only superuser can edit */
    const canUserEdit: boolean = authenticated && userRoles.includes("superadmin");


    const [blogTitle, setBlogTitle] = useState<string>(blogData.blog_title);
    const [blogContent, setBlogContent] = useState<string>(blogData.blog_content);
    const [editingBlog, setEditingBlog] = useState<boolean>(false);

    const ImageEnv = ({...props}) => (<div className="blog_image"><img {...props} /></div>)

    const blogTitleRef = React.useRef<HTMLInputElement>(null);

    const handleClickEditBlog = () =>
    {
        if (canUserEdit)
            setEditingBlog(true);
        else 
            setEditingBlog(false);
    }

    const editBlogButton: JSX.Element = (
        <div id="blog_edit_button" onClick={handleClickEditBlog}>
            <span className="svg_icon">{IconEditBox}</span>
            Edit Blog
        </div>);
    

    const handleTitleChange = () =>
    {
        const title: string = blogTitleRef.current?.value ?? ""; 
        setBlogTitle(title);
    }


    if (blogData.blog_id == null)
    {
        return (
            <PageNotFound />
        )
    }
    else if (editingBlog)
    {
        return (
            <section id="edit_blog">
                <input
                    ref={blogTitleRef}
                    placeholder="Blog Title"
                    className="blog_title_field"
                    value={blogTitle}
                    onChange={handleTitleChange}
                    type="text" />
                <Editor name="blog_editor" setContent={setBlogContent}/>
                <div id="editor_buttons">
                    <Button text="Cancel" className="reject"/>
                    <div className="button_group">
                        <Button text="Preview" className="neutral"/>
                        <Button text="Save" className="confirm"/>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section id="blog">
            {canUserEdit && editBlogButton}
            <div id="blog_header">
                <h1 id="blog_title">{blogData.blog_title}</h1>
                <div id="blog_info">
                    <p className="info_item">Written by Yusuf Saquib</p>
                    <p className="info_item">Created on May 18, 2021 <span className="emph">&#8212; Updated on May 21, 2021</span></p>
                </div>
            </div>

            <Markdown id="blog_content"
                      options={{overrides: {img: ImageEnv}}}
                      >
                {blogContent}
            </Markdown>
        </section>
    );
}

export default BlogPage;