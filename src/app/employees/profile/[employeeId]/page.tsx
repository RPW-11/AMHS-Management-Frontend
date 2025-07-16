"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import InputWithValidation from "@/components/input-with-validation"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/user-avatar"
import { useEmployeeProfile } from "@/hooks/employee/useEmployeeProfile"
import { Employee } from "@/types/employee"
import { Option } from "@/types/general"
import { useState } from "react"

const EmployeeProfilePage = () => {
    const { validateFirstName, validateLastName, validateEmail, validatePhoneNumber } = useEmployeeProfile()

    const [employee, setEmployee] = useState<Employee>({
        id: "e1a9b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        age: 32,
        phoneNumber: "+1 (555) 123-4567",
        position: "Senior Software Engineer",
        dateOfBirth: "15 May 1992",
        imgUrl: "https://i.pinimg.com/474x/61/9c/64/619c64898a25274894d2e98a0700a7ca.jpg"
    })

    const handleChangeFirstName = (value: string) => setEmployee({...employee, firstName: value})

    const handleChangeLastName = (value: string) => setEmployee({...employee, lastName: value})

    const handleChangeEmail = (value: string) => setEmployee({...employee, email: value})

    const handleChangePhoneNumber = (value: string) => setEmployee({...employee, phoneNumber: value})


    return (
        <div className="rounded-md border bg-white p-4 space-y-6">
            <h1 className="font-semibold text-2xl">Employee Profile</h1>
            <div className="space-y-4">
                <Label>Profile Image</Label>
                <UserAvatar
                size="custom"
                customSize="h-48 w-48 text-4xl"
                userData={employee}
                hideNames
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>First Name</Label>
                    <InputWithValidation 
                    value={employee.firstName}
                    onChange={handleChangeFirstName}
                    placeholder="Enter your first name..."
                    validationFunction={() => validateFirstName(employee.firstName)}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Last Name</Label>
                    <InputWithValidation 
                    value={employee.lastName}
                    onChange={handleChangeLastName}
                    placeholder="Enter your last name..."
                    validationFunction={() => validateLastName(employee.lastName)}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Email</Label>
                    <InputWithValidation 
                    value={employee.email}
                    onChange={handleChangeEmail}
                    placeholder="Enter your email..."
                    validationFunction={() => validateEmail(employee.email)}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Phone Number</Label>
                    <InputWithValidation 
                    value={employee.phoneNumber}
                    onChange={handleChangePhoneNumber}
                    placeholder="Enter your phone number..."
                    validationFunction={() => validatePhoneNumber(employee.phoneNumber)}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Position</Label>
                    <SelectOption
                    disabled 
                    value={{ name: employee.position, value: employee.position }}
                    options={[{ name: employee.position, value: employee.position }]}
                    onValueChange={(val:Option) => {}}
                    placeholder="Select position"
                    labelName="Position"
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Date of Birth</Label>
                    <CustomDatePicker date={new Date(employee.dateOfBirth)}/>
                </div>
            </div>
            <div className="flex justify-end">
                <Button size={"sm"}>Save</Button>
            </div>
        </div>
    )
}

export default EmployeeProfilePage