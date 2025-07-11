"use client"
import EmployeeSummary from "@/components/dashboard/employee-summary"
import ProductSummary from "@/components/dashboard/product-summary"
import TaskSummary from "@/components/dashboard/task-summary"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComp } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "lucide-react"
import { useState } from "react"

const DashboardPage = () => {
    const [currDate, setCurrDate] = useState<Date>(new Date())
    
    const formatCurrDateToStr = (): string => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',    
            day: 'numeric',     
            month: 'short',     
            year: 'numeric',   
        }).format(currDate).toString()
    }

    return (
        <div className="space-y-4 max-w-6xl m-auto">
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl">Hello Rainata Putra,</h1>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size={"sm"} variant={"outline"}>
                            <Calendar/>
                            { formatCurrDateToStr() }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                        <CalendarComp
                        mode="single"
                        selected={currDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                        setCurrDate(date || new Date())
                        }}/>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex justify-center">
                <ProductSummary />
            </div>
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-7 xl:col-span-3">
                    <EmployeeSummary />
                </div>
                <div className="col-span-7 xl:col-span-4">
                    <TaskSummary />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage