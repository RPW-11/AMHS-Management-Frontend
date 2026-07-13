"use client"
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { Employee } from "@/types/employee"
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useEffect } from "react"
import { useTranslation } from "react-i18next"

export const useEmployeeProfile = (employeeId?: string) => {
    const { user, isHydrated } = useUserStore()
    const { push } = useRouter()
    const { t } = useTranslation()
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
                return value.trim() === "" ? t("employees.errors.firstNameRequired") : "";
            case 'lastName':
                return value.trim() === "" ? t("employees.errors.lastNameRequired") : "";
            case 'email': {
                if (!value) return t("employees.errors.emailRequired");
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(value)) return t("employees.errors.emailInvalid");
                if (value.length > 254) return t("employees.errors.emailTooLong");
                return "";
            }
            case 'phoneNumber': {
                if (!value) return t("employees.errors.phoneRequired");
                if (!/^\+?\d+$/.test(value)) return t("employees.errors.phoneInvalidChars");
                const digitsOnly = value.replace(/^\+/, '');
                if (digitsOnly.length < 8) return t("employees.errors.phoneTooShort");
                if (value.length > 16) return t("employees.errors.phoneTooLong");
                return "";
            }
            default:
                return "";
        }
    }, [t]);

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
    }, [user, employeeId, push])

    useEffect(() => {
        if (isHydrated && employeeId) {
            fetchEmployeeById()
        }
    }, [isHydrated, employeeId, fetchEmployeeById])

    return {
        employeeDetails,
        isFetchingProfile,
        fetchError,
        errors,
        canSaveProfile,
        updateField
    };
};