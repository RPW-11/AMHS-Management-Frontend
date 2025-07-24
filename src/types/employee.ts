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

export enum EmployeePosition {
    Staff = "staff",
    SeniorStaff = "senior staff",
    Supervisor = "supervisor",
    Manager = "manager"
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