export type Employee = {
    id: string
    email: string
    firstName: string
    lastName: string
    age: number
    phoneNumber: string
    position: string
    dateOfBirth: string
    imgUrl?: string
}

export type EmployeeSearch = {
    id: string
    email: string
    firstName: string
    lastName: string
    imgUrl?: string
}

export enum EmployeePosition {
    Staff = "Staff",
    SeniorStaff = "SeniorStaff",
    Supervisor = "Supervisor",
    Manager = "Manager"
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface EmployeeRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phoneNumber: string;
    position: EmployeePosition;
}