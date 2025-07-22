"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import InputWithValidation from "@/components/input-with-validation"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/user-avatar"
import { useEmployeeProfile } from "@/hooks/employee/useEmployeeProfile"
import { Option } from "@/types/general"

const EmployeeProfilePage = () => {
    const { employeeDetails, updateField, errors, canSaveProfile } = useEmployeeProfile()

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
                    value={{ name: employeeDetails.position, value: employeeDetails.position }}
                    options={[{ name: employeeDetails.position, value: employeeDetails.position }]}
                    onValueChange={(val:Option) => {}}
                    placeholder="Select position"
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