
"use client"
import AllEmployeeTable from "@/components/employee/all-employee-table";
import NavigationEmployee from "@/components/employee/navigation-employee";
import LoadingSpinner from "@/components/loading-spinner";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmployeesPage = () => {
    const { employees, isLoading, error } = useEmployee();
    const { t } = useTranslation();

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
                <div className="text-xl text-red-500">{t("employees.errorFetching")}</div>
            </div>
        )
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-xl">
                        {t("employees.title")}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {t("employees.subtitle")}
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