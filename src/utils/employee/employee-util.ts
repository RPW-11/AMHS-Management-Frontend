import { EMPLOYEE_POSITIONS } from "@/constants/employee";
import { EmployeePosition } from "@/types/employee";

export function getPositionEnumByStr(positionVal: string): EmployeePosition {
    return Object.values(EmployeePosition).includes(positionVal as EmployeePosition) 
        ? positionVal as EmployeePosition 
        : EmployeePosition.Staff;
}

export function formatEmployeePosition(positionVal: string): string {
    const position = EMPLOYEE_POSITIONS.find(pos => pos.value === positionVal)
    
    if (position) {
        return position.name
    }

    throw new Error(`The position '${positionVal}' does not exist in the client server`)
}