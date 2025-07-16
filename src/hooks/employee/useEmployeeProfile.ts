"use client"
import { Employee } from "@/types/employee"
import { useState, useCallback, useMemo } from "react"

export const useEmployeeProfile = () => {
    const [employeeDetails, setEmployeeDetails] = useState<Employee>({
        id: "e1a9b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        age: 32,
        phoneNumber: "+1 (555) 123-4567",
        position: "Senior Software Engineer",
        dateOfBirth: "15 May 1992",
        imgUrl: "https://i.pinimg.com/474x/61/9c/64/619c64898a25274894d2e98a0700a7ca.jpg"
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

    return {
        employeeDetails,
        errors,
        canSaveProfile,
        updateField
    };
};