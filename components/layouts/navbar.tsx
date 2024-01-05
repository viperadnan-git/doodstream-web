import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { SITENAME } from "@/lib/constants";
import SearchDialog from "../search/search-dialog";
import SearchInput from "../search/search-input";
import { cn } from "@/lib/utils";
import doodstream from "@/lib/doodstream";

const SideNav = ({ folders }: { folders: any }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <HamburgerMenuIcon
                    className="size-6"
                    role="menu"
                    aria-label="Open Menu"
                ></HamburgerMenuIcon>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription className="flex flex-row justify-around underline">
                        <Link href="/about" role="menuitem">
                            <SheetClose>About</SheetClose>
                        </Link>
                        <Link href="/liked" role="menuitem">
                            <SheetClose>My Likes</SheetClose>
                        </Link>
                        <Link href="/" role="menuitem">
                            <SheetClose>Home</SheetClose>
                        </Link>
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 my-4">
                    {folders.map((folder: any) => {
                        return (
                            <Link
                                href={`/c/${folder.fld_id}`}
                                key={folder.code}
                                className="w-full"
                                role="menuitem"
                            >
                                <SheetClose className="flex flex-col transition-colors bg-accent text-accent-foreground px-2 py-1 rounded-md w-full">
                                    <h1 className="text-xl font-semibold">
                                        {folder.name}
                                    </h1>
                                    <span className="text-[0.65rem] uppercase text-muted-foreground">
                                        {folder.total_files} videos
                                    </span>
                                </SheetClose>
                            </Link>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
};

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    videoCount: number;
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
    ({ className, title, children, videoCount, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        role="menuitem"
                        {...props}
                    >
                        <div className="text-sm font-semibold leading-none">
                            {title}
                        </div>
                        <span className="text-[0.65rem] uppercase text-muted-foreground">
                            {videoCount} videos
                        </span>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";

const NavMenu = ({ folders }: { folders: any }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Channels</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[300px] md:grid-cols-2">
                            {folders.map((folder: any) => (
                                <ListItem
                                    key={folder.fld_id}
                                    title={folder.name}
                                    videoCount={folder.total_files}
                                    href={`/c/${folder.fld_id}`}
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const Navbar = async () => {
    const data = await doodstream.listFolders({ fld_id: "" });
    const folders = data.result.folders;

    return (
        <div className="flex justify-between items-center px-4 py-3 border-b-[1px]">
            <div className="md:hidden">
                <SideNav folders={folders}></SideNav>
            </div>
            <div>
                <Link
                    href="/"
                    className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl"
                >
                    {SITENAME}
                </Link>
            </div>
            <div className="flex flex-row space-x-2">
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/liked"
                        className="hover:bg-accent px-2 py-1.5 rounded-md"
                        aria-label="Open liked videos"
                    >
                        Liked Videos
                    </Link>
                    <NavMenu folders={folders}></NavMenu>
                </div>
                <SearchInput className="hidden md:block w-full md:w-[260px] lg:w-[300px]" />
                <SearchDialog></SearchDialog>
            </div>
        </div>
    );
};

export default Navbar;
