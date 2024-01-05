import MessageBox from "./message-box";
import Paginate from "./paginate";
import React from "react";
import VideoCard from "./video-card";
import doodstream from "@/lib/doodstream";

const CardList = async ({
    page,
    per_page,
    fld_id,
}: {
    page: number;
    per_page: number;
    fld_id: string | undefined;
}) => {
    const data = await doodstream.listFiles({ page, per_page, fld_id });

    if (!data.result.results) {
        return (
            <MessageBox title="No videos found" variant="info">
                <p className="text-center">
                    This Channel doesn&apos;t have any videos yet.
                </p>
            </MessageBox>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-0 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
                {data.result.files.map((video: any) => {
                    return (
                        <VideoCard
                            key={video.file_code}
                            video={video}
                        ></VideoCard>
                    );
                })}
            </div>
            <Paginate total={data.result.total_pages} current={page}></Paginate>
        </div>
    );
};

export default CardList;
