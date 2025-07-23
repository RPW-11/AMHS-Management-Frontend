"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import LoadingSpinner from "@/components/loading-spinner"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EMPLOYEE_POSITIONS } from "@/constants/employee"
import { useEmployeeRegis } from "@/hooks/employee/useEmployeeRegis"
import { Option } from "@/types/general"
import { getPositionEnumByStr } from "@/utils/employee-registration/regis-util"
import { useRouter } from "next/navigation"
import { useState } from "react"


const AddEmployeePage = () => {
    const { push } = useRouter()
    const { employeeRegisReq, updateField, register, canAddEmployee, errors } = useEmployeeRegis();
    const [registerLoading, setRegisterLoading] = useState<boolean>(false)
    const [regisError, setRegisError] = useState<string|null>(null)

    const getPosition = (): Option => {
        return EMPLOYEE_POSITIONS.find(pos => pos.value === employeeRegisReq.position.toString()) || { name: "", value: ""}
    }

    const handleRegister = async () => {
        setRegisError(null)
        setRegisterLoading(true)
        const [employee, error] = await register(employeeRegisReq)
        if (error) {
            setRegisError(error.title)
        } else {
            setRegisError(null)
            push(`/employees`)
        }
        setRegisterLoading(false)
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="">
                <h2 className="font-semibold text-lg">Fill out the employee information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>First Name</Label>
                    <Input 
                    value={employeeRegisReq.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Enter employee's first name"/>
                    <p className="text-xs text-destructive">
                        { errors["firstName"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Last Name</Label>
                    <Input 
                    value={employeeRegisReq.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Enter employee's last name"/>
                    <p className="text-xs text-destructive">
                        { errors["lastName"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Email</Label>
                    <Input 
                    value={employeeRegisReq.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter employee's email"/>
                    <p className="text-xs text-destructive">
                        { errors["email"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Password</Label>
                    <Input 
                    value={employeeRegisReq.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Enter employee's password"
                    type="password"/>
                    <p className="text-xs text-destructive">
                        { errors["password"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Date of Birth</Label>
                    <CustomDatePicker />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Phone Number</Label>
                    <Input 
                    value={employeeRegisReq.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    placeholder="Enter employee's phone number"/>
                    <p className="text-xs text-destructive">
                        { errors["phoneNumber"] }
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Position</Label>
                    <SelectOption 
                    value={getPosition()}
                    options={EMPLOYEE_POSITIONS}
                    onValueChange={(option) => updateField("position", getPositionEnumByStr(option.value))}
                    labelName={"Position"} 
                    placeholder={"Enter employee's position"} />
                </div>
                {regisError && <div className="col-span-2 text-sm text-destructive">
                    { regisError }
                </div>}
            </div>
            <div className="flex justify-end">
                <Button onClick={handleRegister} disabled={!canAddEmployee || registerLoading}>
                    Add
                    {registerLoading && <LoadingSpinner size="sm"/>}
                </Button>
            </div>
        </div>
    )
}

export default AddEmployeePage