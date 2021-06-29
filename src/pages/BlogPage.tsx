/**
 * File: BlogPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, ImgHTMLAttributes, useEffect, useState } from 'react';

import { BlogData } from '../store/types/dataTypes';
import PageNotFound from '../components/layout/PageNotFound';
import Editor from '../components/elements/MarkdownEditor';
import Markdown from 'markdown-to-jsx';
import Button from '../components/elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { addNewBlog, setBlogData } from '../store/actions/dataActions';
import { Redirect, useHistory } from 'react-router-dom';



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
    
interface BlogPageProps extends BlogData
{
    allBlogs: BlogData[];
    isNewBlog?: boolean;
    isEditing?: boolean;
}

const BlogPage : FC<BlogPageProps> = ({isNewBlog=false, isEditing=false, allBlogs, ...blogData}) =>
{
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    
    /** User Auth and Role Check to ensure that only superuser can edit */
    const canUserEdit: boolean = authenticated && userRoles.includes("superadmin");
    const dispatch = useDispatch();
    const history = useHistory();

    const [blogTitle, setBlogTitle] = useState<string>(blogData.blog_title);
    const [blogTags, setBlogTags] = useState<string>(blogData.blog_tags ?? "");
    const [blogURL, setBlogURL] = useState<string>(blogData.blog_url);
    const [blogContent, setBlogContent] = useState<string>(blogData.blog_content);

    const [editingBlog, setEditingBlog] = useState<boolean>(isEditing);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(isNewBlog);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const codeTheme = document.body.classList.contains('theme-dark') ? atomOneDark : atomOneLight;

    const blogTitleRef = React.useRef<HTMLInputElement>(null);
    const blogTagsRef = React.useRef<HTMLInputElement>(null);
    const blogURLRef = React.useRef<HTMLInputElement>(null);

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
            Edit Blog
        </div>);
    

    const handleTitleChange = () =>
    {
        const title: string = blogTitleRef.current?.value ?? "";
        const url: string = title.toLowerCase().replaceAll(/[\W_]+/g, "-");
        setBlogTitle(title);
        setBlogURL(url);
    }

    const handleTagsChange = () =>
    {
        const tags: string = blogTagsRef.current?.value ?? ""; 
        setBlogTags(tags);
    }

    const handleURLChange = () =>
    {
        const url_initial: string = blogURLRef.current?.value ?? "";
        const url: string = url_initial.toLowerCase().replaceAll(/[\W_]+/g, "-");
        setBlogURL(url);
    }

    const handlePreview = () =>
    {
        setEditingBlog(false);
    }

    const handleSave = () =>
    {
        setLoading(true);

        const blogPayload = {
            ...blogData, 
            blog_title: blogTitle, 
            blog_content: blogContent, 
            blog_tags: blogTags, 
            blog_url: blogURL 
        }

        if(isNew)
        {
            dispatch(addNewBlog(blogPayload, () => {setEditingBlog(false); history.push(`/blog/${blogURL}`)}));
        }
        else
        {
            dispatch(setBlogData(blogPayload, true));
        }

        setIsNew(false);
        setLoading(false);
    }

    const handleCancel = () => 
    {
        setBlogTitle(blogData.blog_title);
        setBlogContent(blogData.blog_content);
        setEditingBlog(false);

        if (isNew)
            history.push("/blog");
    }

    useEffect(() => 
    {
        setButtonDisabled(isLoading || blogTitle === "" || blogContent === "" || blogURL === "");
        return () => 
        {
            setButtonDisabled(false);
        }
    }, [isLoading, blogTitle, blogContent, blogURL]);

    if (blogData.blog_id == null)
    {
        return (
            <PageNotFound />
        )
    }
    else if (blogData.blog_isHidden && !canUserEdit)
    {
        return (
            <Redirect to="/blog" />
        )
    }
    else if (editingBlog)
    {
        return (
            <section id="edit_blog">
                <input
                    ref={blogURLRef}
                    placeholder="Blog URL"
                    className="blog_field"
                    value={blogURL}
                    onChange={handleURLChange}
                    type="text" />
                
                <input
                    ref={blogTitleRef}
                    placeholder="Blog Title"
                    className="blog_title_field"
                    value={blogTitle}
                    onChange={handleTitleChange}
                    type="text" />


                <Editor name="blog_editor" content={blogContent} setContent={setBlogContent}/>
                

                <input
                    ref={blogTagsRef}
                    placeholder="Blog Tags"
                    className="blog_field"
                    value={blogTags}
                    onChange={handleTagsChange}
                    type="text" />
                

                <div id="editor_buttons">
                    <Button id="cancel_blog" text="Cancel" className="reject" onClick={handleCancel} disabled={isLoading}/>
                    <div className="button_group">
                        <Button id="preview_blog" text="Preview" className="neutral" onClick={handlePreview} disabled={isButtonDisabled}/>
                        <Button id="save_blog" text="Save" className="confirm" onClick={() => {setButtonDisabled(true); handleSave()}} disabled={isButtonDisabled}/>
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
                            disableParsingRawHTML: true,
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