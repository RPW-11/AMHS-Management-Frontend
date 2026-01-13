
"use client"
import AllEmployeeTable from "@/components/employees/all-employee-table";
import NavigationEmployee from "@/components/employees/navigation-employee";
import LoadingSpinner from "@/components/loading-spinner";
import { useEmployee } from "@/hooks/employee/useEmployee";

const EmployeesPage = () => {
    const { employees, isFetching, fetchError } = useEmployee()

    if(fetchError) {
        return (
            <div className="rounded-md p-4 bg-white border space-y-4 text-destructive text-center">
                { fetchError }
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
            {isFetching ? 
                <div className="flex justify-center">
                    <LoadingSpinner/> 
                </div>
                : 
                <AllEmployeeTable employees={employees}/>
            }
            </div>
        </div>
    )
}

export default EmployeesPage