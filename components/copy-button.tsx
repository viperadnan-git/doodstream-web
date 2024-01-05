"use client";

import { Button } from "./ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CopyButton = ({
    className,
    text,
    children,
}: {
    className?: string;
    text?: string;
    children?: ReactNode;
}) => {
    const textToCopy = text || window.location.href;

    const onCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard");
    };

    return (
        <Button className={cn(className)} onClick={onCopy}>
            {children ? children : "Copy"}
        </Button>
    );
};

export default CopyButton;
