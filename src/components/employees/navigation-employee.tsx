"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { EmployeeRoutes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { EmployeePosition } from "@/types/employee"
import { getPositionEnumByStr } from "@/utils/employee/employee-util"

const NavigationEmployee = () => {
    const { push } = useRouter()
    const { user } = useUserStore();
    
    const validRoles: EmployeePosition[] = [EmployeePosition.Manager, EmployeePosition.Supervisor]
    
    if (user && validRoles.includes(getPositionEnumByStr(user.position))){
        return (
            <div className="flex gap-4">
                <Button onClick={() => push(EmployeeRoutes.Add)}>Add Employee</Button>
            </div>
        )
    }
}

export default NavigationEmployee