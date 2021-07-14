/**
 * File: Pagination.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import { UsePaginationItem } from '@material-ui/lab/Pagination';
import { IconChevronLeft, IconChevronRight, IconMore, IconSkipBackward, IconSkipForward } from './Icons';

interface PaginationProps
{
    items: UsePaginationItem[];
}

/**
 * Uses Material-UI's usePagination to do all the logic. This is just a wrapper.
 */
const Pagination : FC<PaginationProps> = ({items}) =>
{

    function buttonIcon(type: "first" | "last" | "next" | "previous")
    {
        switch(type)
        {
            case "previous": 
                return (<span className="svg_icon button_icon">{IconChevronLeft}</span>);
            case "next": 
                return (<span className="svg_icon button_icon">{IconChevronRight}</span>);
            case "first":
                return (<span className="svg_icon button_icon">{IconSkipBackward}</span>);
            case "last":
                return (<span className="svg_icon button_icon">{IconSkipForward}</span>);
        }
    }

    return (
        <nav>
            <ul className="pagination">
                {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = (
                        <div className="pagination_icon svg_icon">{IconMore}</div>
                    );
                } else if (type === 'page') {
                    children = (
                    <button className={`pagination_button ${selected ? "selected" : ""}`} {...item}>
                        {page}
                    </button>
                    );
                } else {
                    children = (
                    <button className="pagination_button with_icon" {...item}>
                        {
                            buttonIcon(type)
                        }
                    </button>
                    );
                }

                return <li key={index}>{children}</li>;
                })}
            </ul>
        </nav>
    )
}

export default Pagination;