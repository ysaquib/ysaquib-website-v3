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
import { format, parse } from "date-fns";

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { addNewBlog, setBlogData } from '../store/actions/dataActions';
import { Redirect, useHistory } from 'react-router-dom';
import TextField from '../components/elements/TextField';
import CheckBox from '../components/elements/Checkbox';
import { ThemeContext } from '../contexts/ThemeContext';
import Head from '../components/layout/Head';
import { IconChevronLeft } from '../components/elements/Icons';

/**
 * Override component for markdown image
 */
const ImageEnv: FC<ImgHTMLAttributes<HTMLImageElement>> = ({...props}) => (
    <span className="md_image">
        <img {...props} src={props.src} alt={props.alt} title={props.title}  />
    </span>
);

/**
 * Override component for markdown codeblock
 */
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
    const [blogCreatedAt, setBlogCreatedAt] = useState<string>(format(blogData.blog_createdAt, "yyyy-MM-dd"));
    const [blogUpdatedAt, setBlogUpdatedAt] = useState<string>(format(blogData.blog_updatedAt ?? new Date(Date.now()), "yyyy-MM-dd"));
    const [blogInProgress, setBlogInProgress] = useState<boolean>(blogData.blog_inProgress ?? false);
    const [blogIsFeatured, setBlogIsFeatured] = useState<boolean>(blogData.blog_isFeatured ?? false);

    const [editingBlog, setEditingBlog] = useState<boolean>(isEditing);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(isNewBlog);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const {theme} = React.useContext(ThemeContext);

    const codeTheme = theme === "theme-dark" ? atomOneDark : atomOneLight;

    /**
     * Could be done with a useEffect but is not necessary
     */
    const handleClickEditBlog = () =>
    {
        console.log(blogContent);
        window.scrollTo(0,0);
        if (canUserEdit)
            setEditingBlog(true);
        else 
            setEditingBlog(false);
    }

    const editBlogButton: JSX.Element = (
        <div id="blog_edit_button" onClick={handleClickEditBlog}>
            Edit Blog
        </div>);
    
    /**
     * onChange handlers for controlled inputs
     */
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const title: string = event.target.value ?? "";
        const url: string = title.toLowerCase().replaceAll(/[\W_]+/g, "-");
        console.log(blogURL);
        setBlogTitle(title);
        setBlogURL(url);
    }

    const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const url_initial: string = event.target.value ?? "";
        const url: string = url_initial.toLowerCase().replaceAll(/[\W_]+/g, "-");
        setBlogURL(url);
    }

    /**
     * Simply previews the current edit.
     */
    const handlePreview = () =>
    {
        setEditingBlog(false);
    }

    /**
     * Handles saving the current edit.
     * If its a new blog, then waits for the corresponding url to be created,
     * *before* redirecting the user.
     */
    const handleSave = () =>
    {
        if (blogCreatedAt.match(/yyyy|MM|dd/g) !== null || blogUpdatedAt.match(/yyyy|MM|dd/g) !== null)
        {
            console.log("BAD >:(");
            return;
        }
        setLoading(true);
        const blogPayload = {
            ...blogData, 
            blog_title: blogTitle, 
            blog_content: blogContent, 
            blog_tags: blogTags, 
            blog_url: blogURL,
            blog_createdAt: parse(blogCreatedAt, "yyyy-MM-dd", new Date()),
            blog_updatedAt: parse(blogUpdatedAt, "yyyy-MM-dd", new Date()),
            blog_isFeatured: blogIsFeatured,
            blog_inProgress: blogInProgress
        }

        if(isNew)
        {
            dispatch(addNewBlog(blogPayload, () => {setEditingBlog(false); history.push(`/blog/${blogURL}`)}));
        }
        else
        {
            dispatch(setBlogData(blogPayload, () => {setEditingBlog(false); history.push(`/blog/${blogURL}`)}));
        }

        setIsNew(false);
        setLoading(false);
    }

    /**
     * Handles cancelling the current edit. Returns user to blog list page.
     */
    const handleCancel = () => 
    {
        setBlogTitle(blogData.blog_title);
        setBlogContent(blogData.blog_content);
        setEditingBlog(false);

        if (isNew)
            history.push("/blog");
    }

    /**
     * Handles going back to all blogs.
     * I want to make this remember the page that the user was on but I'm not 
     * sure how to do so. So for now, I will just set it to go back to the 
     * first page.
     */
    const handleBack = () =>
    {
        history.push("/blog");
    }

    /**
     * Disable the save and preview button until something is changed.
     */
    useEffect(() => 
    {
        setButtonDisabled(isLoading || blogTitle === "" || blogContent === "" || blogURL === "");
        return () => 
        {
            setButtonDisabled(false);
        }
    }, [isLoading, blogTitle, blogContent, blogURL, blogCreatedAt, blogUpdatedAt, blogIsFeatured, blogInProgress]);


    /**
     * On first render:
     *      - Immediately scroll to top of page.
     */
    useEffect(() =>
    {
        window.scrollTo(0,0);
    }, []);

    if (blogData.blog_id == null)
    {
        return (
            <PageNotFound />
        );
    }
    else if (blogData.blog_isHidden && !canUserEdit)
    {
        return (
            <Redirect to="/blog" />
        );
    }
    else if (editingBlog)
    {
        return (
            <section id="edit_blog">

                <Head title={`${blogData.blog_title} — Editing Blog`} />


                <TextField
                    name="blog_tags"
                    label="Blog Tags"
                    placeholder="Blog Tags"
                    className="blog_field"
                    defaultValue={blogTags}
                    onChangeEvent={(e) => setBlogTags(e.target.value)}
                    type="text" 
                    show_label/>

                <div className="blog_input_group">

                    <TextField
                        name="blog_createdAt"
                        label="Creation Date"
                        placeholder="Creation Date"
                        className="blog_field"
                        value={blogCreatedAt}
                        onChangeEvent={(e) => setBlogCreatedAt(e.target.value)}
                        type="date" 
                        show_label/>

                    <TextField
                        name="blog_updatedAt"
                        label="Updated Date"
                        placeholder="Blog Updated At"
                        className="blog_field"
                        value={blogUpdatedAt}
                        onChangeEvent={(e) => setBlogUpdatedAt(e.target.value)}
                        type="date" 
                        show_label
                        disabled={isNewBlog}/>

                    <CheckBox label="In Progress?"
                            isChecked={blogInProgress}
                            name="blog_inprogress"
                            className="half"
                            onChange={() => setBlogInProgress(!blogInProgress)}/>
                    
                    <CheckBox label="Is Featured?"
                            isChecked={blogIsFeatured}
                            name="blog_isfeatured"
                            className="half"
                            onChange={() => setBlogIsFeatured(!blogIsFeatured)}/>
                </div>

                <TextField
                    name="blog_url"
                    label="Blog URL"
                    placeholder="Blog URL"
                    className="blog_field"
                    value={blogURL}
                    onChangeEvent={handleURLChange}
                    type="text" 
                    show_label/>
                    
                <TextField
                    name="blog_title"
                    label="Blog Title"
                    placeholder="Blog Title"
                    className="blog_title_field"
                    defaultValue={blogTitle}
                    onChangeEvent={handleTitleChange}
                    type="text" 
                    show_label/>

                <Editor name="blog_editor" content={blogContent} setContent={setBlogContent}/>
                
                

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
        <section id="blog" className={`${blogIsFeatured === true ? "featured" : ""} ${blogInProgress === true ? "wip" : ""}`}>

            <Head title={`${blogTitle} — Blog`} />

            <div id="blog_button_back" onClick={handleBack}><span className="svg_icon">{IconChevronLeft}</span> Back to All Blogs</div>
            {canUserEdit && editBlogButton}
            
            <div id="blog_header" >
                <h1 id="blog_title">{blogTitle}</h1>
                <div id="blog_info">
                    <p className="info_item">
                        {format(blogData.blog_createdAt, "dd MMMM yyyy")} 
                    </p>
                    
                    {blogTags !== "" && <ul id="blog_tag_list">
                        {blogTags !== "" && 
                            blogTags.split(",").map((tag) => 
                                <li className="blog_tag">{tag.trim()}</li>
                            )
                        }
                    </ul> }
                </div>
            </div>


            <div id="blog_content" className="markdown_content">
            
            <Markdown
                      options={{
                            // disableParsingRawHTML: true,
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