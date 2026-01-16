import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePagination(initialPage = 1, initialPageSize = 20) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const page = Number(searchParams?.get("page") ?? initialPage);
    const pageSize = Number(searchParams?.get("pageSize") ?? initialPageSize);

    const setPage = useCallback(
        (newPage: number) => {
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            if (newPage <= 1) params.delete("page");
            else params.set("page", String(newPage));
            router.replace(`${pathname}?${params}`, { scroll: false });
        },
        [searchParams, pathname, router]
    );

    const setPageSize = useCallback(
        (newSize: number) => {
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            if (newSize === initialPageSize) params.delete("pageSize");
            else params.set("pageSize", String(newSize));
            params.delete("page");
            router.replace(`${pathname}?${params}`, { scroll: false });
        },
        [searchParams, pathname, router, initialPageSize]
    );

    return {
        page: Math.max(1, isNaN(page) ? 1 : page),
        pageSize: Math.max(
            10,
            Math.min(100, isNaN(pageSize) ? initialPageSize : pageSize)
        ),
        setPage,
        setPageSize,
    };
}
