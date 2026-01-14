import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

const Pagination = () => {
    return (
        <div className="flex justify-end gap-4">
            <div className="flex items-center text-sm font-medium gap-2">
                Rows per page
                <Select defaultValue={"10"} >
                    <SelectTrigger className="w-[96px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Number of rows</SelectLabel>
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
                <Button variant={"ghost"} size={"sm"}>
                    <ChevronLeft />
                </Button>
                <Button variant={"ghost"} size={"sm"}>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
};

export default Pagination;
