/**
 * File: BlogsList.tsx
 * Author: Yusuf Saquib
 * 
 * Creates and manages the blogs list.
 */

import { usePagination } from '@material-ui/lab/Pagination';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { deleteBlog, setBlogData } from '../../store/actions/dataActions';
import { BlogData, BlogVisibility } from '../../store/types/dataTypes';
import DialogBox from '../elements/DialogBox';
import { format } from "date-fns";
import { IconEye, IconEyeOff, IconGarbageDelete, IconLock } from '../elements/Icons';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Pagination from '../elements/Pagination';
import Section from '../elements/Section';

/**
 * Use query to get the current page number later.
 */
function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

/**
 * Functional Component for a blog list item for each blog.
 */

interface BlogListItemProps
{
    blog: BlogData;
}

const BlogListItem: FC<BlogListItemProps> = ({blog}) =>
{
    const dispatch = useDispatch();
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    const visibilityOptions : BlogVisibility[] = ["public", "unlisted", "private"];
    const [ blogVisibility, setBlogVisibility] = useState<BlogVisibility>(blog.blog_visibility);
    const [ dialog, setDialog ] = useState<JSX.Element>(<></>);
    
    /**
     * Get Icon based on visibility state
     */
    const getIcon = () =>
    {
        switch (blogVisibility)
        {
            case "public":
                return IconEye;
            case "private":
                return IconLock;
            case "unlisted":
                return IconEyeOff;
        }
    }


    /**
     * Toggle visibility state of blog.
     */
    const setVisibility = () =>
    {
        const nextStateIndex = (visibilityOptions.findIndex((value) => value === blogVisibility) + 1) % visibilityOptions.length;
        const nextState = visibilityOptions[nextStateIndex];
        setBlogVisibility(nextState);
    }

    /**
     * When blogVisibility is changed, set a timer for t time, after which
     * the blog visibility field will be changed in the database.
     * If blogVisibility is changed before the timer is finished, clear the 
     * previous timer and set a new timer.
     * 
     * This allows the user to cycle through the options and only dispatches
     * the data to the database after the blogVisibility has not changed for
     * exactly t seconds.
     */
    useEffect(() => {
        const sender = setTimeout(() => {
            if(blogVisibility !== blog.blog_visibility)
            {
                dispatch(setBlogData({...blog, blog_visibility: blogVisibility}));
            }
        }, 1250);
        return () => {
            clearTimeout(sender);
        }
    }, [blogVisibility, blog, dispatch])

    const featured_tag: JSX.Element = blog.blog_isFeatured ? (
        <p className="blogs_list_tag">
            Featured
        </p>) : (<></>);

    const wip_tag: JSX.Element = blog.blog_inProgress ? (
        <p className="blogs_list_tag">
            In Progress
        </p>) : (<></>);

    /**
     * Confirm deletion of blog with dialog.
     */
    function handleClickDelete (blogData: BlogData)
    {
        if(blogData)
        {
            setDialog(
                <DialogBox 
                    title="Confirm Delete Blog"
                    message={`Are you sure you want to delete '${blogData.blog_title}'?`}
                    messageError="Warning: this action cannot be undone."
                    optionClose="Keep Blog"
                    optionReject="Delete Blog"
                    onClose={() => setDialog(<></>)}
                    onReject={() => dispatch(deleteBlog(blogData, () => setDialog(<></>), (err) => console.error(err)))}/>
            );
        }
        else
        {
            setDialog(<></>);
        }
    }

    /**
     * Scroll to top of page on first load.
     */
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const history = useHistory();
    return (
        <li className="blogs_list_item_wrapper"
            id={blog.blog_id} 
            key={blog.blog_id}>
           
            {dialog}
            
            <div className={`blogs_list_item ${blog.blog_isFeatured ? "featured" : ""} ${blog.blog_inProgress ? "wip" : ""}`} onClick={() => history.push(`/blog/${blog.blog_url}`)}>
                <h1 className="blogs_list_title">
                    {blog.blog_title}
                </h1>
                <div className="blogs_list_tags">
                    {featured_tag}
                    {wip_tag}
                    <p className="blogs_list_tag">
                        {format(blog.blog_createdAt, "dd MMM yyyy")}
                    </p>
                </div>
            </div>
            {(authenticated && userRoles.includes("superadmin")) && (<div className="blogs_list_buttons">
                <div className="blogs_list_item_button hide" id="hide" onClick={setVisibility}><span className="svg_icon">{getIcon()}</span></div>
                
                <div className="blogs_list_item_button delete" id="delete" onClick={() => handleClickDelete(blog)}><span className="svg_icon">{IconGarbageDelete}</span></div>
            </div>)}
        </li>
    )
}

