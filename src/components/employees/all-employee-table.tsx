"use client"
import EmployeeActionButton from "@/components/employees/employee-action-button";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "@/components/user-avatar"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee } from "@/types/employee";
import { useState } from "react";
import SelectedEmployeeActions from "./selected-employee-actions";
import { parsedTimeStampToDate } from "@/utils/general-util";

interface AllEmployeeTable {
    employees: Employee[]
}

const AllEmployeeTable = ({
    employees
}: AllEmployeeTable) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set<string>());

    const toggleSelectAllEmployees = () => {
        setSelectedIds(prev => 
            prev.size === employees.length ? new Set<string>() : new Set<string>(employees.map(item => item.id))
        );
    };

    const toggleSelectEmployee = (employeeId: string) => {
        setSelectedIds(prev => {
            const newSelectedIds = new Set<string>(selectedIds)
            if (prev.has(employeeId)) {
                newSelectedIds.delete(employeeId)
            } else {
                newSelectedIds.add(employeeId)
            }
            return newSelectedIds
        }
        )
    }

    return (
        <div className="relative">
            {selectedIds.size > 0 && <SelectedEmployeeActions selectedIds={Array.from(selectedIds.values())}/>}
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-fit">
                        <Checkbox checked={selectedIds.size === employees.length} onCheckedChange={toggleSelectAllEmployees}/>
                    </TableHead>
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((emp, i) => (
                    <TableRow key={i}>
                        <TableCell className="w-fit">
                            <Checkbox checked={selectedIds.has(emp.id)} onCheckedChange={() => toggleSelectEmployee(emp.id)}/>
                        </TableCell>
                        <TableCell>{ i + 1 }</TableCell>
                        <TableCell className="font-medium flex gap-4 items-center">
                            <UserAvatar size="sm" userData={emp}/>
                        </TableCell>
                        <TableCell>
                            { emp.age }
                        </TableCell>
                        <TableCell>
                            { parsedTimeStampToDate(emp.dateOfBirth) }
                        </TableCell>
                        <TableCell>
                            { emp.email }
                        </TableCell>
                        <TableCell>
                            { emp.phoneNumber }
                        </TableCell>
                        <TableCell className="text-right">
                            <EmployeeActionButton employeeId={emp.id}/>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={7}>Total Employees</TableCell>
                    <TableCell className="text-right">100</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default AllEmployeeTable