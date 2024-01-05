"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input";
import React from "react";
import { cn } from "@/lib/utils";

const SearchInput = ({ className }: { className?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = React.useState(searchParams.get("q") || "");
    const [timer, setTimer] = React.useState(null as any);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value.trim();
        if (search === newSearch) return;

        setSearch(newSearch);

        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(() => {
                executeSearch(newSearch);
            }, 500)
        );
    };

    const executeSearch = (query: string) => {
        const params = new URLSearchParams();
        params.set("q", query);
        router.push("/?" + params.toString());
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        executeSearch(search);
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                aria-label="Search"
                className={cn(className)}
                type="search"
                placeholder="Search"
                onChange={onChange}
                role="searchbox"
                defaultValue={search}
            />
        </form>
    );
};

export default SearchInput;
