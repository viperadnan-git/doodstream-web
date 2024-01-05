"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import usePagination, { DOTS } from "@/hooks/usePagination";

import { useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSearchParams } from "next/navigation";

const Paginate = ({ total, current }: { total: number; current: number }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const siblings = isMobile ? 1 : isTablet ? 2 : isDesktop ? 3 : 0;
    const range = usePagination({ current, siblings, total });
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: number) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value.toString());

            return "?" + params.toString();
        },
        [searchParams]
    );

    if (current === 0 || range?.length < 2) {
        return null;
    }

    let lastPage = range[range?.length - 1];
    return (
        <Pagination className="my-12">
            <PaginationContent>
                {current !== 1 && (
                    <PaginationPrevious
                        href={createQueryString("page", current - 1)}
                    ></PaginationPrevious>
                )}
                {range.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis></PaginationEllipsis>
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationLink
                            href={createQueryString("page", Number(pageNumber))}
                            key={index}
                            isActive={pageNumber === current}
                        >
                            {pageNumber}
                        </PaginationLink>
                    );
                })}
                {current !== lastPage && (
                    <PaginationNext
                        href={createQueryString("page", current + 1)}
                    ></PaginationNext>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default Paginate;
