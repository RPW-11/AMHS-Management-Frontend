"use client"
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { Employee } from "@/types/employee"
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useEffect } from "react"

export const useEmployeeProfile = (employeeId?: string) => {
    const { user, isHydrated } = useUserStore()
    const { push } = useRouter()
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [isFetchingProfile, setIsFetchingProfile] = useState<boolean>(true)

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

    const fetchEmployeeById = useCallback(async () => {
        setIsFetchingProfile(true)
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees/${employeeId}`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })
            
            if (result.status === 401) {
                return push(Routes.Login)
            }

            const data = await result.json()

            if(!result.ok){
                return setFetchError(data.title)
            }

            setFetchError(null)
            setEmployeeDetails(data)
            
        } catch (error) {
            setFetchError((error as Error).message)
        } finally {
            setIsFetchingProfile(false)
        }
    }, [user, employeeId])

    useEffect(() => {
        const fetchData = () => fetchEmployeeById()
        if (isHydrated && employeeId) {
            fetchData()
        }
    }, [isHydrated, employeeId])

    return {
        employeeDetails,
        isFetchingProfile,
        fetchError,
        errors,
        canSaveProfile,
        updateField
    };
};