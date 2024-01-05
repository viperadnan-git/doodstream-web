import { Card, CardContent } from "./ui/card";
import { humanDuration, naturalTime } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { CalendarIcon } from "@radix-ui/react-icons";
import LikeButton from "./like-button";
import Link from "next/link";
import React from "react";
import Thumbnail from "./thumbnail";

const VideoCard = ({ video }: any) => {
    return (
        <Card className="border-0 rounded-none md:border-[1px] md:rounded-md transform transition duration-200 md:hover:scale-[101%] md:hover:shadow-lg">
            <div className="relative">
                <Thumbnail
                    single_img={video.single_img}
                    splash_img={video.splash_img}
                    title={video.title}
                />
                <Badge className="absolute bottom-1 right-1 px-1 bg-black bg-opacity-65">
                    {humanDuration(video.length)}
                </Badge>
            </div>
            <CardContent className="p-1.5">
                <Link
                    href={`/v/${video.file_code}`}
                    className="line-clamp-2 text-sm md:text-md font-semibold hover:text-primary focus:text-primary"
                    aria-label={`Watch ${video.title}`}
                >
                    {video.title}
                </Link>
                <div className="flex flex-row justify-between text-[0.6rem] md:text-xs my-1 uppercase text-gray-500">
                    <span>{video.views} views</span>
                    <div className="inline-flex">
                        {naturalTime(video.uploaded + ".000Z")}
                        <LikeButton file={video} className="ml-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
