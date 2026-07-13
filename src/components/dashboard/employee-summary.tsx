"use client"

import { ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

const EmployeeSummary = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const employeeAttendances = [
        {
            name: "Rainata Putra",
            position: "staff",
            status: "onTime",
            time: "7.30 AM"
        },
        {
            name: "Vanessa Barrack",
            position: "manager",
            status: "onTime",
            time: "7.32 AM"
        },
        {
            name: "Alex Volkanoski",
            position: "engineer",
            status: "late",
            time: "9.00 AM"
        },
        {
            name: "Duarte",
            position: "engineer",
            status: "absent",
            time: "Unknown"
        }
    ]

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "late":
                return "warning"
            case "onTime":
                return "success"
            default:
                return "danger"
        }
    }
    return (
        <div className="rounded-md p-4 bg-white space-y-4">
            <div>
                <h1 className="text-lg font-semibold">{t("dashboard.employeeSummary.title")}</h1>
                <p className="text-muted-foreground text-sm">
                    {t("dashboard.employeeSummary.subtitle")}
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>{t("dashboard.employeeSummary.employee")}</TableHead>
                    <TableHead>{t("dashboard.employeeSummary.status")}</TableHead>
                    <TableHead className="text-right">{t("dashboard.employeeSummary.time")}</TableHead>
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
                                <p className="text-xs text-muted-foreground">{t(`dashboard.employeeSummary.position.${item.position}`)}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={getStatusBadgeVariant(item.status)}>{t(`dashboard.employeeSummary.attendanceStatus.${item.status}`)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{ item.time }</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={2}>{t("dashboard.employeeSummary.employeeAtOffice")}</TableCell>
                    <TableCell className="text-right">17/50</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-center">
                <Button
                onClick={() => router.push(`/employees`)}
                size={"sm"}
                variant={"outline"}
                className="text-xs">
                {t("dashboard.viewDetails")}
                    <ChevronRight/>
                </Button>
            </div>
        </div>
    )
}

export default EmployeeSummary