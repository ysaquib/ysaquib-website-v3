/**
 * File: Pagination.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useState } from 'react';

interface PaginationProps 
{
    pageMin: number;
    pageMax: number;
    initialPage?: number;
    pageNeighbors?: 0 | 1 | 2 | 3;
    onPageChange?: (page: number) => void; //TODO: Make this required
}

const Pagination: FC<PaginationProps> = ({pageMin, pageMax, initialPage=6, pageNeighbors=2, onPageChange}) => 
{
    const [currentPage, setCurrentPage] = useState<number>(initialPage > 0 ? initialPage : 1);

    
    const getPageNumbers = () =>
    {

        const totalNumbers = (pageNeighbors * 2) + 3;
        const totalBlocks = totalNumbers + 2;
        let pages = []

        if (pageMax > totalBlocks)
        {
            const startPage = Math.max(2, currentPage - pageNeighbors);
            const endPage = Math.min(pageMax - 1, currentPage + pageNeighbors);
            let extraPages = []
    
            for (var i = startPage; i <= endPage; i++) { pages.push(i); }
            
            const hasRightSpill = startPage > 2;
            const hasLeftSpill = (pageMax - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);
    
            if(hasRightSpill && !hasLeftSpill)
            {
                for (var j = endPage + 1; j <= endPage + spillOffset; j++) { extraPages.push(j); }
                return [...pages, ...extraPages, -2];
            }
            else if(hasLeftSpill && !hasRightSpill)
            {
                for (var k = endPage + 1; k <= endPage + spillOffset; k++) { extraPages.push(k); }
                return [-1, ...extraPages, ...pages];
            }
            return [-1, ...pages, -2];
        }

        for (var l = pageMin; l <= pageMax; l++) { pages.push(l); }
        return pages;
    }

    const handleMoveLeft = () =>
    {
        return;
    }

    const handleMoveRight = () =>
    {
        return;
    }

    const handleGoTo = () =>
    {
        return;
    }

    const inBetween = getPageNumbers();
    console.log(inBetween);

    return (
        <></>
    );
}

export default Pagination;