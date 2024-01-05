"use client";

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LButton = ({ className, liked, onLike }: any) => {
    return (
        <Button
            className={cn(
                className,
                liked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-secondary hover:bg-secondary"
            )}
            onClick={onLike}
        >
            {liked ? (
                <HeartFilledIcon className="size-4 mr-1 mb-0.5"></HeartFilledIcon>
            ) : (
                <HeartIcon className="size-4 mr-1 mb-0.5"></HeartIcon>
            )}
            {liked ? "Liked" : "Like"}
        </Button>
    );
};

const LIcon = ({ className, liked, onLike }: any) => {
    return (
        <div className={cn(className, "cursor-pointer")} onClick={onLike}>
            {liked ? (
                <HeartFilledIcon className="size-3.5 mb-0.5 text-red-500"></HeartFilledIcon>
            ) : (
                <HeartIcon className="size-3.5 mb-0.5"></HeartIcon>
            )}
        </div>
    );
};

const LikeButton = ({
    className,
    useButton,
    file,
}: {
    className?: string;
    useButton?: boolean;
    file: any;
}) => {
    const file_code = file.file_code || file.filecode;
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("liked_" + file_code)) {
            setLiked(true);
        }
    }, [file_code]);

    const onLike = () => {
        if (liked) {
            localStorage.removeItem("liked_" + file_code);

            toast.success(file.title + " removed from liked videos", {
                className: "!bg-red-500 !border-0",
            });

            setLiked(false);
        } else {
            const searializedFile = JSON.stringify({
                file_code,
                liked_on: Date.now(),
                ...file,
            });
            localStorage.setItem("liked_" + file_code, searializedFile);

            toast.success(file.title + " added to liked videos", {
                className: "!bg-green-500 !border-0",
            });

            setLiked(true);
        }
    };

    if (useButton) {
        return (
            <LButton
                className={className}
                liked={liked}
                onLike={onLike}
            ></LButton>
        );
    }

    return <LIcon className={className} liked={liked} onLike={onLike}></LIcon>;
};

export default LikeButton;
