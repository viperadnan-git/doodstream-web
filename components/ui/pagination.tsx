import * as React from "react";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1 md:gap-3", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
    href: string;
    isActive?: boolean;
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<typeof Link>;

const PaginationLink = ({
    className,
    href,
    isActive,
    size = "icon",
    children,
    ...props
}: PaginationLinkProps) => (
    <PaginationItem>
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                buttonVariants({
                    variant: isActive ? "outline" : "ghost",
                    size,
                }),
                "cursor-pointer",
                className,
                isActive && "text-primary"
            )}
            {...props}
        >
            {children}
        </Link>
    </PaginationItem>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn(className)}
        {...props}
    >
        <ChevronLeftIcon />
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={className}
        {...props}
    >
        <ChevronRightIcon />
    </PaginationLink>
);

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-6 items-center justify-center", className)}
        {...props}
    >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
