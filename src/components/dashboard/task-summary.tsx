import { ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import UserAvatar from "../user-avatar"
import { User } from "@/types/general"
import { Task } from "@/types/task"

const TaskSummary = () => {
    const tasks: Task[] = [
        {
            employeeName: "Rainata Putra",
            employeePosition: "Staff",
            taskCategory: "Path planning",
            status: "On going"
        },
        {
            employeeName: "Shirohige",
            employeePosition: "Staff",
            taskCategory: "Path planning",
            status: "Done"
        },
        {
            employeeName: "Stussy Devon",
            employeePosition: "Staff",
            taskCategory: "Path planning",
            status: "Cancelled"
        }
    ]

    const convertToUserType = (task: Task): User => {
        const names = task.employeeName.split(" ")
        return {
            firstName: names[0],
            lastName: names[1] || "",
            position: task.employeePosition
        }
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case "cancelled":
                return "warning"
            case "on going":
                return "info"
            case "done":
                return "success"
            default:
                return "danger"
        }
    }

    return (
    <div className="rounded-md p-4 bg-white space-y-4">
        <div>
            <h1 className="text-lg font-semibold">Tasks Summary</h1>
            <p className="text-muted-foreground text-sm">
                Monitor the current on going tasks
            </p>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Task</TableHead>
                <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((item, i) => (
                <TableRow key={i}>
                    <TableCell className="font-medium flex gap-4 items-center">
                        <UserAvatar
                        userData={convertToUserType(item)}
                        hideNames
                        size="sm"
                        />
                        <div>
                            <h3>{ item.employeeName }</h3>
                            <p className="text-xs text-muted-foreground">{ item.employeePosition }</p>
                        </div>
                    </TableCell>
                    <TableCell>{ item.taskCategory }</TableCell>
                    <TableCell className="text-right">
                        <Badge variant={getStatusBadgeVariant(item.status)}>{ item.status }</Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={2}>Total tasks</TableCell>
                <TableCell className="text-right">17</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
        <div className="flex justify-center">
            <Button size={"sm"} variant={"outline"} className="text-xs">
            View details
                <ChevronRight/>
            </Button>
        </div>
    </div>
    )
}

export default TaskSummary