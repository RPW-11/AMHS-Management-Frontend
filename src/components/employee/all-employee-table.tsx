"use client";
import EmployeeActionButton from "@/components/employee/employee-action-button";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "@/components/user-avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Employee } from "@/types/employee";
import { useState } from "react";
import SelectedEmployeeActions from "./selected-employee-actions";
import { parsedTimeStampToDate } from "@/utils/general-util";
import { useEmployee } from "@/hooks/employee/useEmployee";
import Pagination from "../pagination";
import { useTranslation } from "react-i18next";

interface AllEmployeeTable {
    employees: Employee[];
}

const AllEmployeeTable = ({ employees }: AllEmployeeTable) => {
    const { page, pageSize, totalCount, totalPages, hasNext, hasPrevious } =
        useEmployee();
    const { t } = useTranslation();
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        new Set<string>()
    );

    const toggleSelectAllEmployees = () => {
        setSelectedIds((prev) =>
            prev.size === employees.length
                ? new Set<string>()
                : new Set<string>(employees.map((item) => item.id))
        );
    };

    const toggleSelectEmployee = (employeeId: string) => {
        setSelectedIds((prev) => {
            const newSelectedIds = new Set<string>(selectedIds);
            if (prev.has(employeeId)) {
                newSelectedIds.delete(employeeId);
            } else {
                newSelectedIds.add(employeeId);
            }
            return newSelectedIds;
        });
    };

    return (
        <div className="relative">
            {selectedIds.size > 0 && (
                <SelectedEmployeeActions
                    selectedIds={Array.from(selectedIds.values())}
                />
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-fit">
                            <Checkbox
                                checked={selectedIds.size === employees.length}
                                onCheckedChange={toggleSelectAllEmployees}
                            />
                        </TableHead>
                        <TableHead>{t("employees.table.no")}</TableHead>
                        <TableHead>{t("employees.table.name")}</TableHead>
                        <TableHead>{t("employees.table.age")}</TableHead>
                        <TableHead>{t("employees.table.dateOfBirth")}</TableHead>
                        <TableHead>{t("employees.table.email")}</TableHead>
                        <TableHead>{t("employees.table.phoneNumber")}</TableHead>
                        <TableHead className="text-right">{t("employees.table.action")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((emp, i) => (
                        <TableRow key={i}>
                            <TableCell className="w-fit">
                                <Checkbox
                                    checked={selectedIds.has(emp.id)}
                                    onCheckedChange={() =>
                                        toggleSelectEmployee(emp.id)
                                    }
                                />
                            </TableCell>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="font-medium flex gap-4 items-center">
                                <UserAvatar size="sm" userData={emp} />
                            </TableCell>
                            <TableCell>{emp.age}</TableCell>
                            <TableCell>
                                {parsedTimeStampToDate(emp.dateOfBirth)}
                            </TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.phoneNumber}</TableCell>
                            <TableCell className="text-right">
                                <EmployeeActionButton employeeId={emp.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>{t("employees.table.totalEmployees")}</TableCell>
                        <TableCell className="text-right">
                            {totalCount}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Pagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
            />
        </div>
    );
};

export default AllEmployeeTable;
