"use client"
import { Employee, EmployeePosition, EmployeeRegisterRequest } from "@/types/employee";
import { ApiError } from "@/types/general";
import { useState, useCallback, useMemo } from "react"

export const useEmployeeRegis = () => {
    const [employeeRegisReq, setEmployeeRegisReq] = useState<EmployeeRegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: new Date(),
        phoneNumber: "",
        position: EmployeePosition.Staff
    });

    const register = useCallback(async (employeeRegisReq: EmployeeRegisterRequest): Promise<[Employee|null, ApiError|null]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeRegisReq)          
        })
        const data = await response.json()
        if (!response.ok) {
            return [null, { title: data.title, details: data.details }]
        }
        return [data, null]
    }, [])

    const validateField = useCallback((field: keyof EmployeeRegisterRequest, value: string): string => {
        switch (field) {
            case 'firstName':
                return value.trim() === "" ? "First name can't be empty" : "";
            case 'lastName':
                return value.trim() === "" ? "Last name can't be empty" : "";
            case 'password':
                return value.trim() === "" ? "Password can't be empty" : "";
            case 'email': {
                if (!value) return "Email is required";
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(value)) return "Invalid email format";
                if (value.length > 254) return "Email too long (max 254 chars)";
                return "";
            }
            case 'phoneNumber': {
                if (!value) return "Phone number is required";
                if (!/^\+?\d+$/.test(value)) return "Only numbers and '+' allowed";
                const digitsOnly = value.replace(/^\+/, '');
                if (digitsOnly.length < 8) return "Too short (min 8 digits)";
                if (value.length > 16) return "Too long (max 15 digits)";
                return "";
            }
            default:
                return "";
        }
    }, []);

    const [errors, setErrors] = useState<Record<string, string>>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: ""
    });

    const updateField = useCallback((field: keyof EmployeeRegisterRequest, value: string|EmployeePosition) => {
        setEmployeeRegisReq(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }, [validateField]);

    const canAddEmployee = useMemo(() => {
        return Object.values(errors).every(msg => msg === "");
    }, [errors]);

    return {
        employeeRegisReq,
        errors,
        canAddEmployee,
        updateField,
        register
    };
};