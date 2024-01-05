"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import React, { ReactNode } from "react";

import Center from "./layouts/center";
import { InfoIcon } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MessageBox = ({
    title,
    children,
    variant,
    countdown,
}: {
    title: string;
    children?: ReactNode;
    variant?: "error" | "info";
    countdown?: number;
}) => {
    const router = useRouter();
    const color = variant === "error" ? "text-red-500" : "text-blue-500";
    const [count, setCount] = React.useState(countdown || 0);

    React.useEffect(() => {
        if (countdown) {
            const timer = setTimeout(() => {
                count > 0 && setCount(count - 1);
            }, 1000);

            if (count === 0) {
                router.push("/");
            }
            return () => clearTimeout(timer);
        }
    }, [count, countdown, router]);

    return (
        <Center>
            <Card className="border-0 lg:max-w-screen-md">
                <CardHeader>
                    <CardTitle className="flex flex-col items-center text-2xl break-words">
                        <InfoIcon
                            className={cn("size-14 mb-2", color)}
                        ></InfoIcon>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">{children}</CardContent>
                <CardFooter className="flex flex-col items-center">
                    {countdown && (
                        <div className="text-xs text-gray-500 uppercase">
                            Redirecting to home in {count} seconds
                        </div>
                    )}
                </CardFooter>
            </Card>
        </Center>
    );
};

export default MessageBox;
