import React from "react";

const Center = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-[50vh] justify-center items-center">
            {children}
        </div>
    );
};

export default Center;
