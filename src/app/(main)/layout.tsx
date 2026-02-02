"use client"
import Sidebar from "@/components/sidebar";
import Header from "@/components/header/header";
import ProtectedRouteWrapper from "@/components/protected-route-wrapper";
import { useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const sidebarWidth = isSideBarOpen ? 256 : 72;
    const contentMargin = isSideBarOpen ? 'ml-64' : 'ml-18';

    return (
        <ProtectedRouteWrapper>
            <div className="flex overflow-x-hidden w-full">
                <Sidebar isOpen={isSideBarOpen} onOpenChange={setIsSideBarOpen} sidebarWidth={sidebarWidth}/>
                <main className={`flex-1 flex flex-col relative transition-all duration-300 ${contentMargin}`}>
                    <div className="sticky top-0 w-full bg-gray-100 z-10">
                        <Header />
                    </div>
                    <div className="p-6 flex-1">{children}</div>
                </main>
            </div>
        </ProtectedRouteWrapper>
    );
}
