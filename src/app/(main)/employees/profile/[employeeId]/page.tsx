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
import { getPositionEnumByStr } from "@/utils/employee/employee-util"
import { useParams } from "next/navigation"
import { toast } from "sonner"

const EmployeeProfilePage = () => {
    const { employeeId } = useParams()
    const { user } = useUserStore()

    const resolvedEmployeeId = employeeId?.toString() === "me" ? user?.id : employeeId?.toString();

    const { isFetchingProfile, fetchError, employeeDetails, updateField, errors, canSaveProfile } = useEmployeeProfile(
        resolvedEmployeeId
    );

    const isMyProfile = (): boolean => resolvedEmployeeId === user?.id

    if (fetchError) {
        return (
            <div className="flex justify-center items-center w-full h-full text-4xl font-semibold text-muted-foreground">
                Employee is not found
            </div>
        )
    }

    if (isFetchingProfile) {
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
                    disabled={!isMyProfile()}
                    value={employeeDetails.firstName}
                    onChange={(val) => updateField('firstName', val)}
                    placeholder="Enter your first name..."
                    errorMessage={errors.firstName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Last Name</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()} 
                    value={employeeDetails.lastName}
                    onChange={(val) => updateField('lastName', val)}
                    placeholder="Enter your last name..."
                    errorMessage={errors.lastName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Email</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()} 
                    value={employeeDetails.email}
                    onChange={(val) => updateField('email', val)}
                    placeholder="Enter your email..."
                    errorMessage={errors.email}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Phone Number</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()} 
                    value={employeeDetails.phoneNumber}
                    onChange={(val) => updateField('phoneNumber', val)}
                    placeholder="Enter your phone number..."
                    errorMessage={errors.phoneNumber}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label htmlFor="position" aria-label="position">Position</Label>
                    <SelectOption
                    disabled 
                    value={{ name: getPositionEnumByStr(employeeDetails.position).toString(), value: employeeDetails.position }}
                    options={EMPLOYEE_POSITIONS}
                    onValueChange={(val:Option) => { toast.error(`This function is not implemented yet. Clicked value: ${val.value}`)}}
                    placeholder="Select employee position"
                    labelName="Position"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Date of Birth</Label>
                    <CustomDatePicker 
                    date={new Date(employeeDetails.dateOfBirth)}/>
                </div>
            </div>
            {isMyProfile() && <div className="flex justify-end">
                <Button size={"sm"} disabled={!canSaveProfile}>Save</Button>
            </div>}
        </div>
    )
}

export default EmployeeProfilePage