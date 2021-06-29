import { usePagination } from '@material-ui/lab/Pagination';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { deleteBlog, setBlogData } from '../../store/actions/dataActions';
import { BlogData } from '../../store/types/dataTypes';
import DialogBox from '../elements/DialogBox';
import { IconEye, IconEyeOff, IconGarbageDelete } from '../elements/Icons';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Pagination from '../elements/Pagination';

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

    const history = useHistory();
    return (
        <li className="blogs_list_item_wrapper"
            id={blog.blog_id} 
            key={blog.blog_id}>
           
            {dialog}
            
            <div className="blogs_list_item" onClick={() => history.push(`/blog/${blog.blog_url}`)}>
                <h1 className="blogs_list_title">
                    {blog.blog_title}
                </h1>
                <p className="blogs_list_date">
                    {blog.blog_createdAt.toLocaleDateString(undefined , {year: 'numeric', month: 'long', day: 'numeric'})}
                </p>
            </div>
            {(authenticated && userRoles.includes("superadmin")) && (<>
                <div className="blogs_list_item_button hide" id="hide" onClick={setHidden}><span className="svg_icon">{isBlogHidden ? IconEyeOff : IconEye}</span></div>
                
                <div className="blogs_list_item_button delete" id="delete" onClick={() => handleClickDelete(blog)}><span className="svg_icon">{IconGarbageDelete}</span></div>
            </>)}
        </li>
    )
}

const BlogsList : FC = () =>
{

    const currentPage = parseInt(useQuery().get("page") ?? "1");

    const history = useHistory();
    const dispatch = useDispatch();
    const {allBlogs, isLoadingBlogs} = useSelector((state: RootState) => state.blogs);
    
    const { authenticated, userRoles } = useSelector((state : RootState) => state.auth);

    const [ blogsPerPage, setBlogsPerPage] = useState<number>(4);
    const [ blogs, setBlogs ] = useState<BlogData[]>(allBlogs);

    const [ pageBlogs, setPageBlogs ] = useState<BlogData[]>([]);

    const [ page, setPage] = useState<number>(currentPage);
    const [ totalPages, setTotalPages] = useState<number>(1);

    
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) =>
    {
        history.push(`/blog?page=${value}`);
        setPage(value);
    }

    const { items } = usePagination(
    {
        count: totalPages,
        page: page,
        onChange: handlePageChange
    });

    useEffect(() => {
        const total = Math.ceil(blogs.length / blogsPerPage);
        console.log(blogs.length, total);
        setTotalPages(total);
        return () => {
            setTotalPages(0);
        }
    }, [blogs, blogsPerPage])

    useEffect(() => {
        const blogsList = allBlogs
            .filter((blog) => {return (!blog.blog_isHidden ?? true) || (authenticated && userRoles.includes("superadmin"))});
        
        const pageBlogsList = blogsList
            .slice(0 + blogsPerPage * (currentPage - 1), blogsPerPage + blogsPerPage * (currentPage - 1));

        setBlogs(blogsList);
        setPageBlogs(pageBlogsList);
        return () => {
            setBlogs([]);
            setPageBlogs([]);
        }
    }, [allBlogs, page, setBlogs, setPageBlogs, blogsPerPage, authenticated, userRoles, currentPage]);

    if (isLoadingBlogs)
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

                    {pageBlogs && (pageBlogs
                    .map((blog) =>
                        <BlogListItem blog={blog} key={blog.blog_id} />    
                    ))}
                </ul>

                <Pagination items={items} />
            </div>
        </section>
    );
}

export default BlogsList