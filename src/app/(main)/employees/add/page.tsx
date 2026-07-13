"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import LoadingSpinner from "@/components/loading-spinner"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Routes } from "@/constants/general"
import { useEmployeeRegis } from "@/hooks/employee/useEmployeeRegis"
import { useRoleRestriction } from "@/hooks/useRoleRestriction"
import { Option } from "@/types/general"
import { getPositionEnumByStr, getTranslatedEmployeePositions } from "@/utils/employee/employee-util"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"


const AddEmployeePage = () => {
    const { loadingVerification } = useRoleRestriction()
    const { t } = useTranslation()

    const { push } = useRouter()
    const { employeeRegisReq, updateField, register, canAddEmployee, errors } = useEmployeeRegis();
    const [registerLoading, setRegisterLoading] = useState<boolean>(false)
    const [regisError, setRegisError] = useState<string|null>(null)

    const employeePositions = getTranslatedEmployeePositions(t)

    const getPosition = (): Option => {
        return employeePositions.find(pos => pos.value === employeeRegisReq.position.toString()) || { name: "", value: ""}
    }

    const handleRegister = async () => {
        setRegisError(null)
        setRegisterLoading(true)
        const error = await register(employeeRegisReq)
        if (error) {
            setRegisError(error.title)
        } else {
            setRegisError(null)
            push(Routes.Employees)
        }
        setRegisterLoading(false)
    }

    if (loadingVerification) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-4 items-center">
                    <LoadingSpinner />
                    <p className="font-medium">{t("employees.add.verifyingAccess")}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="">
                <h2 className="font-semibold text-lg">{t("employees.add.title")}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.firstName")}</Label>
                    <Input
                    value={employeeRegisReq.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder={t("employees.add.firstNamePlaceholder")}/>
                    <p className="text-xs text-destructive">
                        { errors["firstName"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.lastName")}</Label>
                    <Input
                    value={employeeRegisReq.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder={t("employees.add.lastNamePlaceholder")}/>
                    <p className="text-xs text-destructive">
                        { errors["lastName"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.email")}</Label>
                    <Input
                    value={employeeRegisReq.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("employees.add.emailPlaceholder")}/>
                    <p className="text-xs text-destructive">
                        { errors["email"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.password")}</Label>
                    <Input
                    value={employeeRegisReq.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder={t("employees.add.passwordPlaceholder")}
                    type="password"/>
                    <p className="text-xs text-destructive">
                        { errors["password"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.dateOfBirth")}</Label>
                    <CustomDatePicker date={new Date(employeeRegisReq.dateOfBirth)} onDateChange={(date) => updateField("dateOfBirth", date.toDateString())} />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.phoneNumber")}</Label>
                    <Input
                    value={employeeRegisReq.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    placeholder={t("employees.add.phoneNumberPlaceholder")}/>
                    <p className="text-xs text-destructive">
                        { errors["phoneNumber"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.add.position")}</Label>
                    <SelectOption
                    value={getPosition()}
                    options={employeePositions}
                    onValueChange={(option) => updateField("position", getPositionEnumByStr(option.value))}
                    labelName={t("employees.add.position")}
                    placeholder={t("employees.add.positionPlaceholder")} />
                </div>
                {regisError && <div className="col-span-2 text-sm text-destructive">
                    { regisError }
                </div>}
            </div>
            <div className="flex justify-end">
                <Button onClick={handleRegister} disabled={!canAddEmployee || registerLoading}>
                    {t("employees.add.addButton")}
                    {registerLoading && <LoadingSpinner size="sm"/>}
                </Button>
            </div>
        </div>
    )
}

export default AddEmployeePage