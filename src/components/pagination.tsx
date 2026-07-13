import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { usePagination } from "@/hooks/usePagination";
import { useTranslation } from "react-i18next";

interface PaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    disabled?:boolean;
}

const Pagination = ({
    page,
    pageSize,
    totalPages,
    hasNext = false,
    hasPrevious = false,
    disabled = false
}: PaginationProps) => {
    const { setPage, setPageSize } = usePagination();
    const { t } = useTranslation();

    return (
        <div className="flex justify-between gap-4 items-center">
            <div className="text-sm font-medium">{t("pagination.pageOf", { page, totalPages: totalPages || 1 })}</div>
            <div className="flex items-center gap-4">
                <div className="flex items-center text-sm font-medium gap-2">
                    {t("pagination.rowsPerPage")}
                    <Select defaultValue={pageSize.toString()} onValueChange={(val) => setPageSize(Number(val))} disabled={disabled}>
                        <SelectTrigger className="w-[96px]">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>{t("pagination.numberOfRows")}</SelectLabel>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"ghost"} size={"sm"} disabled={!hasPrevious || disabled} onClick={() => setPage(page - 1)}>
                        <ChevronLeft />
                    </Button>
                    <Button variant={"ghost"} size={"sm"} disabled={!hasNext || disabled} onClick={() => setPage(page + 1)}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Pagination;
