"use client"
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { EmployeePosition, EmployeeRegisterRequest } from "@/types/employee";
import { ApiError } from "@/types/general";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"

export const useEmployeeRegis = () => {
    const { user } = useUserStore()
    const { push } = useRouter()
    const { t } = useTranslation()
    const [employeeRegisReq, setEmployeeRegisReq] = useState<EmployeeRegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: new Date().toDateString(),
        phoneNumber: "",
        position: EmployeePosition.Staff
    });

    const register = useCallback(async (employeeRegisReq: EmployeeRegisterRequest): Promise<ApiError|null> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(employeeRegisReq)          
            })

            if (response.status === 401) {
                push(Routes.Login)
                return null
            }

            if (!response.ok) {
                const data = await response.json()
                return { title: data.title, details: data.details }
            }

            return null
        } catch (error) {
            return { title: (error as Error).message }
        }
    }, [user?.token, push])

    const validateField = useCallback((field: keyof EmployeeRegisterRequest, value: string): string => {
        switch (field) {
            case 'firstName':
                return value.trim() === "" ? t("employees.errors.firstNameRequired") : "";
            case 'lastName':
                return value.trim() === "" ? t("employees.errors.lastNameRequired") : "";
            case 'password':
                return value.trim() === "" ? t("employees.errors.passwordRequired") : "";
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