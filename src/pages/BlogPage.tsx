/**
 * File: BlogPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, HTMLAttributes, ImgHTMLAttributes, useState } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import Editor from '../components/elements/MarkdownEditor';
import Markdown from 'markdown-to-jsx';
import Button from '../components/elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IconEditBox } from '../components/elements/Icons';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { setBlogData } from '../store/actions/dataActions';


interface BlogPageProps extends BlogData
{
    isNewBlog?: boolean;
    allBlogs: BlogData[];
}

const ImageEnv: FC<ImgHTMLAttributes<HTMLImageElement>> = ({...props}) => (
    <span className="blog_image">
        <img {...props} src={props.src} alt={props.alt} title={props.title}  />
    </span>
);

interface CodeEnvProps
{
    children: React.ReactElement;
    className?: string;
    theme?: any;
}
const CodeEnv: FC<CodeEnvProps> = ({className, children, theme}) =>
{
    if (className)
    {
        const language = className.replace("lang-", "");
        return (
            <SyntaxHighlighter language={language} style={theme}>
                {children}
            </SyntaxHighlighter>
        );
    }
    
    return (
        <code>{children}</code>
    );
}


const BlogPage : FC<BlogPageProps> = ({isNewBlog=false, allBlogs, ...blogData}) =>
{
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    
    /** User Auth and Role Check to ensure that only superuser can edit */
    const canUserEdit: boolean = authenticated && userRoles.includes("superadmin");
    const dispatch = useDispatch();

    const [blogTitle, setBlogTitle] = useState<string>(blogData.blog_title);
    const [blogContent, setBlogContent] = useState<string>(blogData.blog_content);
    const [editingBlog, setEditingBlog] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const codeTheme = document.body.classList.contains('theme-dark') ? atomOneDark : atomOneLight;

    const blogTitleRef = React.useRef<HTMLInputElement>(null);

    const handleClickEditBlog = () =>
    {
        console.log(blogContent);
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

    const handlePreview = () =>
    {
        setEditingBlog(false);
    }

    const handleSave = () =>
    {
        setLoading(true);

        dispatch(setBlogData({...blogData, blog_title: blogTitle, blog_content: blogContent}, allBlogs, true));

        setEditingBlog(false);
        setLoading(false);
    }

    const handleCancel = () => 
    {
        setBlogTitle(blogData.blog_title);
        setBlogContent(blogData.blog_content);
        setEditingBlog(false);
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
                <Editor name="blog_editor" content={blogContent} setContent={setBlogContent}/>
                <div id="editor_buttons">
                    <Button text="Cancel" className="reject" onClick={handleCancel} disabled={isLoading}/>
                    <div className="button_group">
                        <Button text="Preview" className="neutral" onClick={handlePreview} disabled={isLoading}/>
                        <Button text={isLoading ? "Saving" : "Save"} className="confirm" onClick={handleSave} disabled={isLoading}/>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section id="blog">

            {canUserEdit && editBlogButton}
            
            <div id="blog_header">
                <h1 id="blog_title">{blogTitle}</h1>
                <div id="blog_info">
                    <p className="info_item">Written by Yusuf Saquib</p>
                    <p className="info_item">
                        Created on {blogData.blog_createdAt.toLocaleDateString(undefined , {year: 'numeric', month: 'long', day: 'numeric'})} 
                    {blogData.blog_updatedAt && <span className="emph"> &#8212; Updated on {blogData.blog_updatedAt.toLocaleDateString(undefined , {year: 'numeric', month: 'long', day: 'numeric'})}</span>}</p>
                </div>
            </div>


            <div id="blog_content">
            <Markdown
                      options={{
                            overrides: 
                            {
                                img: ImageEnv,
                                code:{component: CodeEnv, props: {theme: codeTheme}}
                            }
                        }}
                      >
                {blogContent}
            </Markdown>

            </div>
        </section>
    );
}

export default BlogPage;