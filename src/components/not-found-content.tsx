"use client";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/general";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFoundContent = () => {
    const { push } = useRouter();

    useEffect(() => {
        document.title = "Page Not Found | 404 Error";
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="bg-primary p-4 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-black">
                        404 - Page Not Found
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        The page you are looking for doesn't exist or has been
                        moved.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Check the URL for errors or try navigating from the
                        homepage.
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => push(Routes.Dashboard)}>
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundContent;
