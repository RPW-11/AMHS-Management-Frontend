"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import InputWithValidation from "@/components/input-with-validation"
import LoadingSpinner from "@/components/loading-spinner"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/user-avatar"
import { EMPLOYEE_POSITIONS } from "@/constants/employee"
import { useEmployeeProfile } from "@/hooks/employee/useEmployeeProfile"
import { useUserStore } from "@/stores/useAuthStore"
import { Option } from "@/types/general"
import { getPositionEnumByStr } from "@/utils/employee-registration/regis-util"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const EmployeeProfilePage = () => {
    const { employeeId } = useParams()
    const { user } = useUserStore()

    const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
    const [fetchError, setFetchError] = useState<string|null>(null)

    const resolvedEmployeeId = employeeId?.toString() === "me" ? user?.id : employeeId?.toString();

    const { fetchEmployeeById, employeeDetails, updateField, errors, canSaveProfile } = useEmployeeProfile();


    useEffect(() => {
        const fetchProfile = async (employeeId: string) => {
            setLoadingProfile(true)
            const error = await fetchEmployeeById(employeeId)
            if (error) {
                setFetchError(error.title)
            } else {
                setFetchError(null)
            }
            setLoadingProfile(false)
        }
        if (resolvedEmployeeId) {
            fetchProfile(resolvedEmployeeId)
        }
    }, [resolvedEmployeeId])

    if (fetchError) {
        return (
            <div className="flex justify-center items-center w-full h-full text-4xl font-semibold text-muted-foreground">
                Employee is not found
            </div>
        )
    }

    if (loadingProfile) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <LoadingSpinner size="xl"/>
            </div>
        )
    }

    return (
        <div className="rounded-md border bg-white p-4 space-y-6">
            <h1 className="font-semibold text-2xl">Employee Profile</h1>
            <div className="space-y-4">
                <Label>Profile Image</Label>
                <UserAvatar
                size="custom"
                customSize="h-48 w-48 text-4xl"
                userData={employeeDetails}
                hideNames
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>First Name</Label>
                    <InputWithValidation 
                    value={employeeDetails.firstName}
                    onChange={(val) => updateField('firstName', val)}
                    placeholder="Enter your first name..."
                    errorMessage={errors.firstName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Last Name</Label>
                    <InputWithValidation 
                    value={employeeDetails.lastName}
                    onChange={(val) => updateField('lastName', val)}
                    placeholder="Enter your last name..."
                    errorMessage={errors.lastName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Email</Label>
                    <InputWithValidation 
                    value={employeeDetails.email}
                    onChange={(val) => updateField('email', val)}
                    placeholder="Enter your email..."
                    errorMessage={errors.email}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Phone Number</Label>
                    <InputWithValidation 
                    value={employeeDetails.phoneNumber}
                    onChange={(val) => updateField('phoneNumber', val)}
                    placeholder="Enter your phone number..."
                    errorMessage={errors.phoneNumber}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Position</Label>
                    <SelectOption
                    disabled 
                    value={{ name: getPositionEnumByStr(employeeDetails.position).toString(), value: employeeDetails.position }}
                    options={EMPLOYEE_POSITIONS}
                    onValueChange={(val:Option) => {}}
                    placeholder="Select employee position"
                    labelName="Position"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Date of Birth</Label>
                    <CustomDatePicker date={new Date(employeeDetails.dateOfBirth)}/>
                </div>
            </div>
            <div className="flex justify-end">
                <Button size={"sm"} disabled={!canSaveProfile}>Save</Button>
            </div>
        </div>
    )
}

export default EmployeeProfilePage