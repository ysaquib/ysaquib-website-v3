import { usePagination } from '@material-ui/lab/Pagination';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { deleteBlog, setBlogData } from '../../store/actions/dataActions';
import { BlogData } from '../../store/types/dataTypes';
import DialogBox from '../elements/DialogBox';
import { format } from "date-fns";
import { IconEye, IconEyeOff, IconGarbageDelete } from '../elements/Icons';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Pagination from '../elements/Pagination';
import Section from '../elements/Section';

function useQuery() 
{
    return new URLSearchParams(useLocation().search);
}

interface BlogListItemProps
{
    blog: BlogData;
}

const BlogListItem: FC<BlogListItemProps> = ({blog}) =>
{
    const dispatch = useDispatch();
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    const [isBlogHidden, setBlogHidden] = useState(blog.blog_isHidden);
    const [ dialog, setDialog ] = useState<JSX.Element>(<></>);
    
    const setHidden = () =>
    {
        setBlogHidden(!isBlogHidden);
        dispatch(setBlogData({...blog, blog_isHidden: !isBlogHidden}));
    }

    const featured_tag: JSX.Element = blog.blog_isFeatured ? (
        <p className="blogs_list_tag">
            Featured
        </p>) : (<></>);

    const wip_tag: JSX.Element = blog.blog_inProgress ? (
        <p className="blogs_list_tag">
            In Progress
        </p>) : (<></>);

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
                    onReject={() => dispatch(deleteBlog(blogData, () => setDialog(<></>), (err) => console.log(err)))}/>
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
                <div className="blogs_list_item_button hide" id="hide" onClick={setHidden}><span className="svg_icon">{isBlogHidden ? IconEyeOff : IconEye}</span></div>
                
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
    
    const bpp_options: number[] = [5, 10, 25];
    
    const local_bpp: number = parseInt(localStorage.getItem("blogs_per_page") ?? "5");
    const bpp_index: number = bpp_options.findIndex((x) => x === local_bpp);
    const final_index: number = bpp_index === -1 ? 0 : bpp_index;
    
    const [ currentBPP, setCurrentBPP ] = useState<string>(`button_bpp_${final_index}`);
    const [ blogsPerPage, setBlogsPerPage] = useState<number>(bpp_options[final_index]);
    
    const [ blogs, setBlogs ] = useState<BlogData[]>(allBlogs);

    const [ totalPages, setTotalPages] = useState<number>(Math.ceil(blogs.length / blogsPerPage));

    const currentPageArg: number = parseInt(useQuery().get("page") ?? "1");
    const currentPage = currentPageArg % totalPages === 0 ? totalPages : currentPageArg % totalPages;
    const [ page, setPage] = useState<number>(currentPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) =>
    {
        history.push(`/blog?page=${value}`);
        window.scrollTo(0,0);
        // const newPage = value % totalPages === 0 ? totalPages : value % totalPages;

        setPage(value);
    }

    const handleChangeBPP = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: number) => 
    {
        setCurrentBPP(event.currentTarget.id);
        setBlogsPerPage(option);
    }
    
    const { items } = usePagination({
        count: totalPages,
        page: page,
        onChange: handlePageChange
    });
    
    useEffect(() => {
        const newTotal = Math.ceil(blogs.length / blogsPerPage);
        const pageParam: number = currentPageArg % newTotal;
        const newPage = pageParam === 0 ? newTotal : pageParam;
        
        setTotalPages(newTotal);
        setPage(newPage);

        if (!isNaN(newPage) && newPage !== page)
        {
            history.push(`/blog?page=${newPage}`)
        }

        localStorage.setItem("blogs_per_page", blogsPerPage.toString());
        
    }, [blogs, blogsPerPage, currentPageArg]);
    
    useEffect(() => {
        document.getElementById(currentBPP)?.classList.add("selected");
        return () => {
            document.getElementById(currentBPP)?.classList.remove("selected");
        }
    }, [currentBPP]);
    
    useEffect(() => {
        const blogsList = allBlogs
            .filter((blog) => {return (!blog.blog_isHidden ?? true) || (authenticated && userRoles.includes("superadmin"))});
        setBlogs(blogsList);
    }, [allBlogs, setBlogs, authenticated, userRoles]);

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
                    {(authenticated && userRoles.includes("superadmin")) && 
                        <li className="blogs_list_item_wrapper"
                        id="create_new_blog" 
                        key="create_new_blog"
                        onClick={() => history.push("/blog/create_new")}>
                            <div className="blogs_list_item create_new">
                                Create New Blog
                            </div>
                        </li>
                    }

                    {blogs && (blogs
                    .slice(0 + blogsPerPage * (page - 1), blogsPerPage + blogsPerPage * (page - 1))
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