import { EmployeePosition } from "@/types/employee";

export function getPositionEnumByStr(positionVal: string): EmployeePosition {
    return Object.values(EmployeePosition).includes(positionVal as EmployeePosition) 
        ? positionVal as EmployeePosition 
        : EmployeePosition.Staff;
}