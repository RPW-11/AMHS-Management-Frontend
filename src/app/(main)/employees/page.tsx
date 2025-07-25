
"use client"
import AllEmployeeTable from "@/components/employees/all-employee-table";
import NavigationEmployee from "@/components/employees/navigation-employee";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EmployeesPage = () => {
    const { employees, fetchAllEmployees } = useEmployee()
    const { push } = useRouter()

    const [fetchAllError, setFetchAllError] = useState<string|null>(null)
    const [fetchAllLoading, setFetchAllLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchEmployees = async () => {
            setFetchAllLoading(true)
            const error = await fetchAllEmployees()
            if (error) {
                setFetchAllError(error.title)
            } else {
                setFetchAllError(null)
            }
            setFetchAllLoading(false)
        }
        fetchEmployees()
    },[])

    if(fetchAllError) {
        return (
            <div className="rounded-md p-4 bg-white border space-y-4 text-destructive text-center">
                { fetchAllError }
            </div>
        )
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <NavigationEmployee />
            <div>
                <h1 className="font-semibold text-xl">
                    Employees Detailed Information
                </h1>
                <p className="text-muted-foreground text-sm">
                    Monitor and manage your employees easily. 
                </p>
            </div>
            <div>
            {fetchAllLoading ? 
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