import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function Template({ children }: { children: ReactNode }) {
    return (
        <main>
            <Navbar />
            <div className="md:mx-16 lg:mx-24 xl:mx-28 min-h-screen">
                {children}
            </div>
            <Footer />
            <Toaster position="top-right" />
        </main>
    );
}
