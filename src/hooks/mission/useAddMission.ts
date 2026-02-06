"use client";

import { MissionRoutes, Routes, ToolCaseRoutes } from "@/constants/general";
import { MissionCategory } from "@/constants/mission";
import { useUserStore } from "@/stores/useAuthStore";
import { ApiError } from "@/types/general";
import {
    AddMissionForm,
    AddMissionResponse,
    ErrorMissionForm,
} from "@/types/mission";
import { addMissionFormToRequest } from "@/utils/mission/mission-util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useAddMission = () => {
    const { user } = useUserStore();
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const [addMissionForm, setAddMissionForm] = useState<AddMissionForm>({
        name: "",
        description: "",
        category: MissionCategory.Normal,
        dueDate: new Date(),
        dueTime: "23:59",
    });

    const [errorsForm, setErrorsForm] = useState<ErrorMissionForm>({
        name: "",
        category: "",
        dueDateTime: "",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (addMissionForm: AddMissionForm) => {
            if (!user?.token) throw new Error("Unauthorized");

            const addMissionReq = addMissionFormToRequest(addMissionForm);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify(addMissionReq),
                },
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error((data as ApiError).title || "Delete failed");
            }

            return data as AddMissionResponse;
        },
        onSuccess: (data, formData) => {
            queryClient.invalidateQueries({ queryKey: ["missions"] });
            toast.success("Mission added", {
                duration: 3000,
                onAutoClose: () => toast.dismiss(),
            });

            push(
                formData.category === MissionCategory.RoutePlanning
                    ? ToolCaseRoutes.RgvRoutePlanning(data.id)
                    : MissionRoutes.Missions,
            );
        },
        onMutate: () => toast.loading("Adding mission.."),
        onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
        onError: (err) => toast.error((err as Error).message)
    });

    const validateMissionForm = (addMissionForm: AddMissionForm): boolean => {
        let isValid = true;
        const newErrors = {
            name: "",
            category: "",
            dueDateTime: "",
        };

        if (!addMissionForm.name) {
            isValid = false;
            newErrors.name = "Name can't be empty";
        }

        const currDate = new Date();
        const [hours, mins] = addMissionForm.dueTime.split(":");
        const selectedDate = new Date(addMissionForm.dueDate);
        selectedDate.setHours(Number(hours), Number(mins), 0);

        if (selectedDate < currDate) {
            isValid = false;
            newErrors.dueDateTime = `Deadline is in the past: ${selectedDate.toLocaleString()} < today`;
        }

        setErrorsForm(newErrors);

        return isValid;
    };

    return {
        addMissionForm,
        setAddMissionForm,
        mutate,
        isPending,
        validateMissionForm,
        errorsForm,
    };
};
