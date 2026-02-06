
"use client"
import AllEmployeeTable from "@/components/employee/all-employee-table";
import NavigationEmployee from "@/components/employee/navigation-employee";
import LoadingSpinner from "@/components/loading-spinner";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { CircleX } from "lucide-react";

const EmployeesPage = () => {
    const { employees, isLoading, error } = useEmployee();

    if (isLoading) {
        return(
            <div className="w-full h-full flex justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
             <div className="w-full h-full flex flex-col items-center justify-center text-center gap-2">
                <CircleX size={32} className="text-red-500"/>
                <div className="text-xl text-red-500">Error fetching the data</div>
            </div>
        )
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-xl">
                        Employees Detailed Information
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Monitor and manage your employees easily. 
                    </p>
                </div>
                <NavigationEmployee />
            </div>
            <div>
            <AllEmployeeTable employees={employees}/>
            </div>
        </div>
    )
}

export default EmployeesPage