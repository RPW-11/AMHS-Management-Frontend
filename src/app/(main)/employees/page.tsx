
"use client"
import AllEmployeeTable from "@/components/employees/all-employee-table";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import { useRouter } from "next/navigation";

const EmployeesPage = () => {
    const employees: Employee[] = [
        {
            id: "e1a9b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            age: 32,
            phoneNumber: "+1 (555) 123-4567",
            position: "Senior Software Engineer",
            dateOfBirth: "15 May 1992"
        },
        {
            id: "b5c6d7e8-f9a0-1b2c-3d4e-5f6a7b8c9d0e",
            email: "jane.smith@example.com",
            firstName: "Jane",
            lastName: "Smith",
            age: 28,
            phoneNumber: "+1 (555) 987-6543",
            position: "Product Manager",
            dateOfBirth: "22 Aug 1996"
        },
        {
            id: "c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f",
            email: "michael.johnson@example.com",
            firstName: "Michael",
            lastName: "Johnson",
            age: 45,
            phoneNumber: "+1 (555) 456-7890",
            position: "CTO",
            dateOfBirth: "03 Jan 1979"
        },
        {
            id: "d3e4f5a6-b7c8-9d0e-1f2a-3b4c5d6e7f8a",
            email: "sarah.williams@example.com",
            firstName: "Sarah",
            lastName: "Williams",
            age: 24,
            phoneNumber: "+1 (555) 789-0123",
            position: "UX Designer",
            dateOfBirth: "30 Nov 1999"
        },
        {
            id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c",
            email: "david.brown@example.com",
            firstName: "David",
            lastName: "Brown",
            age: 37,
            phoneNumber: "+1 (555) 234-5678",
            position: "DevOps Engineer",
            dateOfBirth: "14 Jul 1987"
        },
        {
            id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
            email: "emily.davis@example.com",
            firstName: "Emily",
            lastName: "Davis",
            age: 29,
            phoneNumber: "+1 (555) 876-5432",
            position: "Marketing Specialist",
            dateOfBirth: "09 Mar 1995"
        },
        {
            id: "e7f8a9b0-c1d2-3e4f-5a6b-7c8d9e0f1a2b",
            email: "robert.wilson@example.com",
            firstName: "Robert",
            lastName: "Wilson",
            age: 41,
            phoneNumber: "+1 (555) 345-6789",
            position: "Data Scientist",
            dateOfBirth: "25 Dec 1982"
        }
    ];

    const { push } = useRouter()

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="flex gap-4">
                <Button onClick={() => push("/employees/add")}>Add Employee</Button>
            </div>
            <div>
                <h1 className="font-semibold text-xl">
                    Employees Detailed Information
                </h1>
                <p className="text-muted-foreground text-sm">
                    Monitor and manage your employees easily. 
                </p>
            </div>
            <div>
            <AllEmployeeTable employees={employees}/>
            </div>
        </div>
    )
}

export default EmployeesPage