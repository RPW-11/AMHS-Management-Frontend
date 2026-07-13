import { EmployeePosition } from "@/types/employee";
import { Option } from "@/types/general";
import { TFunction } from "i18next";

export function getPositionEnumByStr(positionVal: string): EmployeePosition {
    return Object.values(EmployeePosition).includes(positionVal as EmployeePosition)
        ? positionVal as EmployeePosition
        : EmployeePosition.Staff;
}

export function formatEmployeePosition(t: TFunction, positionVal: string): string {
    if (!Object.values(EmployeePosition).includes(positionVal as EmployeePosition)) {
        throw new Error(`The position '${positionVal}' does not exist in the client server`)
    }

    return t(`employees.positions.${positionVal.charAt(0).toLowerCase()}${positionVal.slice(1)}`)
}

export function getTranslatedEmployeePositions(t: TFunction): Option[] {
    return Object.values(EmployeePosition).map((position) => ({
        name: formatEmployeePosition(t, position),
        value: position.toString()
    }))
}