"use client"

import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

const EmployeeSummary = () => {
    const employeeAttendances = [
        {
            name: "Rainata Putra",
            position: "Staff",
            status: "On time",
            time: "7.30 AM"
        },
        {
            name: "Vanessa Barrack",
            position: "Manager",
            status: "On time",
            time: "7.32 AM"
        },
        {
            name: "Alex Volkanoski",
            position: "Engineer",
            status: "Late",
            time: "9.00 AM"
        }
    ]
    return (
        <div className="rounded-md p-4 bg-white space-y-4">
            <div>
                <h1 className="text-lg font-semibold">Employees Attendance</h1>
                <p className="text-muted-foreground text-sm">
                    Check the employees attendance today
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employeeAttendances.map((item, i) => (
                    <TableRow key={i}>
                        <TableCell className="font-medium flex gap-4 items-center">
                            <Avatar className="h-8.5 w-8.5 rounded-md">
                                <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEw05-cUCsC_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721522133019?e=2147483647&v=beta&t=qoMqARcOgZR_r6PuWK4uBCjsUyhmzr7wKrjNxKu05Sc"/>
                                <AvatarFallback>RP</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3>{ item.name }</h3>
                                <p className="text-xs text-muted-foreground">{ item.position }</p>
                            </div>
                        </TableCell>
                        <TableCell>{ item.status }</TableCell>
                        <TableCell className="text-right">{ item.time }</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={2}>Employee at office</TableCell>
                    <TableCell className="text-right">17/50</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-center">
                <Button size={"sm"} variant={"outline"} className="text-xs">
                View details
                    <ChevronDown/>
                </Button>
            </div>
        </div>
    )
}

export default EmployeeSummary