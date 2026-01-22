import { DEFAULT_RGV_PLAN } from "@/constants/tool-case";
import { RgvPathPlan } from "@/types/toolcase";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface MissionFormState {
    form: RgvPathPlan;
    setForm: (updates: Partial<RgvPathPlan>) => void;
    resetForm: () => void;
}

export const createRoutePlanningFormStore = (missionId: string) => {
    const storageKey = `route-planning-form-${missionId}`
    
    return create<MissionFormState>()(
        persist(
            (set) => ({
                form: DEFAULT_RGV_PLAN,
                setForm: (updates) =>
                    set((state) => ({
                        form: { ...state.form, ...updates },
                    })),
                resetForm: () => {
                    set({
                        form: DEFAULT_RGV_PLAN
                    });
                    localStorage.removeItem(storageKey)
                },
            }),
            {
                name: storageKey,
                partialize: (state) => ({
                    form: {...state.form, image: null, points: [], stationsOrder: [], sampleSolutions: []},
                }),
                version: 1
            },
        ),
    );
}