const BlogsList : FC = () =>
{
    const history = useHistory();
    const {allBlogs, isLoadingBlogs} = useSelector((state: RootState) => state.blogs);
    
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    
    const bpp_options: number[] = [5, 10, 20];
    
    const local_bpp: number = parseInt(localStorage.getItem("blogs_per_page") ?? "5");
    const bpp_index: number = bpp_options.findIndex((x) => x === local_bpp);
    const final_index: number = bpp_index === -1 ? 0 : bpp_index;
    
    const [ currentBPP, setCurrentBPP ] = useState<string>(`button_bpp_${final_index}`);
    const [ blogsPerPage, setBlogsPerPage] = useState<number>(bpp_options[final_index]);
    
    const [ blogs, setBlogs ] = useState<BlogData[]>(allBlogs);
    const [ pageBlogs, setPageBlogs ] = useState<BlogData[]>([]);

    const [ totalPages, setTotalPages] = useState<number>(Math.ceil(blogs.length / blogsPerPage));

    /**
     * get current page URL param. If its too big, make it the max. If its 0
     * or less, make it 1, and set that as the current page.
     */
    const currentPageArg: number = parseInt(useQuery().get("page") ?? "1");
    const currentPage = currentPageArg > totalPages ? totalPages : (currentPageArg < 1 ? 1 : currentPageArg);
    const [ page, setPage] = useState<number>(currentPage);

    /**
     * handles page change and updates page query in URL
     */
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) =>
    {
        history.push(`/blog?page=${value}`);
        window.scrollTo(0,0);

        setPage(value);
    }

    /**
     * handles changes in Blogs Per Page. 
     */
    const handleChangeBPP = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: number) => 
    {
        setCurrentBPP(event.currentTarget.id);
        setBlogsPerPage(option);
    }
    
    /**
     * Initialize pagination
     */
    const { items } = usePagination({
        count: totalPages,
        page: page,
        onChange: handlePageChange
    });
    
    /**
     * on update in the deps, recalculate the total pages, and set the new 
     * current page if the old page is out of range.
     * 
     * Then compute the current page's blogs based on the current page and 
     * the number of blogs per page.
     * 
     * Then save the selected blogs per page in cache.
     */
    useEffect(() => {
        const newTotal = Math.ceil(blogs.length / blogsPerPage);
        const newPage: number = currentPageArg > newTotal ? newTotal : (currentPageArg < 1 ? 1 : currentPageArg);
        
        setTotalPages(newTotal);
        setPage(newPage);
        setPageBlogs(blogs.slice(0 + blogsPerPage * (newPage - 1), blogsPerPage + blogsPerPage * (newPage - 1)));

        if (newPage !== page || currentPageArg === 0)
        {
            history.push(`/blog?page=${newPage}`)
        }

        localStorage.setItem("blogs_per_page", blogsPerPage.toString());
        
    }, [blogs, blogsPerPage, currentPageArg, page, history]);
    
    /**
     * Simple update selected blogs per page option.
     */
    useEffect(() => {
        document.getElementById(currentBPP)?.classList.add("selected");
        return () => {
            document.getElementById(currentBPP)?.classList.remove("selected");
        }
    }, [currentBPP]);
    
    /**
     * Filter out any hidden blogs unless the user is a superadmin and is logged in.
     */
    useEffect(() => {
        const blogsList = allBlogs
            .filter((blog) => {return (blog.blog_visibility === "public") || (authenticated && userRoles.includes("superadmin"))});
        setBlogs(blogsList);
    }, [allBlogs, setBlogs, authenticated, userRoles]);

    /**
     * If use is superadmin and logged in, show create new blog button
     */
    const create_new_blog: JSX.Element = (authenticated && userRoles.includes("superadmin")) 
    ? (<li className="blogs_list_item_wrapper" id="create_new_blog" key="create_new_blog" onClick={() => history.push("/blog/create_new")}><div className="blogs_list_item create_new">Create New Blog</div></li>)
    : (<></>);

    if (isLoadingBlogs)
    {
        return(
            <Section id="blogslist" title="All Blogs" className="">
                <div className="blogs_list_wrapper">
                    <ul className="blogs_list">
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                    </ul>
                </div>
            </Section>
        );
    }
    else if (blogs && blogs.length === 0)
    {
        const errorDatabase: string = blogs.length === 0 ? "Error retrieving blog data." : ""
        const errorInvalidPage: string = blogsPerPage * (page - 1) > blogs.length ? "Invalid page number." : "";
        return (
            <Section id="blogslist" title="All Blogs" className="">
                <div className="blogs_list_wrapper">
                    <ul className="blogs_list">
                        {create_new_blog}
                        <li className="blogs_list_item_wrapper">
                            <div className={`blogs_list_item error`}>
                                No blogs to show. {errorDatabase !== "" ? errorDatabase : errorInvalidPage}
                            </div>
                        </li>

                    </ul>
                </div>
            </Section>

        );
    }

    return (
        <Section id="blogslist" title="All Blogs" className="">
            <div className="blogs_list_wrapper">

                <div className="blogs_list_options">
                    <div className="option">
                        Blogs Per Page:
                        <ul className="blogs_per_page">
                            {bpp_options.map((option, index) => 
                                <li key={option}>
                                    <button id={`button_bpp_${index}`}
                                            className={index === final_index ? "selected" : ""}
                                            value={option}
                                            onClick={(e) => handleChangeBPP(e, option)}>
                                        {option}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <ul className="blogs_list">
                    {create_new_blog}
                    {pageBlogs && (pageBlogs
                    .map((blog) =>
                        <BlogListItem blog={blog} key={blog.blog_id} />    
                    ))}
                </ul>

                <Pagination items={items} />
            </div>
        </Section>
    );
}

export default BlogsList