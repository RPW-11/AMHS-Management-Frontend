"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import EmployeeSummary from "@/components/dashboard/employee-summary"
import ProductSummary from "@/components/dashboard/product-summary"
import TaskSummary from "@/components/dashboard/task-summary"
import { useState } from "react"

const DashboardPage = () => {
    const [currDate, setCurrDate] = useState<Date>(new Date())

    return (
        <div className="space-y-4 max-w-6xl m-auto">
            <div className="flex justify-between">
                <h1 className="font-semibold text-2xl">Hello Rainata Putra,</h1>
                <CustomDatePicker date={currDate} onDateChange={setCurrDate} />
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