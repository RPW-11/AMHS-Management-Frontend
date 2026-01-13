import { EmployeePosition } from "@/types/employee";
import { Option } from "@/types/general";

export const EMPLOYEE_POSITIONS: Option[] = [
    { name: "Staff", value: EmployeePosition.Staff.toString() },
    { name: "Senior Staff", value: EmployeePosition.SeniorStaff.toString() },
    { name: "Supervisor", value: EmployeePosition.Supervisor.toString() },
    { name: "Manager", value: EmployeePosition.Manager.toString() }
]