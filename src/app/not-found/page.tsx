"use client"
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/general";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForbiddenPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        document.title = "Access Forbidden | 403 Error";
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
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                        </svg>
                    </div>
                </div>
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-black">
                        403 - Forbidden
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        You don't have permission to access this page.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please contact your administrator if you believe this is an error.
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={() => push(Routes.Dashboard)} >
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;