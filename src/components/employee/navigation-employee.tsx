"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { EmployeeRoutes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { EmployeePosition } from "@/types/employee"
import { getPositionEnumByStr } from "@/utils/employee/employee-util"
import { useTranslation } from "react-i18next"

const NavigationEmployee = () => {
    const { push } = useRouter()
    const { user } = useUserStore();
    const { t } = useTranslation()

    const validRoles: EmployeePosition[] = [EmployeePosition.Manager, EmployeePosition.Supervisor]

    if (user && validRoles.includes(getPositionEnumByStr(user.position))){
        return (
            <div className="flex gap-4">
                <Button onClick={() => push(EmployeeRoutes.Add)}>{t("employees.addEmployee")}</Button>
            </div>
        )
    }
}

export default NavigationEmployee