import {
    CalendarIcon,
    CubeIcon,
    DownloadIcon,
    LapTimerIcon,
    RocketIcon,
    Share1Icon,
} from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata, ResolvingMetadata } from "next";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { humanDuration, humanSize } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import CopyButton from "@/components/copy-button";
import LikeButton from "@/components/like-button";
import Link from "next/link";
import MessageBox from "@/components/message-box";
import React from "react";
import { SITENAME } from "@/lib/constants";
import SearchCardList from "@/components/search/search-list";
import doodstream from "@/lib/doodstream";

type PageProps = {
    params: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const data = await doodstream.getFile({ file_code: params.id as string });
    if (data.status !== 200) {
        return {
            title: data.msg,
            description: "Something went wrong. Please try again later.",
        };
    }

    const file = data.result[0];
    const title = `${file.title} - ${SITENAME}`;
    const description = `${file.title} - Duration: ${humanDuration(
        file.length
    )} - Views: ${file.views} views - Size: ${humanSize(
        file.size
    )} - Uploaded On ${new Date(file.uploaded + ".000Z").toLocaleString()}`;
    const image = file.splash_img;
    const previousOgImages = (await parent).openGraph?.images || [];
    const previousTwImages = (await parent).twitter?.images || [];

    return {
        title,
        description,
        twitter: {
            title,
            description,
            images: [...previousTwImages, image],
        },
        openGraph: {
            title,
            description,
            images: [...previousOgImages, image],
        },
    };
}

export default async function Video({ params }: PageProps) {
    const data = await doodstream.getFile({ file_code: params.id as string });
    const upstream = await doodstream.getUpstream();

    if (data.status !== 200) {
        return (
            <MessageBox title={data.msg} countdown={30} variant="error">
                <p className="text-center">
                    Something went wrong. Please try again later.
                </p>
            </MessageBox>
        );
    }

    const file = data.result[0];
    return (
        <div className="grid col-span-full gap-4 md:gap-4 md:mx-10">
            <iframe
                className="w-full h-[30vh] md:h-[55vh] lg:h-[70vh]"
                src={`https://${upstream}/${file.protected_embed}`}
                scrolling="no"
                frameBorder={0}
                allowFullScreen={true}
            ></iframe>
            <Card className="mx-2 mb-8">
                <CardHeader>
                    <CardTitle className="text-xl md:text-3xl font-bold">
                        {file.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-flow-row lg:grid-flow-col">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="flex gap-2 items-center">
                                        <LapTimerIcon className="size-4 md:size-5"></LapTimerIcon>
                                        Duration
                                    </TableCell>
                                    <TableCell>
                                        {humanDuration(file.length)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex gap-2 items-center">
                                        <RocketIcon className="size-4 md:size-5"></RocketIcon>
                                        Views
                                    </TableCell>
                                    <TableCell>{file.views}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex gap-2 items-center">
                                        <CubeIcon className="size-4 md:size-5"></CubeIcon>
                                        Size
                                    </TableCell>
                                    <TableCell>
                                        {humanSize(file.size)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex gap-2 items-center">
                                        <CalendarIcon className="size-4 md:size-5"></CalendarIcon>
                                        Uploaded
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            file.uploaded + ".000Z"
                                        ).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="grid grid-cols-2 gap-2 mt-8 md:grid-cols-3 lg:grid-cols-2 lg:ml-4 lg:my-4">
                            <Link
                                href={`https://${upstream}/d/${file.filecode}`}
                                className="col-span-full md:col-auto lg:col-span-full"
                            >
                                <Button className="w-full">
                                    <DownloadIcon className="size-4 me-1 mb-1"></DownloadIcon>
                                    Download
                                </Button>
                            </Link>
                            <CopyButton className="bg-secondary lg:col-span-full">
                                <Share1Icon className="size-4 me-1 mb-0.5"></Share1Icon>
                                Share
                            </CopyButton>
                            <LikeButton
                                className="lg:col-span-full"
                                useButton={true}
                                file={file}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <h1 className="text-2xl font-bold text-center my-4">
                Related Videos
            </h1>
            <SearchCardList query={file.title.split(" ")[0]} />
        </div>
    );
}
