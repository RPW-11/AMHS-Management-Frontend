"use client"
import { Employee } from "@/types/employee"
import { ApiError } from "@/types/general";
import { useState, useCallback, useMemo } from "react"

export const useEmployeeProfile = () => {
    const [employeeDetails, setEmployeeDetails] = useState<Employee>({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        age: -1,
        phoneNumber: "",
        position: "",
        dateOfBirth: new Date().toString(),
    });

    const validateField = useCallback((field: keyof Employee, value: string): string => {
        switch (field) {
            case 'firstName':
                return value.trim() === "" ? "First name can't be empty" : "";
            case 'lastName':
                return value.trim() === "" ? "Last name can't be empty" : "";
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
        phoneNumber: ""
    });

    const updateField = useCallback((field: keyof Employee, value: string) => {
        setEmployeeDetails(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }, [validateField]);

    const canSaveProfile = useMemo(() => {
        return Object.values(errors).every(msg => msg === "");
    }, [errors]);

    const fetchEmployeeById = useCallback(async (employeeId: string): Promise<ApiError|null> => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees/${employeeId}`)
            const data = await result.json()

            if(!result.ok){
                return { title: data.title, details: data.details }
            }

            setEmployeeDetails(data)
            return null
            
        } catch (error) {
            return { title: (error as Error).message }
        }
    }, [])


    return {
        fetchEmployeeById,
        employeeDetails,
        errors,
        canSaveProfile,
        updateField
    };
};