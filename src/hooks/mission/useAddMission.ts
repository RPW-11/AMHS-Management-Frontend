"use client"

import { MissionCategory } from "@/constants/mission"
import { ApiError } from "@/types/general"
import { AddMissionForm, AddMissionRequest, AddMissionResponse, ErrorMissionForm } from "@/types/mission"
import { addMissionFormToRequest } from "@/utils/mission/mission-util"
import { useCallback, useState } from "react"

export const useAddMission = () => {
    const [addMissionForm, setAddMissionForm] = useState<AddMissionForm>({
        name: "",
        description: "",
        category: MissionCategory.Normal,
        dueDate: new Date(),
        dueTime: "23:59"
    })

    const [errorsForm, setErrorsForm] = useState<ErrorMissionForm>({
        name: "",
        category: "",
        dueDateTime: ""
    })

    const addMissionApi = useCallback(async (addMissionForm: AddMissionForm): Promise<[apiError:ApiError|null, result: AddMissionResponse|null]> => {
        try {
            const addMissionReq = addMissionFormToRequest(addMissionForm)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addMissionReq)          
            })

            const data = await response.json()

            if (!response.ok) {
                return [{ title: data.title, details: data.details } as ApiError, null]
            }

            return [null, data as AddMissionResponse]
        } catch (error) {
            return [{ title: (error as Error).message, details: "" } as ApiError, null]

        }
    }, []);

    const validateMissionForm = (addMissionForm: AddMissionForm): boolean => {
        let isValid = true;
        const newErrors = {
            name: "",
            category: "",
            dueDateTime: ""
        }

        if (!addMissionForm.name) {
            isValid = false;
            newErrors.name = "Name can't be empty"
        }

        const currDate = new Date()
        const [hours, mins] = addMissionForm.dueTime.split(':')
        const selectedDate = new Date(addMissionForm.dueDate)
        selectedDate.setHours(Number(hours), Number(mins), 0)

        if (selectedDate < currDate){
            isValid = false;
            newErrors.dueDateTime = `Deadline is in the past: ${selectedDate.toLocaleString()} < today`
        }

        setErrorsForm(newErrors)
            
        return isValid;
    }

    return { addMissionForm, setAddMissionForm, addMissionApi, validateMissionForm, errorsForm }
}