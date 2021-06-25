import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { deleteBlog, hideBlog, getBlogData } from '../../store/actions/dataActions';
import { BlogData } from '../../store/types/dataTypes';
import DialogBox from '../elements/DialogBox';
import { IconEye, IconEyeOff, IconGarbageDelete } from '../elements/Icons';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Pagination from '../elements/Pagination';


interface HideButtonProps
{
    blog: BlogData;
    toggleHidden: () => void;
}

const HideButton : FC<HideButtonProps> = ({blog, toggleHidden}) => 
{
    const [isBlogHidden, setBlogHidden] = useState(blog.blog_isHidden ?? false);
    
    const toggleHide = () =>
    {
        setBlogHidden(!isBlogHidden);
        toggleHidden();
    }
    
    return (
        <div className="blogs_list_item_button hide" id="hide" onClick={toggleHide}><span className="svg_icon">{isBlogHidden ? IconEyeOff : IconEye}</span></div>
    );
}

function useQuery () 
{
    return new URLSearchParams(useLocation().search);
}

interface BlogsListProps
{
    isLoadingInitial: boolean;
    setLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
    allBlogs: BlogData[];
}

const BlogsList : FC<BlogsListProps> = ({isLoadingInitial, setLoadingInitial, allBlogs}) =>
{

    const BlogsPerPage = 2;

    const currentPage = parseInt(useQuery().get("page") ?? "1");

    const pageNumbersToRender = 20;

    console.log(currentPage);
    const history = useHistory();
    const dispatch = useDispatch();
    const BlogData = useSelector((state: RootState) => state.blogs);
    
    const [blogs, setBlogs] = useState<BlogData[]>(allBlogs);

    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);
    const [ dialog, setDialog ] = useState<JSX.Element>(<></>);

    function toggleHidden(blogData: BlogData)
    {
        dispatch(hideBlog(blogData, blogs));
        dispatch(getBlogData(() => setLoadingInitial(false), () => {console.log("Error getting Blog data.")}));
    }

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
                    onReject={() => dispatch(deleteBlog(blogData, allBlogs, (err) => console.log(err)))}/>
            );
        }
        else
        {
            setDialog(<></>);
        }
    }

    useEffect(() => {
        const blogsList = BlogData
            .filter((blog) => {return (!blog.blog_isHidden ?? true) || (authenticated && userRoles.includes("superadmin"))})
            .slice(0 + BlogsPerPage * (currentPage - 1), BlogsPerPage + BlogsPerPage * (currentPage - 1));

        setBlogs(blogsList);
        return () => {
            setBlogs([]);
        }
    }, [BlogData]);

    if (isLoadingInitial)
    {
        return(
            <section id="blogslist" className="">
                <h1 className="admin_title blogs_title">Blog</h1>
                <div className="blogs_list_wrapper">
                    <ul className="blogs_list">
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                        <LoadingSkeleton className="blogs_list_item loading" type="rectangle" />
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section id="blogslist" className="">
            {dialog}
            <h1 className="admin_title blogs_title">Blog</h1>
            <div className="blogs_list_wrapper">
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
                    .map((blog) =>{
                        return (
                        <li className="blogs_list_item_wrapper"
                            id={blog.blog_id} 
                            key={blog.blog_id}>
                            <div className="blogs_list_item" onClick={() => history.push(`/blog/${blog.blog_url}`)}>
                                <h1 className="blogs_list_title">
                                    {blog.blog_title}
                                </h1>
                                <p className="blogs_list_date">
                                    {blog.blog_createdAt.toLocaleDateString(undefined , {year: 'numeric', month: 'long', day: 'numeric'})}
                                </p>
                            </div>
                            {(authenticated && userRoles.includes("superadmin")) && (<>
                                <HideButton blog={blog} toggleHidden={() => toggleHidden(blog)}/>
                                <div className="blogs_list_item_button delete" id="delete" onClick={() => handleClickDelete(blog)}><span className="svg_icon">{IconGarbageDelete}</span></div>
                            </>)}
                        </li>
                    );}))}

                </ul>
                <Pagination pageMin={1} pageMax={30} />
            </div>
        </section>
    );
}

export default BlogsList