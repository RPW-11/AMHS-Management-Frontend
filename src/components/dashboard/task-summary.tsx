
import { ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

const TaskSummary = () => {
    const tasks = [
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
                        <Avatar className="h-8.5 w-8.5 rounded-md">
                            <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEw05-cUCsC_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721522133019?e=2147483647&v=beta&t=qoMqARcOgZR_r6PuWK4uBCjsUyhmzr7wKrjNxKu05Sc"/>
                            <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3>{ item.employeeName }</h3>
                            <p className="text-xs text-muted-foreground">{ item.employeePosition }</p>
                        </div>
                    </TableCell>
                    <TableCell>{ item.taskCategory }</TableCell>
                    <TableCell className="text-right">{ item.status }</TableCell>
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
                <ChevronDown/>
            </Button>
        </div>
    </div>
    )
}

export default TaskSummary